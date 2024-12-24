// models/Issue.js
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  status: { type: String, default: 'Open' }, // Added status field
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
