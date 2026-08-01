import "../customCss/Blocks.css";
import rules from "../assets/HernandezHangmenLeagueRules_2024.pdf";
import app from "../assets/fantasyapp.jpeg";
import app2 from "../assets/fantasyapp2.jpg";
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";

import React from "react";

function Blocks(props) {
  return (
    <section className="md:container md:mx-auto px-0 blurbs">
      <div className="shadow-xl shadow-red-800/40 section-header-panel rounded-2xl">
        <button className="bg-gradient-to-r from-red-900 via-black to-red-700 text-white border-red-800 rounded-sm w-full hover:bg-red-800/80 hover:text-white">
          <a href="https://fantasycentral.floot.app" target="_blank">
            <h2 className="text-lg font-bold text-white p-px">
              Fantasy Central Mobile App
            </h2>
          </a>
        </button>

        <p className="mt-2 text-black">
          Download the <strong>brand-new</strong> Fantasy Central Mobile App for
          easy access to all league information, including standings, scores,
          roster tracking and more for BOTH leagues in one spot.
        </p>

        <ul className="mt-2 space-y-2 text-black italic text-left">
          <li className="flex items-start">
            <FaApple className="h-6 w-6 flex-shrink-0 text-blue-900 animate-bounce mr-3" />
            <span>
              iPhone users - open the link in Safari and save to Home Screen as
              a web app.
            </span>
          </li>

          <li className="flex items-start">
            <IoLogoAndroid className="h-6 w-6 flex-shrink-0 text-green-800 animate-bounce mr-3" />
            <span>
              Android users - open the link in Chrome and add to Home Screen as
              a web app.
            </span>
          </li>
        </ul>
      </div>

      {/* <div className='shadow-xl shadow-red-800/40 section-header-panel'>
       <button className='bg-gradient-to-r from-red-900 via-black to-red-700 text-white border-red-800 rounded-sm w-full hover:bg-red-800/80 hover:text-white'> <a href="https://www44.myfantasyleague.com/2024/home/63794#0" target="_blank">
          <h2 className="text-lg font-bold text-white p-px">MFL League Site </h2>
        </a></button>
        <p className='mt-2 text-black'>Easy access to the dynasty league page on MFL.</p>

      </div> */}

      <div className="shadow-xl shadow-red-800/40 bg-slate-200 section-header-panel">
        {/* 
  <button className="bg-gradient-to-r from-red-900 via-black to-red-700 text-white border-white rounded-sm w-full hover:bg-red-800/80 hover:text-white">
    <a
      href="https://picks.cbssports.com/football/pickem/pools/kbxw63b2geytgnrzheyda%3D%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="text-lg font-bold text-white p-px">
        Weekly Picks
      </h2>
    </a>
  </button>

  <p className="mt-2 text-black">
    Make your weekly picks and check previous results, standings, etc.
  </p>
  */}

        <div className="grid w-full grid-cols-2 gap-4">
          <div className="group h-72 overflow-hidden rounded-lg">
            <img
              src={app}
              alt="Fantasy Central App"
              className="block w-full h-auto transition-transform duration-[5000ms] ease-linear group-hover:-translate-y-[calc(100%-18rem)]"
            />
          </div>

          <div className="group h-72 overflow-hidden rounded-lg">
            <img
              src={app2}
              alt="Fantasy Central App"
              className="block w-full h-auto transition-transform duration-[5000ms] ease-linear group-hover:-translate-y-[calc(100%-18rem)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blocks;
