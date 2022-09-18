import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userData'));

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
