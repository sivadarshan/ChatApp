import React from 'react'
import firebase from 'firebase/app';
import 'firebase/app';
import { auth } from '../firebase';
import { GoogleOutlined } from '@ant-design/icons'

const Login = () => {
  return (
    <div id="login-page">
        <div id='login-card'>

          {/* For login we are using Firebase for both Google and Facebook login  Firebase => Build => Authentication => SignIn and add the both  */}
            <h2>Welcome to ChatIt!</h2>

            {/* Google login button */}
            <div className='login-button google' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                <GoogleOutlined/> SignIn with Google
            </div>

            
        </div>
    </div>
  );
}

export default Login