import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { logout } from '../../actions/auth'

function Navbar({ auth:{isAuthenticated,isCompanyAuthenticated, isAdminAuthenticated ,loading}, logout }) {

  const authLinks = (
    <ul>
      <li>
        <a href='#!' onClick={ logout }>
          <i className='fas fa-sign-out-alt' />{' '} 
          <span className='hide-sm' >Logout</span>
        </a>
      </li>
    </ul>
  )
  const companyAuthLinks = (
    <ul>
      <li>
        <a href='#!' onClick={ logout }>
          <i className='fas fa-sign-out-alt' />{' '} 
          <span className='hide-sm' >Logout</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/parser">Parser</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  const adminLinks = (
    <ul>
      <li>
        <a href='#!' onClick={ logout }>
          <i className='fas fa-sign-out-alt' />{' '} 
          <span className='hide-sm' >Logout</span>
        </a>
      </li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark shadow-xl">
      <h1>
        <Link className='flex items-center' to="/"><i className="fas fa-code"></i><p className='font-bold ml-1 text-2xl'>RAPID HIRE</p></Link>
      </h1>
      {!loading && (
      <Fragment>
        {isAuthenticated && authLinks }
        {isCompanyAuthenticated && companyAuthLinks }
        {isAdminAuthenticated && adminLinks }
        {!isCompanyAuthenticated && !isAuthenticated && !isAdminAuthenticated && guestLinks }
      </Fragment>
      )}
    </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {logout})(Navbar)
