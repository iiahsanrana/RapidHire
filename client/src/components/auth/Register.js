import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { register, companyRegister } from '../../actions/auth'


function Register ({setAlert, register, isAuthenticated,isCompanyAuthenticated, companyRegister })  {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [showCompanyRegister, setShowCompanyRegister] = useState(false)

    const {name, email, password, password2} = formData

    const navigate = useNavigate(); 

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (password !== password2){
            setAlert('Password does not match', 'danger ')
        }else{
          if (showCompanyRegister) {
            await companyRegister({ name, email, password })
          } else {
            await register({ name, email, password })
            navigate('/create-profile'); 
          }
          
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        
    }

    if (isAuthenticated || isCompanyAuthenticated) {
      return isCompanyAuthenticated ? (
        <Navigate to="/company-dashboard" />
      ) : (
        <Navigate to="/dashboard" />
      )
    }

    return (
    <div className="auth">
      <div className='auth-container'>
      <div className="btn-container ">
         <button disabled={!showCompanyRegister} onClick={()=> setShowCompanyRegister(!showCompanyRegister)} className={showCompanyRegister ? "btn btn-primary" : "btn btn-disable"}>User Registration</button>
         <button disabled={showCompanyRegister} onClick={()=> setShowCompanyRegister(!showCompanyRegister)} className={showCompanyRegister ? "btn btn-disable" : "btn btn-primary"}>Company Registration</button>
      </div>
      <h1 className="text-6xl my-4 font-semibold text-primary text-center ">
        {showCompanyRegister ? 'Company Registration' : 'User Sign Up'}
      </h1>
      <p className="lead">
        <i className="fas fa-user ml"></i> 
        <p className='inline-block ml-4' >{showCompanyRegister ? 'Create Company Account' : 'Create User Account'}</p>
      </p>
      <form className="form" onSubmit={e => handleSubmit(e)} >
        {showCompanyRegister && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Company Name"
              name="name"
              required
              value={name}
              onChange={e => handleChange(e)}
            />
          </div>
        )}
        {!showCompanyRegister && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={e => handleChange(e)}
            />
          </div>
        )}
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={(e) => handleChange(e)} 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} 
            onChange={(e) => handleChange(e)} 
          />
        </div>
        <input type="submit" className="btn btn-primary mb-1" value="Register" />
      </form>
      <p className="mb-6 mt-3">
        Already have an account?
        <span className='text-primary'>
          {showCompanyRegister ? (<Link to="/login">Sign In</Link>) : (<Link to={{ pathname: '/login', state: { company: true } }}>Sign In</Link>)}
        </span>
      </p>
      
    </div>
    </div>
  )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    companyRegister: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated,
})

export default connect(
    mapStateToProps, 
    { setAlert, register, companyRegister }
)(Register) 