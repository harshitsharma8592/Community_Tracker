import React, { useState } from 'react';

const CommentForm = ({ issueId, onCommentAdded }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ issueId, text })
      });
      if (response.ok) {
        const newComment = await response.json();
        onCommentAdded(newComment);
        setText('');
      } else {
        console.error('Error adding comment:', await response.json());
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your comment..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
