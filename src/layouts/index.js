import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navbar from '../components/Navbar';
import '../assets/scss/style.scss';

const TemplateWrapper = ({ children }) => (
  <main className="grid-container-fluid">
    <Helmet title="Home | Living a Life with Friends">
      <meta name="google-site-verification" content="x5uOZNO2WpCH3md13x9SKr8L92_MiWLnUF6tq4XXrOg" />
    </Helmet>
    <Navbar />
    {children()}
  </main>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
