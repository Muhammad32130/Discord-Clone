import { Firestore, addDoc, collection, collectionGroup, doc, getDocs, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'


function Home({user, setuser}) {
  const [selected, setselected] = useState(undefined)
  const [data, setdata]=useState(null)
  const [selectedserver, setselectedserver] = useState('General')
  const [selectedchannel, setselectedchannel] = useState('General')
  const [channel, setchannel] = useState(null)
  const [settings, setsettings]=useState(null)
  const [server, setserver] =useState(null)

  const docre = doc(db, 'Servers', selectedserver )
  console.log(selectedserver)
  const username = user?.displayName
  async function messageHandler(e){
    e.preventDefault()
    const messages =  {
      message: e.target[0].value,
      user:username
    }
    const newPost =  {
      [selectedchannel]: [
        ...data[selectedchannel],
          messages.user +':'+ 
          messages.message
    ]
  }
    await updateDoc(docre, newPost)
    e.target[0].value =""
  }
  






  async function Doc(){
    const data = await getDocs(collection(db, "Servers"));
    const posts = data.docs.map((doc)=>({ id: doc.id}))
      setchannel(posts?.map(post=>post.id))
  }
  useEffect(()=>{
    Doc()
  },[server,selectedserver,selectedchannel])
  async function Newdoc(e){
    e.preventDefault()
    await setDoc(doc(db, "Servers", e.target[0].value), {
      id:e.target[0].value,
      general:[

      ]
    }).then(()=>{
      setselected(false)
      setserver(false)
    }).catch((error)=>{
      
    })
  }
  
  async function Newchannel(e){
    e.preventDefault()
    await setDoc(doc(db, "Servers", selectedserver), {
      ...data,
      [e.target[0].value]:[

      ]
    }).then(()=>{
      setselected(false)
      setserver(false)
    }).catch((error)=>{
      
    })
  }
console.log(data && data[selectedchannel])
  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "Servers", selectedserver), (doc) => {
      setdata(doc.data())
  });
  },[server,selectedserver,selectedchannel])
console.log(data)
 
  function signout(){
    signOut(auth)
    .then(()=>{
      setuser(null)
      window.location.href = `${window.location.origin}`
    })
  }

