import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";

// Create Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const { icon } = req.files;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
    }
    if (icon && icon.size > 1000000) {
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }

    const category = new categoryModel({
      ...req.fields,
      name,
      slug: slugify(name),
    });

    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    if (icon) {
      category.icon.data = fs.readFileSync(icon.path);
      category.icon.contentType = icon.type;
    }
    await category.save();

    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

// Update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const { icon } = req.files;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { ...req.fields, name, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    if (icon) {
      category.icon.data = fs.readFileSync(icon.path);
      category.icon.contentType = icon.type;
    }

    await category.save();

    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all category
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel
      .find({})
      .select("-photo -icon")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: category.length,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel
      .findOne({ slug: req.params.slug })
      .select("-photo -icon");
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

// Delete category full category will deleted
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id).select("-photo -icon");
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};

// Category Photo Controller GET Methode

export const categoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.pid)
      .select("photo");
    if (category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
// Category Icon Controller GET Methode

export const categoryIconController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.pid)
      .select("icon");
    if (category.icon.data) {
      res.set("Content-type", category.icon.contentType);
      return res.status(200).send(category.icon.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
