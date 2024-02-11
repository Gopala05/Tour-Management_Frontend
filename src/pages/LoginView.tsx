import React, { useEffect } from 'react';
import Nav from '../sections/home/nav';
import LoginPage from '../sections/login/LoginPage';

const HomeView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return(<>
    <Nav hide={true} />
    <LoginPage />
  </>)
};

export default HomeView;
