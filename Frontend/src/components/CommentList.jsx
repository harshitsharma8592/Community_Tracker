import React, { useState, useEffect } from 'react';

const CommentList = ({ issueId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comments/${issueId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [issueId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${comment._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: replyText })
      });
      if (response.ok) {
        const updatedComment = await response.json();
        setReplyText('');
        setShowReply(false);
        // Update comment with new replies
        comment.replies = updatedComment.replies;
      } else {
        console.error('Error adding reply:', await response.json());
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className="comment-item">
      <p><strong>{comment.userId.name}:</strong> {comment.text}</p>
      <button onClick={() => setShowReply(!showReply)}>Reply</button>
      {showReply && (
        <form onSubmit={handleReplySubmit}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Your reply..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <div className="replies">
        {comment.replies.map((reply, index) => (
          <div key={index} className="reply">
            <p><strong>{reply.userId.name}:</strong> {reply.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
