import React from 'react'
import { IconButton, Heading } from '@chakra-ui/react'
import { CheckIcon, } from '@chakra-ui/icons'
type aType = {
    answer: string
}
function Answer(props:aType) {
  return (
    <div className='qaSection'>
        <div className='qaHeader'>
            <div className="card">
            <IconButton
                isRound={true}
                variant='solid'
                colorScheme='teal'
                aria-label='Done'
                fontSize='20px'
                icon={<CheckIcon />}
            />
            <Heading as="h4" >ALX Chatbot</Heading>
            </div>
        </div>
        <div className="qaCore">
            {props.answer}
        </div>
    </div>
  )
}

export default Answer