import React from 'react';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg';
import logo from '../assets/images/logo.svg';

const Navbar = () => (
  <nav id="main-navigation">
    <div className="grid-container">
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <Link to="/" className="brand">
              <figure className="image">
                <img src={logo} alt="Living a Life with Friends" style={{ width: '388px' }} />
              </figure>
            </Link>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <Link to="/podcast">
                Podcast
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
