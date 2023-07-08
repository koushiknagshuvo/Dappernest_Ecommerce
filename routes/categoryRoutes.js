const express = require("express");
const formidable = require("express-formidable");
const {
  categoryControlller,
  categoryIconController,
  categoryPhotoController,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} = require("../controllers/categoryController.js");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateCategoryController
);

//get category photo
router.get("/category-photo/:pid", categoryPhotoController);

//get category icon
router.get("/category-icon/:pid", categoryIconController);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

module.exports = router;
