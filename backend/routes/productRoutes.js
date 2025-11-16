const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();

// Add product + image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null;

    // Si une image a été uploadée
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }).end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const newProduct = await Product.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json(newProduct);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Si une nouvelle image a été uploadée
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }).end(req.file.buffer);
      });

      updateData.image = result.secure_url;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

