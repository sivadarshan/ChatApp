import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {  ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {
    const history = useHistory();

    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    // Logout Function
    const handleLogout = async() => {
        await auth.signOut();
        history.push('/');
    }
    
    // To get user image
    const  getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],'userPhoto.jpeg',{type:'image/jpeg'})
    }

    useEffect(() => {
        if(!user)
        {
            history.push('/');
            return;
        } 
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id":"08609ec4-5c46-4374-b3fd-55e3a74b36c1",
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })
        // Existing user
        .then(() => {
            setLoading(false);
        })
        // New user 
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('secret',user.uid);
            
            // User Icon
            getFile(user.photoURL)
                .then((Avatar) => {
                    formdata.append('Avatar',Avatar,Avatar.name)

                    axios.post('https://api.chatengine.io/users',formdata,{
                        headers:{"private-key": "0bfcb57d-46fb-44b4-aca1-d4d1a3175b95"}
                    })
                    .then(() => {
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
        })
    },[user,history]);

    if(!user || loading) return 'Loading'

  return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                ChatIt
            </div>
            <div className='logout-tab' onClick={handleLogout}>
                Logout
            </div>
        </div>
        <ChatEngine 
            height = 'calc(100vh - 66px)'
            projectID = "08609ec4-5c46-4374-b3fd-55e3a74b36c1"
            userName = {user.email}
            userSecret = {user.uid}
        />
    </div>
  )
}

export default Chats