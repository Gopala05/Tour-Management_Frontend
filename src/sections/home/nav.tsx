import GAC from '../../assets/Icons/GAC_logo1.png'
import { Link } from 'react-router-dom'
import { Image } from 'antd';

interface NavProps {
  hide: boolean
}

function nav({ hide }: NavProps) {
  const scrollToFAQ = (component: string) => {
    const faqElement = document.getElementById(component);
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const HomeScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <div className='navi'>
      <nav className="navigation">
      <Link to="/" className="logo" style={{ textDecoration: "none", position: 'relative' }}>
        <span>
        <Image width={80} height={70} style={{ top: '0.5rem', right: '0.5rem', position: 'absolute', overflow: 'hidden'}} className="Gac" src={GAC} alt="Logo" />
        </span>
          Tour
      </Link>
      {!hide ? <><ul className="menu">
          <li><Link onClick={() => HomeScroll()} to={''}>Home</Link></li>
          <li><Link onClick={() => scrollToFAQ("trending")} to={''}>Trending</Link></li>
          <li><Link onClick={() => scrollToFAQ("reviews")} to={''}>Reviews</Link></li>
          <li><Link onClick={() => scrollToFAQ("contactus")} to={''}>Contact Us</Link></li>
        </ul><Link to='/login'>
            <p className="book-now-btn"> Book Now </p>
          </Link></>: ''}
    </nav>

    </div>
  )
}

export default nav
