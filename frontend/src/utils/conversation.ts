import axios from "axios"

const server_url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT || 80}`

//Send an axios post request to get conversations
export const getConversation = async (id: string | undefined)=>{
    const request = await axios.post(`${server_url}/conversation`,{
        // post request params
        userId: id 
    })
    if(request.status === 200){
        return request.data.conversation_list
    }else{
        return null
    }
}

//Send an axios post request to create a new conversation
export const createConversation = async (title: string, userId: string | undefined)=>{
    const request = await axios.post(`${server_url}/createConversation`,{
        // post request params
        title: title,
        used_id: userId
    })

    if(request.status === 200){
        return request.data.conversation_id
    }else{
        return null
    }
}

//Send an axios post request to change a conversation title
export const changeConvTitle = async (newTitle: string, convId: string | undefined)=>{
    const request = await axios.post(`${server_url}/changeTitle`,{
        // post request params
        title: newTitle,
        _id: convId
    })

    if(request.status === 200){
        return request.data.conversation_id
    }else{
        return null
    }
}

//Send an axios post request to get QAs of a conversation
export const QAList = async (conv_id: string | undefined)=>{
    const request = await axios.post(`${server_url}/QAList`,{
        // post request params
        _id: conv_id
    })

    if(request.status === 200){
        return request.data.QAList
    }else{
        return null
    }
}