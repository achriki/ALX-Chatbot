import React,{useEffect, useState} from 'react'
import Question from '../views/Question';
import Answer from '../views/Answer';
import { Heading, Image, Divider,Input,InputGroup, InputRightElement, Button, Textarea  } from '@chakra-ui/react';
import logoImage from '../img/chatbot-logo.png'
import { ArrowForwardIcon } from '@chakra-ui/icons';

type QA = {
    conv_id: string;
    question: string;
    answer: string;
    _id: string;
}
type convType = {
    QAList : QA[]   
}
function Conversation(props: convType) {
  return (
    <div className='conversationSection'>
        <div className="sectionHeader">
            <Image
                borderRadius='full'
                boxSize='50px'
                src={logoImage}
                alt='ALX-Chatbot'
                marginRight='4%'
            />
            <Heading as="h3" fontSize='26px' >GPT-4 </Heading>
        </div>
        <div className="container">
            {
                props.QAList.slice(0, props.QAList.length).map((entry, index)=>(
                    <div className="card">
                        <Question question={entry.question} />
                        <Answer answer={entry.answer} />
                    </div>
                )) 
            }
        </div>
        <div className="sendQuestion">
            <div className="container">
            <InputGroup >
                <Textarea placeholder='Enter your question'  />
                <InputRightElement width='10%'>
                    <Button  padding='0 3%' position='relative' right="20%" top="40%" rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='solid' >
                        send
                    </Button>
                </InputRightElement>
            </InputGroup>
            </div>
        </div>
    </div>
  )
}

export default Conversation