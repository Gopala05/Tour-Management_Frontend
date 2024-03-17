import React, { useEffect } from 'react';
import Nav from '../sections/home/nav';
import AdminLogin from '../sections/Admin/adminLogin/AdminLogin';

const LoginView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return(<>
    <Nav hide={true} />
    <AdminLogin />
  </>)
};

export default LoginView;
