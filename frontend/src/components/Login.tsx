import React from 'react'
import { LoginForm } from '../layouts'
import chatLogo from "../img/chatbot-logo.png"
function Login() {
  return (
    <div className='loginContainer'>
      <div className="logoSection">
        <img src={chatLogo} alt="alxChatLogo" />
      </div>
      <div className="formSection">
        <LoginForm/>
      </div>
    </div>
  )
}

export default Login