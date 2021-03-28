import React from 'react'
import { Link } from 'react-router-dom'

const LoginLeaflet = () => {
    return (
        <div className='LoginLeaflet row p-md-5 p-2 m-2 m-md-5 justify-content-center'>
            <p className=' col-md-7 col-12 text-white m-0 text-center'>Register now to get exclusive discounts. Already registered?
            <Link exact="true" to='/login'><li>Login</li></Link></p>
            <div className='col-md-5 col-12 row justify-content-center'>
                <button className='btn btn-info px-5 m-1'> Register</button>
                <button className='btn btn-outline-info px-5 m-1'> Shop Now</button>
            </div>
        </div>
    )
}

export default LoginLeaflet
