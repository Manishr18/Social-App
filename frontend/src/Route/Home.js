import React, { useEffect, useState } from 'react';
import Api from '../Api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await Api.get('/posts/allposts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const goToProfile = () => navigate('/profile');
  const goTOCreate = () => navigate('/createpost');

  const handleLike = async (postId) => {
    try {
      await Api.post(`/posts/${postId}/like`);
      const res = await Api.get('/posts/allposts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
    try {
      const res = await Api.post(`/posts/${postId}/comments`, { text: commentText });
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, comments: res.data.comments } : p))
      );
    } catch (err) {
      console.error('Error commenting:', err);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        fontFamily: 'Poppins, sans-serif',
        background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          padding: '10px 15px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        }}
      >
        <h2 style={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>🏠 Home</h2>
        <div>
          <button
            onClick={goToProfile}
            style={{
              background: 'linear-gradient(90deg, #36d1dc, #5b86e5)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              marginRight: '10px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Profile
          </button>

          <button
            onClick={goTOCreate}
            style={{
              background: 'linear-gradient(90deg, #11998e, #38ef7d)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              marginRight: '10px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Create Post
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: 'linear-gradient(90deg, #ff0844, #ffb199)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.map((p) => (
        <div
          key={p._id}
          style={{
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '20px',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <strong style={{ color: '#2c3e50' }}>{p.user?.name}</strong>
          <p style={{ color: '#555' }}>{p.text}</p>
          <p style={{ color: '#999', fontSize: '12px' }}>
            {new Date(p.createdAt).toLocaleString()}
          </p>

          {p.image && (
            <img
              src={`https://social-app-x8zt.onrender.com${p.image}`}
              alt="post"
              style={{
                width: '100%',
                borderRadius: '10px',
                marginBottom: '10px',
                maxHeight: '400px',
                objectFit: 'cover',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              }}
            />
          )}

          <button
            onClick={() => handleLike(p._id)}
            style={{
              background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '10px',
            }}
          >
            ❤️ Like ({p.likes?.length || 0})
          </button>

          <div style={{ marginTop: '10px' }}>
            <h4 style={{ color: '#2c3e50' }}>Comments ({p.comments?.length || 0})</h4>
            {p.comments?.map((c, i) => (
              <p key={i} style={{ color: '#555' }}>
                <strong style={{ color: '#2980b9' }}>{c.user?.name || 'User'}:</strong> {c.text}
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
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginRight: '5px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #36d1dc, #5b86e5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontWeight: '600',
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

export default Home;
