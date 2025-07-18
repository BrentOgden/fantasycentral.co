// src/components/Nav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bSquared from './assets/logo2025black.png';
import './Nav.css';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState(null);
  const isApp = typeof window !== 'undefined' && !!window.cordova;

  return (
    <nav className="headerNav relative bg-gradient-to-br from-red-900 via-black to-red-700 text-black md:text-white">
      <div className="md:container md:mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home">
          <img
            src={bSquared}
            alt="Site Logo"
            className="h-32 md:h-36 w-auto md:mt-20 p-1 rounded-xl"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li
            onMouseEnter={() => setCurrentDropdown('records')}
            onMouseLeave={() => setCurrentDropdown(null)}
          >
            <Link to="#">League Records</Link>
            {currentDropdown === 'records' && (
              <div className="dropdown">
                <Link to="/leaguerecordsweekly">Weekly Records</Link>
                <Link to="/leaguerecordsyearly">Yearly Records</Link>
                <Link to="/leaguerecordsat">All-Time Records</Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/leaguehistory">League History</Link>
          </li>
          <li>
            <a
              href="/assets/HernandezHangmenLeagueRules_2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dynasty League Rules
            </a>
          </li>
          <li
            onMouseEnter={() => setCurrentDropdown('picks')}
            onMouseLeave={() => setCurrentDropdown(null)}
          >
            <Link to="#">Weekly Picks</Link>
            {currentDropdown === 'picks' && (
              <div className="dropdown">
                <a
                  href="https://bdbd.football.cbssports.com/office-pool/make-picks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Make Picks
                </a>
                <Link to="/results">Results</Link>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setCurrentDropdown('sites')}
            onMouseLeave={() => setCurrentDropdown(null)}
          >
            <Link to="/">League Sites</Link>
            {currentDropdown === 'sites' && (
              <div className="dropdown">
                <a
                  href="https://www44.myfantasyleague.com/2025/home/63794#0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dynasty League
                </a>
                <a
                  href="https://fantasy.espn.com/football/league?leagueId=249295"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ESPN League
                </a>
              </div>
            )}
          </li>
        </ul>

        {/* Hamburger (mobile web only) */}
        {!isApp && (
          <button
            className="absolute top-4 right-4 md:hidden text-3xl z-50"
            onClick={() => setMenuOpen(o => !o)}
          >
            ☰
          </button>
        )}
      </div>

      {/* Mobile tray menu */}
      {!isApp && (
        <ul
          className={`
            md:hidden
            absolute top-full left-0 w-full
            bg-white shadow-md border-t border-gray-300
            flex flex-col space-y-2 p-4
            transition-all duration-200 ease-in-out
            ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
          `}
        >
       <li
            onMouseEnter={() => setCurrentDropdown('records')}
            onMouseLeave={() => setCurrentDropdown(null)}
          >
            <Link to="#" className="text-black">League Records</Link>
            {currentDropdown === 'records' && (
              <div className="dropdown">
                <Link to="/leaguerecordsweekly">Weekly Records</Link>
                <Link to="/leaguerecordsyearly">Yearly Records</Link>
                <Link to="/leaguerecordsat">All-Time Records</Link>
              </div>
            )}
          </li>
          <li><Link className="text-black" to="/leaguehistory">League History</Link></li>
          <li>
            <a
              className="text-black"
              href="/assets/HernandezHangmenLeagueRules_2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dynasty League Rules
            </a>
          </li>
          <li
            onMouseEnter={() => setCurrentDropdown('picks')}
            onMouseLeave={() => setCurrentDropdown(null)}
          >
            <Link to="#" className="text-black">Weekly Picks</Link>
            {currentDropdown === 'picks' && (
              <div className="dropdown">
                <a
                  href="https://bdbd.football.cbssports.com/office-pool/make-picks"
                  target="_blank"
                  rel="noopener noreferrer" 
                >
                  Make Picks
                </a>
                <Link to="/results">Results</Link>
              </div>
            )}
          </li>
          <li><Link className="text-black" to="/">League Sites</Link></li>
        </ul>
      )}
    </nav>
  );
}
