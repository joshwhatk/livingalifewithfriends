import React from 'react';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg';
import logo from '../img/logo.svg';

const Navbar = () => (
  <nav className="grid-container">
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Living a Life with Friends" style={{ width: '88px' }} />
              </figure>
            </Link>
          </div>
          <li>
            <Link to="/about">
              About
            </Link>
          </li>
          <li>
            <Link to="/podcast">
              Podcast
            </Link>
          </li>
          <li>
            <Link to="/blog">
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
