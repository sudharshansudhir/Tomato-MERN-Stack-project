const Cart =require("../models/Cart")
const Menu =require("../models/Menu")


// ➝ Add to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware
    const { itemId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create new cart for user
      cart = new Cart({
        userId,
        items: [{ itemId, quantity }],
      });
    } else {
      // check if item already exists
      const itemIndex = cart.items.findIndex((i) => i.itemId.toString() === itemId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // increment qty
      } else {
        cart.items.push({ itemId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➝ Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => {
  if (!i.itemId) return true; // skip if no itemId (don't crash)
  return i.itemId.toString() !== itemId;
});

    await cart.save();

    res.json({ success: true, message: "Item removed", items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ➝ Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId }).populate("items.itemId");
    // const cart = await Cart.findOne({ userId }).populate("items.itemId");


    if (!cart) {
      return res.json({ success: true, items: [] });
    }

    // Map cart items to include product details
    const formattedItems = cart.items.map((i) => ({
      _id: i.itemId._id,
      name: i.itemId.name,
      price: i.itemId.price,
      image: i.itemId.image,
      quantity: i.quantity,
    }));

    res.json({ success: true, items: formattedItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const menu = async (req, res) => {
  try {
    // req.body should be an array of menu objects
    const items = req.body;

    // Validation: Check if it's an array
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Expected an array of menu items" });
    }

    // Insert all items at once
    await Menu.insertMany(items);

    res.json({ success: true, message: "All items added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getmenu=async(req,res)=>{
    try{
        const items=await Menu.find()
        res.status(200).json({
      success: true,
      data: items,
    });
    
}
catch(err){
        res.status(404).json({
            success:false,
            message:"failed to fetch"
        })
    }
}
module.exports={addToCart,removeFromCart,getCart,menu,getmenu};