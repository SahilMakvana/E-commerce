const express = require("express");
const router = express.Router();

const { getCategoryId, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById, getUser } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryId);

// Actual routes goes here
// Create Routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

// Read Routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// Update Routes
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

// Delete Routes
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;
