import bSquared from './assets/logo2025black.png'
import rightLogo from './assets/bsquaredlogo2.png'
import './App.css'
import React from 'react'

export default function Footer() {
  return (
    <div className="border-t-red-800 border-t-4">
      <nav className="footerNav bg-gradient-to-br from-red-900 via-black to-red-700 flex flex-col md:flex-row items-center justify-between px-6 py-3">

        {/* Left Logo */}
        <img
          className="footer---logo h-14 md:h-20 ml-20 mr-10 w-auto rounded-xl"
          src={bSquared}
          alt="B Squared Solutions Logo"
        />

        {/* Center + Right Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-center md:justify-end text-white text-sm gap-3 md:gap-6 w-full md:w-auto text-center md:text-right">
          <div className="max-w-4xl">
            <p className="-mt-16">
              Copyright &copy; 2025 Fantasy Central. All stats and player
              information referenced on this site are the property and rights of
              those owners, and shall not be used without their consent.
            </p>

          </div>
          <p className="-mt-24 text-right">
            Designed and built by{' '}
            <a
              href="https://bsquaredsolutions.io"
              className="text-white hover:text-red-300 transition-colors" target='_blank'
            >
              B Squared Solutions
            </a>
          </p>
          {/* Right Logo */}
          <img
            className="footer---logo h-14 md:h-16 w-auto rounded-xl md:ml-1"
            src={rightLogo}
            alt="Fantasy Central Logo"
          />
        </div>
      </nav>
    </div>
  )
}
