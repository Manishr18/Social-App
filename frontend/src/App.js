import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import CreatePost from './Route/CreatePost';
import Home from './Route/Home';
import Profile from './Route/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
