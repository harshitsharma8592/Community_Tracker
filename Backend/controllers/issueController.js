const Issue = require('../models/Issue');

// Get all issues
const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new issue
const createIssue = async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const newIssue = new Issue({ title, description, location });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(400).json({ message: 'Error creating issue' });
  }
};

// Update issue status
const updateIssueStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.status = status; // Update the status field
    await issue.save();
    res.json(issue);
  } catch (error) {
    console.error('Error updating issue status:', error);
    res.status(500).json({ message: 'Error updating issue status' });
  }
};

// Upvote an issue
const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.upvotes += 1; // Change to upvotes
    await issue.save();
    res.json(issue);
  } catch (error) {
    console.error('Error upvoting issue:', error);
    res.status(500).json({ message: 'Error upvoting issue' });
  }
};

// Downvote an issue
const downvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.downvotes += 1; // Change to downvotes
    await issue.save();
    res.json(issue);
  } catch (error) {
    console.error('Error downvoting issue:', error);
    res.status(500).json({ message: 'Error downvoting issue' });
  }
};


module.exports = {
  getIssues,
  createIssue,
  upvoteIssue,
  downvoteIssue,
  updateIssueStatus,
};
