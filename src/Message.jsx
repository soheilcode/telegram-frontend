import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from './features/themeSlice'

function Message({text , timestamp , name , self}) {
    const theme = useSelector(selectTheme)
    return (
        <div className={self ? 'messageSelf' : 'message'} style={!self ? {backgroundColor : theme.message , color : theme.text} : {opacity : '100%'}}>
            {
                !self && <h5 className="message__name">{name}</h5>
            }
            <div className="message__info">
                <p className="message__text">{text}</p>
                <p className="message__timestamp"><i>{timestamp}</i></p>

            </div>
        </div>
    )
}
export default Message
