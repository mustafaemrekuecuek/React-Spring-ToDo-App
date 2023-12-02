import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styleComponents/Navbar.css';

function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  }

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link className={getLinkClass('/Tomorrow')} to="/tomorrow">Morgen</Link>
        </li>
        <li>
          <Link className={getLinkClass('/Today')} to="/today">Heute</Link>
        </li>
        <li>
          <Link className={getLinkClass('/Completed')} to="/Completed">Erledigt</Link>
        </li>
        <li>
          <Link className={getLinkClass('/Home')} to="/Home">Hauptseite</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;