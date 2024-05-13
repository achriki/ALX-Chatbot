import React from 'react'
import { IconButton, Heading } from '@chakra-ui/react'
import { InfoIcon, } from '@chakra-ui/icons'
type qType = {
    question: string
}
function Question(props: qType) {
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
                icon={<InfoIcon />}
            />
            <Heading as="h4" >You</Heading>
            </div>
        </div>
        <div className="qaCore">
            {props.question}
        </div>
    </div>
  )
}

export default Question