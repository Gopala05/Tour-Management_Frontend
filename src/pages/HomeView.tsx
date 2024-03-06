import { Footer } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import Nav from '../sections/home/nav';
import Main from '../sections/home/mainContent';
import Trensding from '../sections/home/Trending';
// import Destnation from '../sections/home/destination';

const HomeView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return(<>
    <Nav hide={false}/>
    <Main />
    <Trensding />
    {/* <Destnation/> */}
    {/* <hr style={{ border: 'none', fontSize: '1px' }}></hr> */}
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: '#263043',
        padding: '1px',
      }}
    >
      <p
        style={{
          fontWeight: 900,
          color: 'whitesmoke',
          margin: '5px',
          fontSize: '16px',
        }}
      >
        © Copyright Travel.<span style={{marginLeft: '5px'}}>{' '}All Rights Reserved</span>
      </p>
    </Footer>
  </>)
};

export default HomeView;
