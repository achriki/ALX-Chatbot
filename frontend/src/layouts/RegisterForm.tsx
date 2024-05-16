import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
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
    Link, RadioGroup, HStack, Radio, useToast
  } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function RegisterForm() {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const server_url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT || 80}`;
    const toast = useToast()
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const handleClick = () => setShow(!show)
    const handleFullname = (e:any)=>{setFullname(e.target.value)}
    const handleUsername = (e:any)=>{setUsername(e.target.value)}
    const handlePassword = (e:any)=>{setPassword(e.target.value)}
    const handleEmail = (e:any)=>{setEmail(e.target.value)}

    const handleRegister = async (e:any)=>{

        e.preventDefault()
        const userData = {fullname: fullname, username: username, email: email, password: password}
        const sendRequest = axios.post(`${server_url}/signup`, 
        {
          userInfos: userData
        })
        if((await sendRequest).status === 200){
            toast({
                title: `User signed up`,
                status: 'success',
                isClosable: true,
                position: 'top'
            })
            setFullname('')
            setEmail('')
            setUsername('')
            setPassword('')
            setTimeout(()=>{
                navigate('/')
            }, 1500)
        }else{
            toast({
                title: `Internal error: email is already in use please try to login or change the email`,
                status: 'error',
                isClosable: true,
                position: 'top'
            })
        }
    }

    return (
        <form className='LoginForm' onSubmit={handleRegister}>
            <FormLabel mt={5}>Fullname</FormLabel>
            <Input variant='flushed' value={fullname} onChange={handleFullname} required placeholder='Enter Fullname' />
            <FormLabel mt={5}>Username</FormLabel>
            <Input variant='flushed' value={username} onChange={handleUsername} required placeholder='Enter Username' />
            <FormLabel mt={5}>Email</FormLabel>
            <Input variant='flushed' value={email} onChange={handleEmail} required placeholder='test@alxchatbot.com' />
            <FormLabel mt={8}>Password</FormLabel>
            <InputGroup size='md' >
                <Input
                    onChange={handlePassword}
                    variant='flushed'
                    pr='4.5rem'
                    required
                    value={password}
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
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
            <Link href='/' color="#023e8a" display="block" mt="3%" isExternal>
                Login <ExternalLinkIcon mx='2px' />
            </Link>
        </form>
    )
}

export default RegisterForm