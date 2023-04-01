import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'


function Home({user, setuser}) {
  const [selected, setselected] = useState(undefined)
  const [data, setdata]=useState(null)
  const [settings, setsettings]=useState(null)
  const docre = doc(db, 'Servers', 'General' )
  const username = user?.displayName
  async function messageHandler(e){
    e.preventDefault()
    const messages =  {
      message: e.target[0].value,
      user:username
    }
    const newPost =  {
      message: [
        ...data.message,
        
        
          messages.user +':'+ 
          messages.message
        
        
    ]
  }
    await updateDoc(docre, newPost)
    e.target[0].value =""
    
  }
  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "Servers", "General"), (doc) => {
      setdata(doc.data())
  });
    
  },[])
 
  console.log(data)
  if(data){

    console.log(


    )
  }
  function signout(){
    signOut(auth)
    .then(()=>{
      setuser(null)
      window.location.href = `${window.location.origin}`
    })
  }
  


  // e.target[0].value
  
  return (
    <div className='h-screen flex bg-[#313338]'>
      <div className='bg-[#1E1F22]'>
        <button className='mt-6 bg-[gray]/30 text-[white] font-semibold rounded-[50%]  mx-4 px-6 py-4'>S</button>
      </div>
      <div className='bg-[#2B2D31] flex flex-col justify-between text-center'>
        <div>
        <h1 className='mt-7 mx-1 uppercase text-[#DBDED6] text-sm font-medium'>Text Channels</h1>
        <button  className='text-[#D5F3F5] mx-[4px] rounded mt-6 items-center pl-4 pr-20 flex hover:bg-[#404249] font-medium'>
          <h1 className='pr-2 text-[gray] text-2xl font-medium'>#</h1> general
        </button>
        </div>
    <div className='pr-2  text-[#f2f3f5] flex justify-between items-center text-[14px] font-medium bg-[#232428]'>
      <div className='flex items-center my-1 ml-1 rounded-sm hover:bg-[#b5bac1]/50 transition-all'>
      <div className='bg-[#313338] mx-2 my-2 ml-2 flex justify-center items-center h-8 w-8 rounded-[50%] text-[white]'>{user?.displayName[0]}</div>
      {user?.displayName}
    </div>
    <div onClick={()=>{setsettings(!settings)}} className=' cursor-pointer p-2 rounded-sm hover:bg-[#b5bac1]/50 transition-all'>
      <img className='w-4 ' src="https://cdn-icons-png.flaticon.com/512/3524/3524640.png" alt="" />
      <div className='relative'>
    </div>
    </div>
      <div className={`bg-[#232428] px-2 mr-10 absolute overflow-hidden translate-y-[100%] -z-10 bottom-14 opacity-0 left-[10%] ${settings && 'opacity-100 z-10 translate-y-[0%]'} transition-all`}>
      <div className='flex flex-col'>
    <button className='pb-1 border-b '>Account</button>
      <button onClick={signout}>Sign Out</button>
      </div>
      </div>
    
      </div>
      </div>
      <div className='w-[100%] flex flex-col justify-end pb-4'>
      <h2>     
      {data?.message?.map((message=>{
        const mess = message.split(":")
        return( 
          <div className='ml-0 flex mb-4'>
            <div className='flex items-center hover:bg-[#2E3035] w-[100%]'>
            <div className='bg-[#444141] ml-6 flex justify-center items-center h-11 w-11 rounded-[50%] text-[white]'>{mess[0].charAt(0).toUpperCase()}</div>
            <div className='ml-4 flex justify-center flex-col'>

            <h2 className='text-[#F2F3F5] font-medium mb-1 hover:underline'>
            {mess[0]}
            </h2>
            <h2 className='text-[#DBDEE1]'>
            {mess[1]}
            </h2>
            </div>
            </div>
          </div>
        )
       
      }))

      }
      </h2>
        <form onSubmit={messageHandler} className='max-w-[100%] w-[98%]' >
        <input type="text" placeholder='Message #general' className='pl-2 outline-none text-[white] bg-[#383A40] py-2 ml-6 mt-2 rounded max-w-[100%] w-[98%]' />
        </form>
      </div>
    </div>
  )
}

export default Home