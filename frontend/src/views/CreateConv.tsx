import React, {useState, useRef} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, FormControl, FormLabel, Input, useDisclosure, Heading, IconButton, useToast
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { createConversation } from '../utils/conversation'

type convType = {
    id: string | undefined;
    setId: Function
}
function CreateConv(props: convType) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [title, setTitle] = useState<string>("")
    const changeTitle = (e:any)=>{setTitle(e.target.value)}
    const toast =  useToast()

    const createConv = async (e:any)=>{
        e.preventDefault()
        const conv_id = await createConversation(title, props.id)
        if(conv_id){
            props.setId(conv_id)
            onClose()
        } else{
            toast({
                title: `Something went wrong`,
                status: 'error',
                isClosable: true,
                position: 'top'
            })
        }
        setTitle('')
    }

    return (
      <>
        <div className="createSection" onClick={onOpen}>
            <Heading as='h3' size='md'>ALX-Chatbot</Heading>
            <IconButton icon={<PlusSquareIcon />} className='btnCreate' aria-label='Done' />
        </div>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent style={{backgroundColor: '#212121'}}>
            <ModalHeader>Create New Conversation</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={createConv}>
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input ref={initialRef} value={title} required onChange={changeTitle} placeholder='Conversation Title' />
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
      </>
    )
}

export default CreateConv