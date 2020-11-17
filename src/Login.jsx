import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import firebase from 'firebase'
import {auth} from './firebase'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useDispatch } from 'react-redux';
import { logOut, setUser } from './features/userSlice';
import axios from './axios'
function Login() {
    const dispatch = useDispatch()
    const [phone , setPhone] = useState('')
    const [name , setName] = useState('')
    const [uid , setUid] =useState(null)
    const [newUser , setNewUser] = useState(false)
    const [logged , setLogged] = useState(false)
    const [userData , setUserData] = useState(null)

    useEffect(()=> {
         auth.onAuthStateChanged(authUser => {
         if(authUser) {
            setLogged(true)
            setUid(authUser.uid)
            const apiCall = async() => {
                await axios.post('/api/post/user' , {
                    uid : authUser.uid
                }).then(res => res.data.new ? setNewUser(true) : setUserData(res.data))
            }
        apiCall()
        if(!newUser && logged) {
            dispatch(setUser(userData))
        }

          }else {
            dispatch(logOut())
          }
        
      })},[dispatch , logged , newUser , userData])

    const captcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
        {
           size:"invisible",
           callback : signIn
        });
        window.recaptchaVerifier.render().then(widgetId => {
            window.recaptchaWidgetId = widgetId;
        });
        
    }

    const createNewUser = (e) => {
        e.preventDefault()
        axios.post('/api/post/user', {
            uid : uid ,
            display_name : name
        }).then(res => dispatch(setUser(res.data)))
    }   
    
    const signIn = (e) => {
        e.preventDefault()
         captcha()
         var phoneNumber = '+' + phone;
         var appVerifier = window.recaptchaVerifier;
         firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
             .then( async(confirmationResult) => {
               // SMS sent. Prompt user to type the code from the message, then sign the
               // user in with confirmationResult.confirm(code).
                    const code = prompt('Enter Code')
                    window.confirmationResult = confirmationResult;
                    confirmationResult.confirm(code).catch(function (error) {
                        console.log(error)
                        })
             }).catch(function (error) {
               console.log(error)
             });
        
    }
    
    return (
        <div className="login">
            <div className="login__header">
                <div>
                    <img src="https://img.icons8.com/color/480/000000/telegram-app.png" alt=""/>
                    <h5>Telegram</h5>
                </div>
                
            </div>
            <div className="login__signWrap">
                <div className="login__sign">
                    <h4>Sign in</h4>
                    <p>Please enter your full phone number(including country code).</p>
                    <div style={{display : 'flex' , alignItems : 'flex-end'}}>
                        <form className="sign__form" style={{width : '100%' , marginTop : '30px' , display : 'flex' , flexDirection : 'column'}}>
                            {
                                newUser ?
                                <TextField label="Enter Your Name" value={name} onChange={e => setName(e.target.value)}/>
                                :
                                <PhoneInput 
                                enableSearch={true}
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={setPhone}/>
                            }
                            <div id="recaptcha-container"></div>

                            {
                                newUser ? 
                                <Button className="login__button" onClick={createNewUser}>Enter Telegram</Button>
                                :
                                <Button type="submit" id='signIn-button' className="login__button" onClick={signIn}>Next</Button>

                            }
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
