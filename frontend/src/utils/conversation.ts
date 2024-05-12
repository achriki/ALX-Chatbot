import axios from "axios"

const server_url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT || 80}`
export const getConversation = async (id: string | undefined)=>{
    const request = await axios.post(`${server_url}/conversation`,{
        userId: id 
    })
    if(request.status === 200){
        return request.data.conversation_list
    }else{
        return null
    }
}

export const createConversation = async (title: string, userId: string | undefined)=>{
    const request = await axios.post(`${server_url}/createConversation`,{
        title: title,
        used_id: userId
    })

    if(request.status === 200){
        return request.data.conversation_id
    }else{
        return null
    }
}

export const changeConvTitle = async (newTitle: string, convId: string | undefined)=>{
    const request = await axios.post(`${server_url}/changeTitle`,{
        title: newTitle,
        _id: convId
    })

    if(request.status === 200){
        return request.data.conversation_id
    }else{
        return null
    }
}

export const QAList = async (conv_id: string | undefined)=>{
    const request = await axios.post(`${server_url}/QAList`,{
        _id: conv_id
    })

    if(request.status === 200){
        return request.data.QAList
    }else{
        return null
    }
}