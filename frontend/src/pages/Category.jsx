// src/pages/CreateCategory.jsx

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import slugify from "slugify";

import {
  createCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
  clearCategoryError,
  clearCategorySuccess,
} from "../redux/slices/categorySlice";

import { PlusCircle, Trash2, Pencil } from "lucide-react";

const CreateCategory = () => {
  const dispatch = useDispatch();

  const { categories, loading, error, success } = useSelector(
    (state) => state.category,
  );

  /* =========================
     STATES
  ========================= */

  const [name, setName] = useState("");

  const [slug, setSlug] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");

  const [featured, setFeatured] = useState(false);

  const [editId, setEditId] = useState(null);

  /* =========================
     AUTO SLUG
  ========================= */

  useEffect(() => {
    setSlug(
      slugify(name, {
        lower: true,
      }),
    );
  }, [name]);

  /* =========================
     FETCH CATEGORIES
  ========================= */

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  /* =========================
     SUCCESS / ERROR
  ========================= */

  useEffect(() => {
    if (error) {
      alert(error);

      dispatch(clearCategoryError());
    }

    if (success) {
      alert(editId ? "Category Updated" : "Category Created");

      dispatch(clearCategorySuccess());

      resetForm();
    }
  }, [error, success, dispatch, editId]);

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
    setFeatured(false);
    setEditId(null);
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      slug,
      description,
      image,
      featured,
    };

    if (editId) {
      dispatch(
        updateCategory({
          id: editId,
          categoryData,
        }),
      );
    } else {
      dispatch(createCategory(categoryData));
    }
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (category) => {
    setEditId(category._id);

    setName(category.name);

    setSlug(category.slug);

    setDescription(category.description);

    setImage(category.image);

    setFeatured(category.featured);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-5">
      <div className="max-w-7xl mx-auto">
        {/* =========================
           HEADER
        ========================= */}

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-3">
            Category Admin Panel
          </h1>

          <p className="text-gray-600 text-lg">
            Create, update and manage temple categories
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* =========================
             FORM
          ========================= */}

          <div className="bg-white rounded-[35px] shadow-xl p-8">
            <h2 className="text-3xl font-black mb-8">
              {editId ? "Update Category" : "Create Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Slug"
                value={slug}
                readOnly
                className="w-full border p-4 rounded-2xl bg-gray-100"
              />

              <textarea
                rows="4"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border p-4 rounded-2xl"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />

                <label className="font-semibold">Featured</label>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition">
                <PlusCircle />

                {loading
                  ? "Processing..."
                  : editId
                    ? "Update Category"
                    : "Create Category"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full border border-gray-300 py-4 rounded-2xl font-bold"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          {/* =========================
             CATEGORY LIST
          ========================= */}

          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-[30px] overflow-hidden shadow-xl"
                >
                  {/* IMAGE */}

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-52 w-full object-cover"
                  />

                  {/* CONTENT */}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-black">{category.name}</h3>

                      {category.featured && (
                        <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 mb-4">{category.slug}</p>

                    <p className="text-gray-700 line-clamp-3 mb-6">
                      {category.description}
                    </p>

                    {/* ACTIONS */}

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(category)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(category._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
