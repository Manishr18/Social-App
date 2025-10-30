import React, { useEffect, useState } from 'react';
import Api from '../Api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newText, setNewText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await Api.get('/posts/myposts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching user posts:', err);
      }
    };
    fetchUserPosts();
  }, []);

  const handleEdit = async (postId) => {
    try {
      await Api.put(`/posts/${postId}`, { text: newText });
      setEditingPost(null);
      const res = await Api.get('/posts/myposts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error editing post:', err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await Api.delete(`/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleComment = async (postId, text) => {
    if (!text.trim()) return;
    try {
      const res = await Api.post(`/posts/${postId}/comments`, { text });
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const gotToHome = () => {
    navigate('/home');
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '40px auto',
        padding: '25px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, #f8b6d8 0%, #a1c4fd 100%)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={gotToHome}
          style={{
            background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          ⬅ Home
        </button>
      </div>

      <h2
        style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#fff',
          textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        My Posts
      </h2>

      {posts.map((p) => (
        <div
          key={p._id}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: '0.3s',
          }}
        >
          {editingPost === p._id ? (
            <>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginBottom: '10px',
                }}
              />
              <button
                onClick={() => handleEdit(p._id)}
                style={{
                  background: 'linear-gradient(90deg, #00b09b, #96c93d)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  marginRight: '5px',
                  cursor: 'pointer',
                }}
              >
                💾 Save
              </button>
              <button
                onClick={() => setEditingPost(null)}
                style={{
                  background: '#ccc',
                  color: 'black',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                ✖ Cancel
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: '16px', marginBottom: '5px' }}>{p.text}</p>
              <p style={{ color: '#666', fontSize: '13px' }}>
                {new Date(p.createdAt).toLocaleDateString()}
              </p>

              {p.image && (
                <img
                  src={`https://social-app-x8zt.onrender.com${p.image}`}
                  alt="post"
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    marginTop: '10px',
                    maxHeight: '400px',
                    objectFit: 'cover',
                  }}
                />
              )}

              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => {
                    setEditingPost(p._id);
                    setNewText(p.text);
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #1e90ff, #00bfff)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{
                    background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </>
          )}

          {/* Comments Section */}
          <div style={{ marginTop: '15px', background: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px', color: '#333' }}>
              💬 Comments ({p.comments?.length || 0})
            </h4>

            {p.comments?.map((c, i) => (
              <p key={i} style={{ margin: '4px 0' }}>
                <strong>{c.user?.name || 'User'}:</strong> {c.text}
              </p>
            ))}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const text = e.target.comment.value;
                handleComment(p._id, text);
                e.target.reset();
              }}
            >
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                style={{
                  width: '75%',
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginRight: '5px',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #36d1dc, #5b86e5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
