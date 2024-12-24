// backend/routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const loggerMiddleware = require('../middleware/loggerMiddleware');
const { getIssues, createIssue, upvoteIssue, downvoteIssue, updateIssueStatus } = require('../controllers/issueController');

// Apply middleware to all routes in this file
router.use(loggerMiddleware);

// Define routes
router.get('/', getIssues); // GET all issues
router.post('/', createIssue); // POST create issue
router.post('/:id/upvote', upvoteIssue); // POST upvote issue
router.post('/:id/downvote', downvoteIssue); // POST downvote issue
router.put('/:id/status', updateIssueStatus); // PATCH update issue status

module.exports = router;
