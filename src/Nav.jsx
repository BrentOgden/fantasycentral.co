// src/components/Nav.jsx
import React, { useState } from 'react';
import { Link }        from 'react-router-dom';
import bSquared        from './assets/logo2025black.png';  // back out of components into assets
import './Nav.css';

export default function Nav() {
  // ← both hooks live here, inside the component:
  const [menuOpen, setMenuOpen]           = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState(null);

  return (
    <nav className="headerNav bg-gradient-to-br from-red-900 via-black to-red-700 relative text-black md:text-white">
      <div className="md:container md:mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home">
          <img
            src={bSquared}
            alt="Site Logo"
            className="h-32 md:h-36 w-auto md:mt-20 p-1 rounded-xl"
          />
        </Link>

        {/* Hamburger (only on mobile) */}
        <button
          className="hamburger-icon md:hidden right-52 align-top text-3xl"
          onClick={() => setMenuOpen(o => !o)}
        >
          ☰
        </button>

        {/* Nav links */}
        <ul
          className={`
            menu-list
            absolute md:static top-full left-0 w-full md:w-auto
            bg-white md:bg-transparent
            text-black md:text-white
            flex-col md:flex-row
            ${menuOpen ? 'flex' : 'hidden'} md:flex
          `}
        >
          <li
            onMouseEnter={() => setCurrentDropdown('records')}
            onMouseLeave={() => setCurrentDropdown(null)}
          >
            <Link to="/">League Records</Link>
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
            <Link to="/">Weekly Picks</Link>
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
      </div>
    </nav>
  );
}
