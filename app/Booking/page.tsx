import React from 'react'
import Contactform from '../components/contactform/Contactform';
const BookingPage = () => {
  return (
   <div className='rounded-2xl bg-gradient-to-r from-primary/50 via-[#5c7bf7]/20 to-[#3a56d6]/20 animate-gradient flex w-full flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-5'>
   <div className='w-1/2'>
      <img src="contact.png" alt="contact image" className="flex-[1] hidden md:block md:object-cover"/>
    </div>
      <Contactform/>
    </div>
  )
}

export default BookingPage;