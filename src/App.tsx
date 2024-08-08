import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Flex } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './components/Login';
import Students from './pages/Students';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Flex flexDir="column" justifyContent="space-between" height="full" minH="100vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/students" element={<ProtectedRoute element={<Students />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Flex>
      </Router>
    </AuthProvider>
  );
};

export default App;
