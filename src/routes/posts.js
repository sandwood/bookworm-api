import express from "express";
import authenticate from "../middlewares/authenticate";
import Post from "../models/Post";
import parseErrors from "../utils/parseErrors";

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
  Post.find({}).sort({created_at: -1}).then(posts => res.json({ posts }));
});

router.post("/", (req, res) => {
  Post.create({ ...req.body.post })
    .then(post => res.json({ post }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;