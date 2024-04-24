import React, {useState, useCallback} from 'react'
import axios from 'axios'
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

function LoginForm() {
    const Toast = useToast() 
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const server_url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT || 80}`;
    const handleLogin = async(e:any)=>{
      e.preventDefault()
      const sendRequest = axios.post(`${server_url}/login`, 
        {
          username:  username,
          password: password
        }
      )
      if((await sendRequest).status === 200){
        const userData = (await sendRequest).data.dbResult
        console.log(userData)
        if(userData === null){
          Toast({
            title: `Invalide username/password`,
            status: 'error',
            isClosable: true,
            position: 'top'
          })
        }else{
          console.log(userData)
        }
      }
    }
    return (
        <form className='LoginForm' onSubmit={handleLogin}>
          <FormLabel mt={5}>Username / Email</FormLabel>
          <Input variant='flushed' placeholder='Username or email' required value={username} onChange = {(e)=>setUsername(e.target.value)} />
          <FormLabel mt={8}>Password</FormLabel>
          <InputGroup size='md' >
              <Input
                  variant='flushed'
                  pr='4.5rem'
                  required
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange = {(e)=>setPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' style={{background:"none"}} onClick={handleClick}>
                  {show ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash}/> }
                  </Button>
              </InputRightElement>
          </InputGroup>
          <Button
            mt={6}
            colorScheme='Facebook'
            variant='outline'
            type='submit'
            
          >
            Submit
          </Button>
          <Link href='/register' color="#023e8a" display="block" mt="3%" isExternal>
            Register for free <ExternalLinkIcon mx='2px' />
          </Link>
          <InputGroup size='md' display='flex' alignItems='center' justifyContent='center'>
            <Button
              mt={6}
              colorScheme='Facebook'
              variant='outline'
              type='submit'
              fontSize="30px"
              border='none'
              onClick={handleLogin}
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
              onClick={handleLogin}
            >
              <FontAwesomeIcon icon={faGoogle} />
            </Button>
          </InputGroup>
        </form>
    )
}

export default LoginForm