import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { logout } from '../../actions/auth'

function Navbar({ auth:{isAuthenticated,isCompanyAuthenticated, isAdminAuthenticated, user ,loading, company}, logout }) {

  const authLinks = (
    <ul className=' divide-y '>
      <li className=' py-3 '>
        <Link className='text-white px-2' to="/dashboard">
        <i className="fa fa-id-card-o" aria-hidden="true"></i>
          <span className='text-xl ml-2'> Dashboard</span> 
        </Link>
      </li>
      <li className=' py-3 '>
        {user && (
            <Link className='text-white px-2'to={`/profile/${user._id}`}>
                <i className='fas fa-user ' />{' '} 
                <span className='text-xl  ml-3'> My Profile</span> 
            </Link>
        )}
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/edit-cv">
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <span className='text-xl  ml-5'>Build CV</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/jobs">
            <i className="fa fa-briefcase" aria-hidden="true"></i>
            <span className='text-xl  ml-5'>Jobs</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/posts">
            <i className="fa fa-clipboard" aria-hidden="true"></i>
            <span className='text-xl  ml-4'>Posts</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/profiles">
            <i className="fa fa-users" aria-hidden="true"></i>  
            <span className='text-xl  ml-3'>Profiles</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2 flex items-center mt-1' to="/video">
            <i className="fa fa-video-camera" aria-hidden="true"></i>  
            <span className='text-xl  ml-3'>Interviews</span> 
        </Link>
      </li>
      
    </ul>
  )
  const companyAuthLinks = (
    <ul className='divide-y'>
      <li className=' py-3 '>
        <Link className='text-white px-2' to="/dashboard">
        <i className="fa fa-id-card-o" aria-hidden="true"></i>
          <span className='text-xl ml-2'> Dashboard</span> 
        </Link>
      </li>
      <li className=' py-3 '>
        {company && (
            <Link className='text-white px-2'to={`/company-profile/${company._id}`}>
                <i className='fas fa-user ' />{' '} 
                <span className='text-xl  ml-3'> My Profile</span> 
            </Link>
        )}
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/post-job">
            <i className="fa fa-briefcase " aria-hidden="true"></i>  
            <span className='text-xl  ml-3'>Post Job</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/profiles">
            <i className="fa fa-users" aria-hidden="true"></i>  
            <span className='text-xl  ml-3'>Profiles</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className='text-white  px-2' to="/resumes">
            <i className="fa fa-file" aria-hidden="true"></i>  
            <span className='text-xl  ml-6'>Resumes</span> 
        </Link>
      </li>

      
    </ul>
  )

  const guestLinks = (
    <ul className='divide-y'>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  const adminLinks = (
    <ul>
      <li>
      </li>
    </ul>
  )

  return (
     isAuthenticated || isCompanyAuthenticated ? (
    <div className='sidebar fixed  h-screen bg-dark w-80 -mt-14' >
        <div className='px-16 mt-20'>
                {!loading && (
                <Fragment>
                    {isAuthenticated && authLinks }
                    {isCompanyAuthenticated && companyAuthLinks }
                    {isAdminAuthenticated && adminLinks }
                    {!isCompanyAuthenticated && !isAuthenticated && !isAdminAuthenticated && guestLinks }
                </Fragment>
                )}
        </div>
    </div>
    ) : (
        null
    ) 
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  
})

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {logout})(Navbar)
