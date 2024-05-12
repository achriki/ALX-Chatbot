import React from 'react'
import { LoginForm } from '../layouts'
import chatLogo from "../img/chatbot-logo.png"
import ThirdPartyAuth from '../views/ThirdPartyAuth'
function Login() {
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