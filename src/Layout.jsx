import React, { useEffect, useState } from 'react';
import Navbar from "./Components/Header/Navbar";
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import { auth } from '../firebase'

function Layout() {

  const [user , setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUser(user)
      }
      else{
        setUser(null)
      }
    })
  })

  return (
   <>
     <Navbar user={user} />
     <Outlet />
     <Footer />
   </>
  )
}

export default Layout