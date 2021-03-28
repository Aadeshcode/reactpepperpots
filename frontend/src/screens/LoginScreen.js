import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { login } from "../actions/userActions";
import axios from 'axios'
import { FacebookLoginButton, GoogleLoginButton, createButton } from "react-social-login-buttons";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { auth, fbprovider, provider } from "../firebase";
// mport GoogleLogin from 'react-google-login';
import cogoToast from 'cogo-toast';
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
const LoginScreen = ({ history, location }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.userToken);
  const { userInfo: userEmail } = useSelector((state) => state.userRegister);

  const config = {
    text: "Login with Pepper Pots",
    icon: "facebook",
    iconFormat: name => `fa fa-${name}`,
    style: { background: "red" },
    activeStyle: { background: "orangered" }
  };
  const LoginButton = createButton(config);
  useEffect(() => {
    const redirect = location.search ? location.search.split('=')[1] : '/'
    if (token.email) {
      setEmail(token.email)
    }
    if (token.email) {
      history.push(redirect);
    }
  }, [token, dispatch, history, location, userEmail]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email || password) {
      try {
        const userLoginToken = await auth.signInWithEmailAndPassword(email, password)
        const token = ((await userLoginToken.user.getIdTokenResult()).token)
        dispatch(login(token))
      } catch (error) {
        cogoToast.error(error.message, { position: "bottom-right" })
      }
    } else {
      cogoToast.error('Please Enter all fields', { position: "top-right" })
    }

  };

  const fbLogin = async () => {

    auth.signInWithPopup(fbprovider)
      .then(async (result) => {

        const credential = result.credential;

        // The signed-in user info.
        const user = result.user;
        const idTokenResult = await user.getIdTokenResult();
        console.log(user)
        console.log(idTokenResult)
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const accessToken = credential.accessToken;
        console.log(accessToken)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error)
        // ...
      });
  }

  const googleLogin = async () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const { user } = result;
        console.log(user.email)
        const idTokenResult = await user.getIdTokenResult();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: idTokenResult.token
          },
        };
        try {
          const { data } = await axios.post(
            "/api/user/login",
            {},
            config
          );


          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,

          });
          localStorage.setItem("userCred", JSON.stringify(data));


        } catch (error) {
          await axios.post(
            "/api/user/register",
            {},
            config
          );
        }



        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
            emailVerified: user.emailVerified
          },
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error(err.message);
      });
  };




  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" message={error} />
  ) : (

        <div className="container my-5">

          <div className="row flex-column align-items-center">

            <div className='col-12 col-md-6'>
              <h2>Login</h2>
              <form onSubmit={onSubmit}>
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


                <LoginButton type="submit"><p>Login with Pepper Pots</p></LoginButton>
              </form>
              <GoogleLoginButton onClick={googleLogin} style={{ textAlign: 'center' }} > <p>Login With Google</p></GoogleLoginButton>
              <FacebookLoginButton onClick={fbLogin} ><p>Login With Facebook</p></FacebookLoginButton>


              <NavLink to='/forgetpassword' exact><button className='btn'>forgot password?</button></NavLink>
            </div>
          </div>
        </div>
      );
};

export default LoginScreen;