console.log(selectedchannel)

  // e.target[0].value
  
  return (
    <div className='h-screen flex bg-[#313338]'>
      <div onClick={()=>{setselected(false)}} className={`absolute -z-10  h-screen bg-[#0000]/70 w-[100%] left-[0%] bottom-[0%] ${selected && 'z-10'}`}>
      </div>
       <div className={`absolute max-[768px]:w-[60%] rounded ml-auto ${!selected && 'grow'}  max-[425px]:w-[80%] max-w-[100%] w-[30%] max-[375px]:w-[80%] max-[320px]:w-[80%] max-h-[100%] bg-[#313338] m-auto left-0 right-0 bottom-[50%] text-[white] ${selected && 'small z-50'} `}>
        <div className='mx-4 my-4 flex flex-col'>
        <h1 className='font-semibold '>
    Create Channel
        </h1>
        <p className='text-[12px] text-[white]/80 mt-1'>in Text Channels</p>
        <form onSubmit={(e)=>{Newchannel(e)}} className='flex-col mt-4 flex font-semibold'>
          <h1 className='text-[12px] text-[white]/90 font-bold mb-2'>
          Channel Name
          </h1>
          <input className='bg-[#1E1F22] outline-none py-1 rounded' type="text" placeholder='# new-channel' />
          <div className='flex max-[425px]:justify-between max-[320px]:text-[12px] justify-end  max-[375px]:justify-between max-[320px]:justify-between mt-4'>
            
          <button onClick={()=>{setselected(false)}} type='button' className='hover:underline transition-all'>Cancel</button>
          <button className='bg-[#4752C4] ml-4 w-[30%] max-[425px]:w-[40%] max-[375px]:w-[35%] py-2 rounded'>Create Channel</button>
          </div>
        </form>
        </div>
      </div>
      <div onClick={()=>{setserver(false)}} className={`absolute -z-10  h-screen bg-[#0000]/70 w-[100%] left-[0%] bottom-[0%] ${server && 'z-10'}`}>
      </div>
       <div className={`absolute rounded max-[768px]:w-[60%] ml-auto ${!server && 'grow'} max-[425px]:w-[80%] max-w-[100%] max-[320px]:w-[80%] max-[375px]:w-[80%] w-[30%] max-h-[100%] bg-[#FFFFFF] m-auto left-0 right-0 bottom-[50%] text-[#060607] ${server && 'small z-50'} `}>
        <div className='mx-4 my-4 flex flex-col'>
        <h1 className='font-bold text-xl text-center '>
    Customize your server
        </h1>
        <p className='text-[12px] text-center text-[gray]/80 mt-1'>Give your new server a personality with a name.</p>
        <form onSubmit={(e)=>{Newdoc(e)}} className='flex-col mt-4 flex font-semibold'>
          <h1 className='text-[12px] text-[gray]/90 font-bold mb-2'>
          Server Name
          </h1>
          <input className='bg-[#E3E5E8] outline-none py-1 rounded' type="text" />
          <div className='flex justify-between mt-4'>
          <button onClick={()=>{setserver(false)}} type='button' className='hover:underline transition-all'>Cancel</button>
          <button className={`bg-[#4752C4] max-[1024px]:w-[30%] ml-4 w-[20%] max-[375px]:w-[35%] max-[375px]:py-1 py-2  max-[320px]:py-1 max-[320px]:w-[35%]  text-[white] rounded`}>Create</button>
          </div>
        </form>
        </div>
      </div>
      <div className='bg-[#1E1F22] flex flex-col justify-between'>
        <div className='mx-4 max-[425px]:mx-[4px] max-[375px]:mx-[1px] max-[320px]:mx-0 flex flex-col items-center'>
        {
                channel?.map((names) =>{
                  return (
                    <button onClick={()=>{setselectedserver(names)}} className='mt-6 max-[425px]:w-8 max-[425px]:h-8 max-[425px]:text-[10px] max-[425px]:p-0 max-[375px]:w-6 max-[375px]:h-6 max-[375px]:p-0 max-[375px]:text-[8px] max-[320px]:px-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:p-0 max-[320px]:text-[6px] bg-[gray]/30 text-[white] hover:bg-[#23A559] hover:rounded-2xl transition-all font-semibold rounded-[50%] px-6 py-4'>{names[0].toUpperCase()}</button>

                    )
                })
              }
        </div>
        <button onClick={()=>{setserver(true)}} className='mt-6 justify-center max-[425px]:p-0 bg-[gray]/30 hover:bg-[#23A559] max-[425px]:mx-1 max-[425px]:h-8 max-[375px]:mx-1 max-[375px]:h-6 max-[375px]:p-0 max-[375px]:w-6 hover:rounded-2xl max-[320px]:p-0 max-[320px]:w-4 max-[320px]:h-4 items-center flex transition-all text-[white] mb-4 font-semibold max-[320px]:px-1 max-[320px]:py-2 max-[320px]:mx-2  rounded-[50%] mx-4 px-4 py-3'>
        <img className="invert max-[375px]:w-4 w-12 max-[425px]:w-4 rounded" src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-math-icon-download-icons-9.png" alt=""></img>
        </button>
      </div>
      <div className='bg-[#2B2D31] flex flex-col justify-between text-center'>
        <div>
          <div className='flex justify-center max-[320px]:justify-start items-end max-[320px]:mb-2 mb-6'>
        <h1 className='mt-7 mx-1 uppercase text-[gray]  max-[375px]:text-[10px] max-[320px]:text-[8px] max-[425px]:text-[10px] text-xs font-semibold transition-all  hover:text-[#DBDEE1]'>Text Channels</h1>
        <button onClick={()=>{setselected(true)}} className='ml-6 max-[425px]:ml-2 max-[375px]:ml-1 max-[375px]:w-4 max-[320px]:ml-1 max-[320px]:w-3 w-6 h-5'><img className='invert hover:bg-[#b5bac1] transition-all rounded' src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-math-icon-download-icons-9.png" alt="" /></button>
          </div>
        
{data && Object.keys(data).filter((value)=> !value.includes('id')).map((arr)=>{

  return (
          <button onClick={()=>{setselectedchannel(arr)}} className='text-[#D5F3F5] mx-[4px] rounded mt-[4px] items-center w-[95%] flex hover:bg-[#404249] font-medium'>
          <div className='flex flex-col w-[100%]'>
           <div className='pr-2 flex text-[gray] items-center max-[375px]:text-[14px] max-[320px]:text-[12px] text-2xl font-medium'># <h1 className='ml-2 max-[375px]:text-[12px] max-[320px]:text-[10px] text-left text-base leading-4'>{arr}</h1></div>
          </div>
          </button>
    )
})
}

            
          
             
        </div>
    <div className='pr-2 max-[425px]:pr-0 max-[375px]:pr-0 max-[320px]:pr-0 text-[#f2f3f5] flex justify-between items-center text-[14px] font-medium bg-[#232428]'>
      <div className='flex max-[425px]:text-[10px] max-[320px]:text-[8px]  max-[375px]:text-[10px] items-center max-[320px]:m-0 my-1 ml-1 rounded-sm hover:bg-[#b5bac1]/50 transition-all'>
      <div className='bg-[#313338] max-[425px]:h-6 max-[425px]:mr-1 max-[425px]:w-6 max-[425px]:text-[10px] max-[425px]:m-[2px] max-[375px]:ml-[1px]  max-[375px]:mr-[4px] max-[375px]:text-[6px] max-[375px]:h-5 max-[375px]:w-5 max-[320px]:text-[4px] max-[320px]:h-3 max-[320px]:w-3 max-[320px]:mx-1 max-[320px]:my-1 mx-2 my-2 ml-2 flex justify-center items-center h-8 w-8 rounded-[50%] text-[white]'>{user?.displayName[0]}</div>
      {user?.displayName}
    </div>
    <div onClick={()=>{setsettings(!settings)}} className='ml-6 max-[1024px]:ml-3 max-[768px]:ml-1 max-[320px]:ml-0 max-[425px]:ml-1 cursor-pointer max-[375px]:ml-1.5 p-2 max-[768px]:p-1 rounded-sm hover:bg-[#b5bac1]/50 transition-all'>
      <img className='w-12 max-[375px]:w-20 max-[1024px]:w-20 max-[768px]:w-38 max-[768px]:w-28 max-[768px]:p-1 max-[320px]:w-16' src="https://cdn-icons-png.flaticon.com/512/3524/3524640.png" alt="" />
      <div className='relative'>
    </div>
    </div>
      <div className={`bg-[#232428] px-2 mr-10 absolute overflow-hidden bottom-5 -z-10 opacity-0 left-[10%] ${settings && ' translate-y-[-80%] opacity-100 z-10'} transition-all`}>
      <div className='flex flex-col'>
    <button className='pb-1 border-b '>Account</button>
      <button onClick={signout}>Sign Out</button>
      </div>
      </div>
    
      </div>
      </div>
      <div className='w-[100%] flex flex-col overflow-x-hidden justify-end pb-4'>
      <h2 className='overflow-y-scroll overflow-x-hidden max-[768px]:w-[95%]'>     
      {data?.[selectedchannel]?.map((message=>{
        const mess = message.split(":")
        return( 
          <div className='ml-0 flex mb-4'>
            <div className='flex items-center hover:bg-[#2E3035] w-[100%]'>
            <div className='bg-[#444141] max-[425px]:h-8 max-[425px]:w-8 max-[425px]:text-[12px] max-[425px]:ml-2 ml-6 flex justify-center items-center h-11 w-11  max-[375px]:h-6  max-[375px]:w-6  max-[375px]:text-[8px] max-[375px]:ml-2 max-[320px]:h-4 max-[320px]:w-4 max-[320px]:text-[6px] max-[320px]:ml-2 rounded-[50%] text-[white]'>{mess[0].charAt(0).toUpperCase()}</div>
            <div className='ml-4 max-[425px]:ml-2 max-[320px]:ml-2 max-[375px]:ml-2 flex justify-center flex-col'>

            <h2 className='max-[425px]:text-[14px] text-[#F2F3F5] max-[375px]:mt-2.5 max-[375px]:text-[10px] max-[320px]:mt-2 max-[320px]:text-[8px] font-medium mb-1 hover:underline'>
            {mess[0]}
            </h2>
            <p className='text-[#DBDEE1] max-[425px]:text-[14px] break-all  max-[375px]:pr-2 max-[375px]:text-[14px] max-[320px]:pr-1 text-left max-[320px]:text-[12px]'>
            {mess[1]}
            </p>
            </div>
            </div>
          </div>
        )
       
      }))

      }
      </h2>
        <form onSubmit={messageHandler} className='max-w-[100%] w-[98%]' >
        <input type="text" placeholder='Message #general' className='pl-2 max-[320px]:p-0  max-[375px]:p-1 max-[320px]:ml-2 outline-none text-[white] bg-[#383A40] py-2  max-[375px]:ml-2 ml-6 mt-2 rounded max-w-[100%] w-[98%]' />
        </form>
      </div>
    </div>
  )
}

export default Home