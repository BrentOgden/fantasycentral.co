import '../customCss/Blocks.css'
import rules from '../assets/HernandezHangmenLeagueRules_2024.pdf';
import React from 'react'


function Blocks(props) {
  return (
    <section className='md:container md:mx-auto px-10 blurbs'>
      <div className='shadow-xl shadow-red-800/40 section-header-panel rounded-2xl'>
        <button className='bg-gradient-to-r from-red-900 via-black to-red-700 text-white border-red-800 rounded-sm w-full hover:bg-red-800/80 hover:text-white'><a href={rules} target="_blank">
          <h2 className='text-lg font-bold text-white p-px'>2025 Dynasty Rules</h2>
        </a></button>
        <p className='mt-2 text-black'>Here is the detailed rules document in case you need to reference any of the guildines, scoring or bylaws.</p>

      </div>
      <div className='shadow-xl shadow-red-800/40 section-header-panel'>
       <button className='bg-gradient-to-r from-red-900 via-black to-red-700 text-white border-red-800 rounded-sm w-full hover:bg-red-800/80 hover:text-white'> <a href="https://www44.myfantasyleague.com/2024/home/63794#0" target="_blank">
          <h2 className="text-lg font-bold text-white p-px">MFL League Site </h2>
        </a></button>
        <p className='mt-2 text-black'>Easy access to the dynasty league page on MFL.</p>

      </div>
      <div className='shadow-xl shadow-red-800/40 bg-slate-200 section-header-panel'>
      <button className='bg-gradient-to-r from-red-900 via-black to-red-700 text-white border-white rounded-sm w-full hover:bg-red-800/80 hover:text-white'> <a href="https://picks.cbssports.com/football/pickem/pools/kbxw63b2geytgnrzheyda%3D%3D%3D" target='_blank'>
          <h2 className="text-lg font-bold text-white p-px">Weekly Picks</h2>
        </a></button>
        <p className='mt-2 text-black'>Make your weekly picks and check previous results, standings, etc.</p>

      </div>
    </section>
  )

}

export default Blocks
