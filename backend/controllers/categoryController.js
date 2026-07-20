import Category from "../models/Category.js";

/* =========================
   CREATE CATEGORY
========================= */

export const createCategory = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      slug,
      description,
      image,
      featured,
    } = req.body;

    const categoryExists =
      await Category.findOne({
        slug,
      });

    if (categoryExists) {
      res.status(400);

      throw new Error(
        "Category already exists"
      );
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      featured,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET ALL CATEGORIES
========================= */

export const getCategories = async (
  req,
  res,
  next
) => {
  try {
    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET SINGLE CATEGORY
========================= */

export const getCategoryById = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      res.status(404);

      throw new Error(
        "Category not found"
      );
    }

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   UPDATE CATEGORY
========================= */

export const updateCategory = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      res.status(404);

      throw new Error(
        "Category not found"
      );
    }

    category.name =
      req.body.name || category.name;

    category.slug =
      req.body.slug || category.slug;

    category.description =
      req.body.description ||
      category.description;

    category.image =
      req.body.image || category.image;

    category.featured =
      req.body.featured ??
      category.featured;

    const updatedCategory =
      await category.save();

    res.json({
      success: true,
      updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   DELETE CATEGORY
========================= */

export const deleteCategory = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      res.status(404);

      throw new Error(
        "Category not found"
      );
    }

    await category.deleteOne();

    res.json({
      success: true,
      message:
        "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};