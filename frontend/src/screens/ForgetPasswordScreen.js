import cogoToast from 'cogo-toast'
import React, { useState } from 'react'
import { auth } from '../firebase'

const ForgetPasswordScreen = () => {
    const [email, setEmail] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        auth.sendPasswordResetEmail(email).then(function () {
            cogoToast.success(`Password reset link has been sent to ${email}. Please check your inbox and login with the new password`)
        }).catch(function (error) {
            cogoToast.error(error)
        });
    }
    return (
        <div className="container my-5">
            <div className="row flex-column align-items-center">
                <div className='col-12 col-md-6'>
                    <h2>Forgot Password</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="form-control form-control-footer"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-Greenery btn-block shadow">
                            Send Reset Link
          </button>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordScreen
