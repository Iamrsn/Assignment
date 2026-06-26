const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
  getLikedProducts,
} = require("../controllers/productController");

// Public Route
router.get("/", getProducts);

// Protected Routes
router.post("/", auth, addProduct);

router.put("/:id", auth, updateProduct);

router.delete("/:id", auth, deleteProduct);

router.post("/like/:id", auth, likeProduct);

router.get("/liked/list", auth, getLikedProducts);

module.exports = router;