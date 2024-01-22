// Import necessary libraries
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { PropertyList } from './pages/PropertyList';
import user from './utils/user.service';
import * as jose from 'jose';


// Assume this is part of a function that is checking authentication
const checkAuthentication = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/token',{  credentials: "include"});

    if (response.status === 401) {
      // Redirect to the login page
      return false;
    }
    const token = await response.text();
    if(token){
      const decodedToken = jose.decodeJwt(token);
      user.setUserData(decodedToken);
      return true;
    }
    return false;

    // Handle other status codes or continue processing the response
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};




// PrivateRoute component to handle authenticated routes
const PrivateRoute = ({ element, isAuthenticated }: any) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const RoutesManager = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    (async () => {
      let isTokenValid = await checkAuthentication();
      setIsAuthenticated(isTokenValid);
    
    })();
   
  }, []);
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/property-list"
          element={<PrivateRoute element={<PropertyList />} isAuthenticated={isAuthenticated} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default RoutesManager;
