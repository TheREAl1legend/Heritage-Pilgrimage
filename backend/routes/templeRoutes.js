import express from "express";

import {
  createTemple,
  getTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} from "../controllers/templeController.js";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =========================
   GET ALL + CREATE
========================= */

router
  .route("/")
  .get(getTemples)
  .post(protect, upload.array("images", 20), createTemple);

/* =========================
   GET SINGLE + UPDATE + DELETE
========================= */

router
  .route("/:id")
  .get(getTempleById)

  .put(protect, upload.array("images", 20), updateTemple)

  .delete(protect, deleteTemple);

export default router;
