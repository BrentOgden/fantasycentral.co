import bSquared from './assets/logo2025black.png'
import './App.css'
import React from 'react'

export default function Footer() {


  return (

    <div className='border-t-red-800 border-t-4'>
      <nav className='footerNav bg-gradient-to-br from-red-900 via-black to-red-700'>
        <img className='footer---logo md:h-5/6 w-auto md:mx-12 my-2 p-0 rounded-xl' src={bSquared} />
        {/* <div className='footerText'>
          <ul className='footerBullets'>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Projects</a></li>
            <li><a href="#">Contact Us</a></li>
           
          </ul>
        </div> */}
        <div className='copyrightText p-3'>
          <p>Copyright &copy;2025 Brent Ogden. All stats and player information referenced on this site are the property and rights of those owners, and shall not be used without their consent.</p>
        </div>


      </nav >
    </div>
  )
}


