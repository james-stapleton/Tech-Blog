const { Router } = require("express");
const { Comment } = require("../../models");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    console.log(commentData);
    if (!commentData) {
      res.status(404).json({ message: "Failed to find comments" });
    } else {
      res.status(200).json(commentData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    console.log(newComment);
    if (!newComment) {
      res.status(500).json({ message: "Failed to post comment" });
    } else {
      res.status(200).json(newComment);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Comment.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ message: "No comment found by that id" });
    } else {
      res.status(200).json(deleted);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
