import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'


function Login() {
  const [user, setuser]= useState(null)
  const [username, setusername] = useState(null)


  function Signin(e){
    e.preventDefault()
    console.log(e)
    signInWithEmailAndPassword(auth, e.target[0].value,e.target[1].value )
    .then(()=>{
      window.location.href=`${window.location.origin}/home`
    })
    .catch((error)=>{
      alert(error.message)
    })
  }
  function Signup(e){
    e.preventDefault()
    console.log(e.target.form[0].value)
    createUserWithEmailAndPassword(auth, e.target.form[0].value,e.target.form[1].value )
    .then(()=>{
      updateProfile(auth.currentUser,{
        displayName: e.target.form[4].value
      }).then(()=>{
        setuser(user)
          window.location.href = `${window.location.origin}/home`
      })
    })
  }

console.log(username)


  return (
    <div className='h-screen flex justify-center items-center' >
      <div className=' h-[100%] w-[100%] absolute bg-[#5865f2]/90 -z-10'></div>
      <div className='bg-[#313338] max-w-[50%] w-[100%] max-h-[50%] h-[50%] rounded'>
            <div className='text-center '>
                <h1 className='text-[white] text-[24px] font-semibold mt-10'>
            Welcome Back!
                </h1>
                <p className='text-[gray] pt-1'>We're so excited to see you again!</p>
                <div className='flex justify-center text-start' >
                    <form onSubmit={(e)=>{Signin(e)}} className='flex flex-col max-w-[350px] w-[100%] mt-5 text-[gray] font-semibold'>
                        Email:
                        <input className=' py-1 mt-2 rounded-sm mb-5 bg-[#1E1F22] text-[white] outline-0 font-light' type="E-mail" />
                        Password:
                        <input className='py-1 mb-4 mt-2 rounded-sm bg-[#1E1F22] outline-0' type="Password" />
                    <button type='submit' className='bg-[#5865f2] rounded-sm py-2 text-[white] '>Log In</button>
                    <div className='mt-1'>
                    Need an account? 
                    <button type='button' onClick={()=>{setusername(undefined)}} className='ml-2 text-blue-500 hover:underline'>Register</button>
                    {username === undefined ? <div className='absolute bg-[#141414] w-[100%] max-w-[50%] right-[50%] left-[25%] h-[50%] top-[25%]'>
                       <div className='flex justify-center items-center max-h-[100%] h-[80%] '> 
                     <label className='mr-3'>Choose a cool Username:</label> 
                     <input type="text" />
                      <button onClick={(e)=>{Signup(e)}} className='border ml-2 p-3 py-1 bg-[red]'>Sumbit</button> 
                       </div>
                        </div>:null}
        
                    </div>
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Login