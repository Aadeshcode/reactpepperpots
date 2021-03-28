

import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { auth } from "../firebase";

const SignupScreen = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, success } = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo || success) {
      history.push('/login')
    }

  }, [userInfo, history, success])
  const submitLogin = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

      try {

        await auth.createUserWithEmailAndPassword(email, password);
        const user = auth.currentUser;
        const idTokenResult = await user.getIdTokenResult();
        dispatch(register(idTokenResult.token))


        if (user) {
          await user.sendEmailVerification()
          cogoToast.success("An authentication link has been sent to your account. Kindly check your inbox")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        }
      }
      catch (error) {
        cogoToast.error(error.message)
      }
    }
    else {
      cogoToast.error('Passwords do not match')

    }
  };


  return (
    <div className="container my-5">
      {loading ? <Loader /> : ""}

      {error ? <Message variant='danger' message={error} /> : ""}
      {success ? <Message variant='success' message={success} /> : ""}
      <div className="row flex-column justify-content-center align-items-center">
        <div className='col-12 col-md-6'>

          <h2>Register</h2>
          <form className="">

            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-Greenery btn-block shadow" onClick={submitLogin}>
              Register
          </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
