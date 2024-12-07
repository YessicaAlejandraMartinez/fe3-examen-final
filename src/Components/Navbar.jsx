import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../Components/utils/global.context';

const Navbar = () => {
  const { state, toggleTheme } = useGlobalContext();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Tab') {
        navRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <nav className={`nav ${state.theme}`} ref={navRef}>
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/favs"
            className={location.pathname === '/favs' ? 'active' : ''}
          >
            Favs
          </Link>
        </li>
      </ul>
      <button onClick={toggleTheme}>🌞🌜</button>
    </nav>
  );
};

export default Navbar;