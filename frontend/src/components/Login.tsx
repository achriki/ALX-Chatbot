import React from 'react'
import { LoginForm } from '../layouts'
import chatLogo from "../img/chatbot-logo.png"
import ThirdPartyAuth from '../views/ThirdPartyAuth'
function Login() {
  // Check LoginFrom component for a simple login
  // ThirdPartyAuth component for a third party login like google
  return (
    <div className='loginContainer'>
      <div className="logoSection">
        <img src={chatLogo} alt="alxChatLogo" />
      </div>
      <div className="formSection">
        <LoginForm/>
        <ThirdPartyAuth/>
      </div>
    </div>
  )
}

export default Login