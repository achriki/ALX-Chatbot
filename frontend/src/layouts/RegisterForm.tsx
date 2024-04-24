import React,{useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Link, RadioGroup, HStack, Radio
  } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function RegisterForm() {
    const [show, setShow] = React.useState(false)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const handleClick = () => setShow(!show)
    const handleRegister = (e:any)=>{
        e.preventDefault()
    }
    return (
        <form className='LoginForm' onSubmit={handleRegister}>
            <FormLabel mt={5}>Fullname</FormLabel>
            <Input variant='flushed' value={fullname} required placeholder='Enter Fullname' />
            <FormLabel mt={5}>Username</FormLabel>
            <Input variant='flushed' value={username} required placeholder='Enter Username' />
            <FormLabel mt={5}>Email</FormLabel>
            <Input variant='flushed' value={email} required placeholder='test@alxchatbot.com' />
            <FormLabel mt={8}>Password</FormLabel>
            <InputGroup size='md' >
                <Input
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
            <FormLabel mt={8}>Gender</FormLabel>
            <RadioGroup defaultValue='Itachi'>
                <HStack spacing='24px'>
                    <Radio value='Male'>Male</Radio>
                    <Radio value='Female'>Female</Radio>
                </HStack>
            </RadioGroup>
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