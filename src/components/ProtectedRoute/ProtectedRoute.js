import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ loggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  if (loggedIn) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;