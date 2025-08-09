const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);





//         _id: "12",
//         name: "Vanilla Ice Cream",
//         image: food_12,
//         price: 12,
//         description: "Food provides essential nutrients for overall health and well-being",
//         category: "Deserts"