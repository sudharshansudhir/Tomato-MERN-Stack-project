const express = require("express");
 const {getCart,addToCart,removeFromCart,menu,getmenu}  = require("../controllers/pageController");
const {verifyToken}=require("../middleware/authorization")

const router = express.Router();



router.post("/cart-add", verifyToken, addToCart);
router.post("/cart-remove", verifyToken, removeFromCart);
router.get("/cart", verifyToken, getCart);

router.post("/menu", menu);
router.get("/menu", getmenu);


module.exports = router;
