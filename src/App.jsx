import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NGOList from './pages/NGOList';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NGOLogin from './pages/auth/NGOlogin';
import NGORegister from './pages/auth/NGORegister';
import Dashboard from './pages/Dashboard';
import NGODetails from './pages/NGODetails';
import { Heart } from 'lucide-react';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ngos" element={<NGOList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ngo-register" element={<NGORegister />} />
            <Route path="/ngo-login" element={<NGOLogin/>} />
            <Route path="/ngos" element={<NGOList/>} />
            <Route path="/ngos/:id" element={<NGODetails />} />
          

            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="bg-white shadow-inner py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <Heart className="w-5 h-5" />
              <span className="font-medium">SadaqaSafar</span>
            </div>
            <p className="mt-2 text-gray-600">Connecting hearts through charitable giving</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;