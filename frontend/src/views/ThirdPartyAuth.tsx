import React from 'react'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Navigate,useNavigate,useLocation } from 'react-router-dom'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Link, useToast
  } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function ThirdPartyAuth() {
    const default_password = process.env.REACT_APP_DEFAULT_PASSWORD
    const server_url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT || 80}`
    const navigate = useNavigate()
    const handleGoogleLogin = useGoogleLogin({
      onSuccess: (codeResponse) => {
          const userProfile = axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
              headers: {
                  Authorization: `Bearer ${codeResponse.access_token}`,
                  Accept: 'application/json'
              }
          }).then((res)=>{
              const userData = res.data
              console.log(userData)
              const registerRequest = axios.post(`${server_url}/signupThird`, 
              {
                userInfos: {fullname: userData.given_name +" "+userData.family_name , username: userData.name, email: userData.email, password: default_password, image: userData.thumbnailLink}
              }).then((res)=>{
                  console.log(res.data.id)
                  if(res.status === 200){
                      navigate(`/chat_panel/${res.data.id}`)
                  }
              }).catch((err)=> console.log(err))
          }).catch((err)=>console.log(err))
      },
      onError: (error)=>{
          console.log('Login Failed: ', error)
      }
    })

    return (
      <div>
          <InputGroup size='md' display='flex' alignItems='center' justifyContent='center'>
              <Button
                mt={6}
                colorScheme='Facebook'
                variant='outline'
                type='submit'
                fontSize="30px"
                border='none'
                onClick={()=>{}}
              >
                <FontAwesomeIcon icon={faGithub} />
              </Button>
              <Button
                mt={6}
                colorScheme='Facebook'
                variant='outline'
                type='submit'
                fontSize="30px"
                border='none'
                onClick={()=>{handleGoogleLogin()}}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </Button>
            {/* <GoogleLogin onSuccess={googleLoginResponse} onError={googleLoginErrorMessage} /> */}

            </InputGroup>
      </div>
    )
}

export default ThirdPartyAuth