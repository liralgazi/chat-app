import { useEffect, useState } from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import { remult } from 'remult'
import { User } from './server/model/userModel'

// will return repo to users
//const userRepo = remult.repo(User)
function App() {
/*
  const [users,setUsers] = useState<User[]>([]);
  useEffect(()=>{
    userRepo.find().then(setUsers);
  },[]);
*/
  return <BrowserRouter>
  <Routes>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/" element={<Chat/>}/>
  </Routes>
  </BrowserRouter>

}

export default App
