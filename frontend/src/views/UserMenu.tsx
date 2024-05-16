import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button, Image
} from '@chakra-ui/react'
import { UnlockIcon } from '@chakra-ui/icons'
import alxLogo from '../img/chatbot-logo.png'

type userInfos = {
    imgUrl: string | undefined;
    username: string | undefined;
    email: string | undefined;
}

function UserMenu(props: userInfos) {
  return (
    <div style={{width: '20%', position:'absolute', bottom:'20px'}}>
        <Menu >
            <MenuButton as={Button} colorScheme='teal' minH='48px' width='100%' className='settingBtn'>
                <Image
                    boxSize='2.3rem'
                    borderRadius='full'
                    src= {props.imgUrl || alxLogo} 
                    alt='user image'
                    mr='12px'
                />
                <span>{props.username}</span>
            </MenuButton>
            <MenuList bgColor="#212121">
                <MenuItem bgColor="#212121">{props.email}</MenuItem>
                <MenuDivider />
                <MenuItem bgColor="#212121" icon={<UnlockIcon />}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    </div>
  )
}

export default UserMenu