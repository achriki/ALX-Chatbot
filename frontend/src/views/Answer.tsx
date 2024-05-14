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
                marginRight='2%'
                icon={<CheckIcon />}
            />
            <Heading as="h5" fontSize="20px"  >ALX Chatbot</Heading>
            </div>
        </div>
        <div className="qaCore">
            {props.answer}
        </div>
    </div>
  )
}

export default Answer