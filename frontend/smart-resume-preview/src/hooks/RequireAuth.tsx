
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    if (!token) {
      navigate('/login');
      return;
    }

  }, [navigate]);

  return <>{children}</>;
};

export default RequireAuth;
