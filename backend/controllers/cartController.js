import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    user.cartData = cartData;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;

    user.cartData = cartData;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET CART
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
