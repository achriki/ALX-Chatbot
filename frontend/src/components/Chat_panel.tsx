import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { SideConvBar, Conversation } from '../layouts';
import {QAList, getConversation} from '../utils/conversation'
import { useToast } from '@chakra-ui/react';
type Props = {}
type conversation = {
  user_id: string;
  title: string;
  _id: string;
}

type QA = {
  conv_id: string;
  question: string;
  answer: string;
  _id: string;
}

function Chat_panel({}: Props) {
  const {id} = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [convList, setConvList] = useState<conversation[]>([])
  const [convQA, setConvQA] = useState<QA[]>([])
  const [convId, setConvId] = useState<string>("")
  console.log(id)
  const Logout = ()=>{
    googleLogout()
    navigate('/')
  }
  const getList = async ()=>{
    const List =  await getConversation(id)
    console.log("List: ", List)
    if(List.length >= 1){
      setConvList(List)
    }else{
      toast({
        title: `No conversation found please create one`,
        status: 'error',
        isClosable: true,
        position: 'top'
      })
    }
  }
  const conversation_Id = async (id: string)=>{
    setConvId(id)
    const getList = await QAList(id)
    if(getList){
      console.log(getList)
    }else{
      console.log('no QA Found')
    }
  }
  useEffect(()=>{
    getList()
  },[id])
  return (
    <div className='panelContainer'>
      <div className="container flex h-screen">
        <div className="w-1/4 bg-white p-4 flex flex-col scroll sideBar">
          <SideConvBar conversation_list={convList} user_id={id}  setID={conversation_Id}/>
        </div>
      </div>
    </div>
  )
}

export default Chat_panel