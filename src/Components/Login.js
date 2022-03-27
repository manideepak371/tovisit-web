import React, { useEffect, useRef, useState } from "react"
import { Alert } from 'react-bootstrap'
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Admin from "./Admin";

 async function AuthUser(email,password){
     console.log(email,password)
    var userCred={
        email:email,
        password:password
    }
    const response=await axios.post('http://localhost:9000/admin/login',userCred)
    const responseText=await response.data
    return responseText
}

function getCookie(key){
    if(document.cookie != 'undefined' && document.cookie.length > 0){
        let str=document.cookie
        let a=str.split('=')
        for(var i=0;i<a.length;i++){
            if(a[i] == key){
                return a[i+1]
                break
            }
        }
    }
    else{
        return ""
    }
}

const Login=()=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cnfpassword,setCNFPassword]=useState('')
    const [error,setError]=useState(false)
    const [errormessage,setErrorMessage]=useState('')
    const [success,setSuccess]=useState(false)
    const [successmessage,setSuccessMessage]=useState('')
    const [register,setRegister]=useState(false)

    const LoginContainer = register ? "login-container-hide" : "login-container-show"
    const SignupContainer = register ? "signup-container-show" : "signup-container-hide" 
    
    const loginemailref=useRef()
    const loginpwdref=useRef()
    const signupemailref=useRef()
    const signuppwdref=useRef()
    const cnfref=useRef()
    

    const navigate=useNavigate()
    async function ValidateLoginInputs(){
        if (email.length <= 0) {
            setError(true)
            setErrorMessage("Email should be entered")
            return
        }
        if (password.length <= 0) {
            setError(true)
            setErrorMessage("Password should be entered")
            return
        }
        if(email.length > 0 && password.length > 0){
            setError(false)
            setErrorMessage("")
            const response=await AuthUser(email,password).then(response => {return response})
            if(response.success){
                sessionStorage.setItem("loggedIn",response.success)
                // sessionStorage.setItem("accessToken",getCookie("authToken"))
                sessionStorage.setItem("loginMsg",response.message)
                // (document.cookie != 'undefined' && document.cookie.length >sessionStorage.setItem("accessToken",document.cookie)
                navigate('/admin',{replace:true})
            }
            else{
                setError(true)
                setErrorMessage(response)
            }
        }
    }

    async function ValidateSignupInputs(){
        if (email.length <= 0) {
            setError(true)
            setErrorMessage("Email should be entered")
            return
        }
        if (password.length <= 0) {
            setError(true)
            setErrorMessage("Password should be entered")
            return
        }
        if (cnfpassword.length <= 0) {
            setError(true)
            setErrorMessage("Re Confirm Password")
            return
        }
        if(password != cnfpassword){
            setError(true)
            setErrorMessage("Passwords not matched")
            return
        }
        else{
            setError(false)
            console.log(success)
            setSuccess(true)
            setSuccessMessage("Admin added")
            setEmail('')
            setCNFPassword('')
            setPassword('')
            signupemailref.current.value=""
            signuppwdref.current.value=""
            loginemailref.current.value=""
            loginpwdref.current.value=""
            cnfref.current.value=""
            const response=await AuthUser(email,password).then(response => {return response})
            if(response == "user added"){
                navigate("/login",{replace:true})
            }
            else{
                setError(true)
                setErrorMessage(response)
            }
            // navigate("/admin", { replace: true });
        }
    }

    const SwitchtoLogin=()=>{
        setRegister(false);
        setError(false)
        setErrorMessage("")
        setSuccess(false)
        setSuccessMessage("")
        setEmail('')
        setPassword('')
        setCNFPassword('')
        signupemailref.current.value=""
        signuppwdref.current.value=""
        loginemailref.current.value=""
        loginpwdref.current.value=""
        cnfref.current.value=""
    }

    const SwitchtoRegister=()=>{
        setRegister(true);
        setError(false)
        setErrorMessage("")
        setSuccess(false)
        setSuccessMessage("")
        setEmail('')
        setPassword('')
        setCNFPassword('')
        signupemailref.current.value=""
        signuppwdref.current.value=""
        loginemailref.current.value=""
        loginpwdref.current.value=""
        cnfref.current.value=""
    }

    if(sessionStorage.length > 0 && sessionStorage.getItem("loggedIn") != null && sessionStorage.getItem("loggedIn")){
        return (
            <Navigate to="/admin" replace={true} />
        )
    }

    return (
        <>
            <div className={LoginContainer}>
                <section>
                    <p><input type="text" ref={loginemailref} className="login-register-text" placeholder="Enter Email Id" onChange={(event)=>{setEmail(event.target.value)}}/></p>
                    <p><input type="password" ref={loginpwdref} placeholder="Enter Password" onChange={(event)=>{setPassword(event.target.value)}}/></p>
                    <p>
                        <button className="sign-btn" id="signin-btn" onClick={()=>{ValidateLoginInputs()}}>Login</button>
                        <button className="sign-btn" id="signup-btn" onClick={()=>{SwitchtoRegister()}}>Register</button>
                    </p>
                    {error && <Alert variant="danger" onClose={()=>{setError(false)}} dismissable>{errormessage}</Alert>} 
                </section>
            </div>
            <div className={SignupContainer}>
                <section>
                    <p><input type="text" ref={signupemailref} placeholder="Enter Email Id" className="login-register-text" onChange={(event)=>{setEmail(event.target.value)}}/></p>
                    <p><input type="password" ref={signuppwdref} placeholder="Enter Password" onChange={(event)=>{setPassword(event.target.value)}}/></p>
                    <p><input type="password" ref={cnfref} placeholder="Confirm password" onChange={(event)=>{setCNFPassword(event.target.value)}}/></p>
                    <p>
                        <button className="sign-btn" id="signin-btn" onClick={()=>{SwitchtoLogin()}}>Login</button>
                        <button className="sign-btn" id="signup-btn" onClick={()=>{ValidateSignupInputs()}}>Sign Up</button>
                    </p>
                    {error && <Alert variant="danger" onClose={()=>{setError(false)}} dismissable>{errormessage}</Alert>} 
                    {success && <Alert variant="success" onClose={()=>{setSuccess(false)}} dismissable>{successmessage}</Alert>} 
                </section>
            </div>
        </>
    )
}
export default Login