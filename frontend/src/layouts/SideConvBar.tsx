import React, {useState, useEffect, useRef, createContext, useContext} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Flex, useToast, useDisclosure, Button, FormControl, FormLabel, Input, Heading, IconButton
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import CreateConv from '../views/CreateConv'
import UserMenu from '../views/UserMenu'
import { changeConvTitle } from '../utils/conversation'

type conversation = {
    user_id: string;
    title: string;
    _id: string;
}

type userInfos = {
    imgUrl: string | undefined;
    username: string;
    email: string;
}

type sideBarType = {
    conversation_list: conversation[];
    user_id: string | undefined;
    setID: Function;
    user_info: userInfos | undefined
}

type EditableType = {
    _id: string | undefined;
    title: string
}
function SideConvBar(props: sideBarType) {
    const [conversations, setConversations] = useState<conversation[]>([])
    

    useEffect(()=>{
        setConversations(props.conversation_list)
    },[props])
    const EditableControl = (props:EditableType)=>{
        const toast = useToast()
        const { isOpen, onOpen, onClose } = useDisclosure()
        const initialRef = useRef(null)
        const finalRef = useRef(null)
        const [title, setTtile] = useState<string>(props.title || '')

        //Update title value
        const changeValue = (e:any)=>{
            setTtile(e.target.value)
        }

        // Submit the modification
        // for more details check the utils files
        const changeTitle = async (e:any) =>{
            e.preventDefault()
            const sendTitle = await changeConvTitle(title, props._id)
            console.log("sendTitle")
            if(sendTitle){
                const objIndex = conversations.findIndex((entry) => entry._id === props._id)
                conversations[objIndex].title = title
                toast({
                    title: `Conversation name changed `,
                    status: 'success',
                    isClosable: true,
                    position: 'top'
                })
                onClose()
            }else{
                toast({
                    title: `Something went wrong please try again`,
                    status: 'error',
                    isClosable: true,
                    position: 'top'
                })
            }

        }
        return (
            <Flex justifyContent='center'>
                <div>
                    <IconButton size='sm' aria-label='Done' icon={<EditIcon />} style={{background: 'none'}} onClick={onOpen}/>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent style={{backgroundColor: '#212121'}}>
                            <ModalHeader>Edit Conversation Title</ModalHeader>
                            <ModalCloseButton />
                            <form onSubmit={changeTitle}>
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input value={title} onChange={changeValue} />
                                    </FormControl>
                                </ModalBody>
                    
                                <ModalFooter>
                                    <Button colorScheme='blue' type='submit' mr={3}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
                </div>

                <IconButton size='sm' aria-label='Done' icon={<DeleteIcon />} style={{background: 'none'}} />
            </Flex>
        )
    } 
    const [convId, setConvId] = useState<string>("")

    console.log()
    const conversation_Id = (id: string)=>{
        // console.log(id)
        props.setID(id)

    }
    const conversation_clicked_id = (id:string | undefined)=>{
        props.setID(id)
    }
    
    

    return (
        <div className='container'>
            <CreateConv id={props.user_id} setId={conversation_Id} />
            <div className='convSection' >
               {
                    conversations.length >= 1 && (
                        conversations.slice(0, conversations.length).map((entry, index)=>(
                            <div
                                className='convCard'
                                >
                                <Heading as='h5' size='sm' onClick={()=>{conversation_clicked_id(entry._id)}}>{entry.title}</Heading>

                                <EditableControl _id={entry._id} title={entry.title} />
                            </div>

                        ))
                    )
                } 
            </div>
            <UserMenu imgUrl={props?.user_info?.imgUrl } email={props?.user_info?.email} username={props?.user_info?.username} />
        </div>
    )
}

export default SideConvBar