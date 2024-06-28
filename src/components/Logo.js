import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import logo from '../../assets/img/logos/myems.png';
// import logo from '../assets/img/logos';
import logo from '../assets/img/logos/powertank.jpg';
import logo2 from '../assets/img/logos/PTE.jpg';
import './logo.css';

const Logo = ({ at, width, className, ...rest }) => {
  return (
    <Link
      to="/dashboardnew"
      className={classNames(
        'text-decoration-none',
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' }
      )}
      {...rest}
    >
      <div
        className={classNames(
          'd-flex',
          {
            'align-items-center py-3': at === 'navbar-vertical',
            'align-items-center': at === 'navbar-top',
            'flex-center font-weight-extra-bold fs-5 mb-4': at === 'auth',
          },
          className
        )}
      >
        <img className="mr-2" src={logo} alt="Logo" width={width} /> 
      </div>
    </Link>
  );
};

// Logo.propTypes = {
//   at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
//   width: PropTypes.number,
//   className: PropTypes.string
// };

// // Logo.defaultProps = { at: 'auth', width: 58 };
// Logo.defaultProps = { at: 'auth', width: 201 };

export default Logo;
