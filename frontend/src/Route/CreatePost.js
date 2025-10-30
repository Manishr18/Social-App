import React, { useState } from 'react';
import API from '../Api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const gottohome=()=>{
    navigate('/home')
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to create a post.');
        return;
      }

      const formData = new FormData();
      formData.append('text', text);
      if (image) formData.append('image', image);

      const res = await API.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Post created successfully!');
      setText('');
      setImage(null);
      setPreview(null);
      window.location.href = '/home';
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || 'Error creating post.');
    }
  };

  return (
    <div

    
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '30px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        color: '#333',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'center',
      }}
    >
       <button
            onClick={gottohome}
            style={{
              background: 'linear-gradient(90deg, #36d1dc, #000000ff)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              marginRight: '10px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            HOME
          </button>
      <h2 style={{ marginBottom: '20px', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
        Create a Post
      </h2>

      {message && (
        <p
          style={{
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '8px',
            color: message.includes('Error') ? '#ff4757' : '#2ed573',
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          style={{
            width: '100%',
            height: '100px',
            borderRadius: '10px',
            border: 'none',
            padding: '10px',
            fontSize: '16px',
            marginBottom: '15px',
            outline: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            marginBottom: '15px',
            display: 'block',
            width: '100%',
            backgroundColor: '#fff',
            padding: '8px',
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
        />

        {preview && (
          <div
            style={{
              marginBottom: '15px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            <img
              src={preview}
              alt="preview"
              style={{
                width: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Post 🚀
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
