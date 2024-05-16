import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { SideConvBar, Conversation } from '../layouts';
import {QAList, getConversation} from '../utils/conversation'
import { getInfos } from '../utils/user';
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
type userInfos = {
  imgUrl: string | undefined;
  username: string;
  email: string;
}

function Chat_panel({}: Props) {
  const {id} = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [convList, setConvList] = useState<conversation[]>([])
  const [convQA, setConvQA] = useState<QA[]>([])
  const [convId, setConvId] = useState<string>("")
  const [userInfo, setUserInfo] = useState<userInfos>()
  console.log(id)
  const Logout = ()=>{
    googleLogout()
    navigate('/')
  }
  // call getConversation for load the conversations of a user
  const getList = async ()=>{
    const List =  await getConversation(id)

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

  // call getUserInfos for load the userInfos of a user
  const getUserInfos = async ()=>{
    const infos = await getInfos(id)
    console.log("user infos: ", infos)
    if(infos){
      const user = {username: infos.username,email: infos.email, imgUrl: infos.image}
      setUserInfo(user)
    }
  }

  // this function return the conversation after a user select one
  // Check SideConBar component to understand the full schema
  const conversation_Id = async (id: string)=>{
    setConvId(id)
    const getList = await QAList(id)
    if(getList){
      setConvQA(getList)
    }
  }

  //after loading the page or new login
  useEffect(()=>{
    getList()
    getUserInfos()
  },[id])
  
  return (
    <div className='panelContainer'>
      <div className="container flex h-screen">
        <div className="w-1/4 bg-white p-4 flex flex-col scroll sideBar">
          <SideConvBar conversation_list={convList} user_id={id} user_info={userInfo}  setID={conversation_Id}/>
        </div>
        <div className='w-3/4 flex flex-col'>
          <Conversation QAList={convQA}/>  
        </div>
      </div>
    </div>
  )
}

export default Chat_panel