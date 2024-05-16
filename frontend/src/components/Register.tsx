import React from 'react'
import chatLogo from '../img/chatbot-logo.png'
import { RegisterForm } from '../layouts'
function Register() {
  //Check RegisterForm for registration logic
  return (
    <div className='loginContainer'>
      <div className="logoSection">
        <img src={chatLogo} alt="alxChatLogo" />
      </div>
      <div className="formSection">
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register