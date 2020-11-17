import { Avatar } from '@material-ui/core'
import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setGroup } from './features/groupSlice'
import { selectTheme } from './features/themeSlice'

function SidebarRow({chatImage , chatName , timestamp , lastMessage , unreadMessages , id , name , active}) {
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

    const changeGroup = () => {
        dispatch(setGroup({
            id : id,
            name : name ,
            image : chatImage
        }))

    }
    return (
        <Link to={'/chat'}>
            <div className="sidebarRow" onClick={changeGroup} style={active ? { backgroundColor : 'rgb(110, 140, 170)' , borderBottom : 'none'} : {backgroundColor : theme.backgroundColor , borderBottom : '1px solid' , borderColor : theme.borderColor}}>
                <Avatar src={chatImage} className="sidebarRow__avatar"/>
                <div className="sidebarRow__info" style={{borderColor : theme.borderColor}}>
                    <div className="sidebarRow__up">
                        <h5 style={!active ? {color : theme.text} : {color : 'white'}}>{chatName}</h5>
                        
                    </div>
                    
                </div>
            </div>
        </Link>
    )
}

export default SidebarRow
