import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicNoneIcon from '@material-ui/icons/MicNone';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import  Message  from './Message';
import axios from './axios'
import {  useSelector } from 'react-redux';
import { selectTheme } from './features/themeSlice';
import { selectGroup } from './features/groupSlice';
import { selectUser } from './features/userSlice';
import { useRef } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Picker from 'emoji-picker-react';
import { disconnectSocket, initiateSocket , sendMessageIO } from './socket';
import { Link } from 'react-router-dom';

function Chat({mobile}) {
    const theme = useSelector(selectTheme)
    const currentGroup = useSelector(selectGroup)
    const user = useSelector(selectUser)
    const [messages , setMessages] = useState(null)
    const [message, setMessage] = useState('')
    const [picker , setPicker] = useState(false)
   
    const chatRef = useRef()

    //emoji picker handler
    const onEmojiClick = (event, emojiObject) => {
      if(emojiObject.emoji) {
          setMessage(message => message + emojiObject.emoji)

      }
    };

    //when group changes connect to socket and push/pull messages using socket 
    useEffect(() => {
        if (currentGroup) axios.get('/api/get/message/' + currentGroup.id).then(res => setMessages(res.data))
        if (currentGroup) {
            initiateSocket(currentGroup , (err, data) => {
                if(err) return;
                setMessages(messages => [...messages , data])
              });
            
        }
        
        return () => {
          disconnectSocket();
        }
      }, [currentGroup]);
      const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
    
      useEffect(() => {
          scrollToBottom()
      }, [messages]);
    
   
    const sendMessage = (e) => {
        e.preventDefault()
        let time = new Date()
        const hours = time.getHours()
        const minutes = time.getMinutes()
        time = (hours < 10 ? `0${hours}:` : `${hours}:`) + (minutes < 10 ? `0${minutes}` : `${minutes}`)
        if(message) {
            sendMessageIO( {
                message : message ,
                name : user.display_name ,
                user_id : user._id ,
                timestamp : time,
                group_id : currentGroup.id
            })
            setMessage('')

        }
        return false
    }

   


    return (
        <div className="chat" style={{backgroundColor : theme.background}}>
            {
                currentGroup &&
                <div className="chat__header" style={{borderColor : theme.borderColor}}>
                    <div className="chat__headerLeft">
                        {
                            mobile && 
                            <Link style={{marginRight : '10px'}} to='/'>
                                <ArrowBackIcon />

                            </Link>
                        }
                        <Avatar className="chat__headerLeftAvatar" src={currentGroup.image}/>
                        <div>
                            <h5 style={{color : theme.text}}>{currentGroup.name}</h5>
                        </div>
                    </div>
                    <div className="chat__headerRight">
                        <PhoneIcon />
                        <SearchIcon />
                        <MoreHorizIcon />
                    </div>
                </div>

            }

                <div className="chat__messages" ref={chatRef}>
                    {
                        !currentGroup ? 
                        <p className="chat__p" style={{color : theme.textDarker}}>Select a chat to start messaging</p>
                        :
                        messages?.map((message , index) => (
                            <Message text={message.message} timestamp={message.timestamp} name={message.name} self={message.user_id === user._id} key={index}/>
                        ))
                    }
                </div>
            {
                currentGroup && 
                <div className="chat__sendMessage" style={{borderColor : theme.borderColor}}>
                    <AttachFileIcon style={{transform : 'rotate(45deg)'}}/>
                    <form>
                        <input type="text" name="" id="" placeholder="Write a message..." style={{color : theme.text}} value={message} onChange={(e)=> setMessage(e.target.value)}/>
                        <button type="submit" onClick={sendMessage} style={{display : 'none'}}>Send</button>
                    </form>
                    <div onClick={() => {setPicker(picker => !picker)}} style={{cursor : 'pointer'}}>
                        <InsertEmoticonIcon />
                    </div>
                    <div className="emojiPicker">
                        {
                            picker && <Picker onEmojiClick={onEmojiClick}/>
                        }
                        

                    </div>
                    <MicNoneIcon />
                </div>
            }
        </div>
    )
}

export default Chat
