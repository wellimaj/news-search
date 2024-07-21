const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  articleId: String,
  summary: String,
  content: String,
  lastUpdated: { type: Date, default: Date.now },
  articleUpdated:Date
});

export const Article = mongoose.model("Article", articleSchema);
