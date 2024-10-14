const Cart = require('../models/Cart');

// 添加书籍到购物车
exports.addToCart = async (req, res) => {
    const { bookId, quantity } = req.body;
    const userId = req.user.id; // 假设用户ID存储在请求中

    // 查找用户购物车
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        // 如果购物车不存在，则创建一个新的购物车
        cart = new Cart({ userId, items: [] });
    }

    // 检查书籍是否已在购物车中
    const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
        // 更新数量
        existingItem.quantity += quantity;
    } else {
        // 添加新书籍到购物车
        cart.items.push({ bookId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
};

// 查看购物车内容
exports.viewCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.bookId');
    res.status(200).json(cart || { items: [] });
};
