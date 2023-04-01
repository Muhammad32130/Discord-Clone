import React, { useEffect, useState } from 'react'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'

function App() {
  const [user, setuser] = useState(null)
  useEffect(()=>{
    onAuthStateChanged((auth),(user)=>{
      setuser(user)
    } )
  },[])
  console.log(user)
  return (
    <>
    
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login/>}></Route>
        {user=== null && <Route path='/home' element={<Login/>}></Route> }
        <Route path='/home' element={<Home user={user} setuser={setuser}/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App