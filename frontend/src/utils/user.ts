import axios from "axios"

//Backend server url
const server_url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT || 80}`

//Send an axios post request to get user details like username or email 
export const getInfos = async(id:string | undefined)=>{
    const request = await axios.post(`${server_url}/userInfo`,{
        _id: id
    })

    if(request.status === 200){
        return request.data.userInfos
    }else{
        return null
    }
}