const Product = require("../models/Product");
const User = require("../models/User");

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    if (!name || !price || !image || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Unable to add product",
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: "Unable to update product",
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to delete product",
    });
  }
};

// Like / Unlike Product
// Like / Unlike Product
exports.likeProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const productId = req.params.id;

    // Check if already liked
    const alreadyLiked = user.likedProducts.some(
      (id) => id.toString() === productId
    );

    if (alreadyLiked) {
      user.likedProducts = user.likedProducts.filter(
        (id) => id.toString() !== productId
      );

      await user.save();

      return res.status(200).json({
        message: "Product unliked",
      });
    }

    // Add to liked products
    user.likedProducts.push(product._id);

    await user.save();

    return res.status(200).json({
      message: "Product liked",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Unable to update like",
    });
  }
};

// Get Liked Products
exports.getLikedProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("likedProducts");

    res.status(200).json(user.likedProducts);
  } catch (err) {
    res.status(500).json({
      message: "Unable to fetch liked products",
    });
  }
};