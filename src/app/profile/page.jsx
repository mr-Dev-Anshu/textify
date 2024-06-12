import React from 'react'
import {getSession} from "@/action"
import { redirect } from 'next/navigation'

const page = async() => {

  const session = await getSession() ; 
  if(!session.userid){
     redirect("/login")
  }
  return (
    <div className='text-white'>
      This is profile page 
    </div>
  )
}
export default page