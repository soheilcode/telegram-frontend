import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import { Avatar, IconButton, Modal } from '@material-ui/core';
import SidebarRow from './SidebarRow';
import ForumIcon from '@material-ui/icons/Forum';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeDark, makeLight, selectTheme } from './features/themeSlice';
import { auth } from './firebase';
import { selectUser } from './features/userSlice';
import axios from './axios'
import { selectGroup } from './features/groupSlice';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
function Sidebar() {
    const user = useSelector(selectUser)
    const theme = useSelector(selectTheme)
    const [groups , setGroups] = useState([])
    const [groupName , setGroupName] = useState('')
    const [open , setOpen] = useState(false)
    const [groupImage , setGroupImage] = useState('')
    const currentGroup = useSelector(selectGroup)
    const dispatch = useDispatch()
    const [dark , setDark] = useState(false)
    useEffect(()=> {
        if(user) {
            axios.get(`/api/get/group`).then(res => setGroups(res.data))
        }
    },[user])
    const createGroup = () => {
        if(groupName) {
            axios.post('/api/post/group' ,{
                name : groupName ,
                image : groupImage
            }).then(axios.get(`/api/get/group`).then(res => setGroups(res.data)))
            
            setOpen(false)
            setGroupName('')
        }
    }
    const changeTheme = () => {
        setDark(dark => !dark)
        !dark ? dispatch(makeDark()) : dispatch(makeLight())
    }
    return (
        <div className="sidebar" style={{backgroundColor : theme.lighterBackground , borderColor : theme.borderColor}}> 
            <div className="sidebar__header">
                <div className="sidebar__search" style={theme.dark ? {backgroundColor : 'rgb(50 ,50 ,50)'} : {backgroundColor : 'white'}}>
                        <SearchIcon />
                    <input type="search" name="" id="" placeholder="Search" />
                </div>
                <IconButton onClick={() => setOpen(true)}>
                    <CreateIcon htmlColor="rgb(89, 140, 194)"/>
                </IconButton>
            </div>
            <div className="sidebar__rows">
                <SidebarRow chatImage="https://avatars3.githubusercontent.com/u/72976010?s=460&u=0e81f5907cac12da2d8a1308b6a698c3fc2a5edb&v=4" chatName="Soheil" lastMessage="Yes thats right dude." timestamp="04:04 PM" unreadMessages={5}/>
                {
                    groups?.map(group => ( 
                        <SidebarRow chatImage={group.image || ''} chatName={group.name} lastMessage="" timestamp="" unreadMessages={5} id={group._id} key={group._id} name={group.name} active={group._id === currentGroup?.id ? true : false} />

                    ))
                }

            </div>
            <div className="sidebar__options" style={{borderColor : theme.borderColor}}>
                <IconButton onClick={() => auth.signOut()}>
                    <Avatar className="sidebar__optionsAvatar"/> 
               </IconButton>
                <IconButton onClick={changeTheme}>
                    {
                        !dark ? <Brightness4Icon htmlColor='gray'/> : <Brightness7Icon htmlColor='#BDBDBD'/>
                    }
                </IconButton>
                <IconButton>
                    <ForumIcon htmlColor='#BDBDBD'/>

                </IconButton>
               
                <IconButton >
                    
                    <SettingsIcon htmlColor='#BDBDBD'/>
                </IconButton>

          

            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            
            >
                <div className="modal">
                <div>
                <h2 className="serverModal__title">Add a new Group</h2>
                </div>
                <div style={{display : 'flex' , flexDirection : 'column'}}>
                <p style={{fontSize : '11px' , color : 'gray' , fontWeight : '700' , paddingBottom : '10px'}}>Group Name</p>

                <input type="text" style={{width : '100%' , height : '35px' , border : "1px solid #bfbfbf" , outline: 'none'}} value={groupName} onChange={(e) => {setGroupName(e.target.value)}}/>
                <p style={{fontSize : '11px' , color : 'gray' , fontWeight : '700' , padding : '5px 0px'}}>Group Image Link (Optional)</p>
                <input type="text" style={{width : '100%' , height : '35px' , border : "1px solid #bfbfbf" , outline: 'none'}} value={groupImage} onChange={(e) => {setGroupImage(e.target.value)}}/>
                <button  style={{backgroundColor : '#588DC1' , padding : '13px 0px' , width : '100%' , border : 'none' , borderRadius : '3px' , color : 'white' , fontWeight : '550' , alignSelf : 'flex-end' , margin : '20px 0px'}}
                onClick={createGroup}
                >Create</button>

        
                </div>
            
            </div>
            </Modal>
        </div>
    )
}

export default Sidebar
