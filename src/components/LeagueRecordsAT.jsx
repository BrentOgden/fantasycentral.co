import React from 'react';
import AllTimeRecords from './AllTimeRecords';
import YearlyRecords from './YearlyRecords';
import MoneyRecords from './MoneyRecords';
import Wins from './Wins';
import Losses from './Losses';
import HighPoints from './HighPoints';
import leagueChamp from '../assets/league_champ.jpg'; // Adjust path as needed
import img1214 from '../assets/IMG_1214.jpg'; // Adjust path as needed
import img0228 from '../assets/IMG_0228.jpg'; // Adjust path as needed

function LeagueRecordsAT() {
  return (
    <section>
      <div className='pl-16 pr-16 pt-4 timeline-intro'>
        <h1 className='my-4 text-center'>All-Time Records</h1>
        <p>Here you will find historical records from the league's inception to the present - most money won, all-time win/loss records, etc. These records are updated as they happen, so they will always be the most up-to-date.</p>
        <p>*These records are for regular season only</p>
        {/* <img className="layout" src={leagueChamp} alt="League Champion" />
        <img className="layout" src={img1214} alt="Image 1214" />
        <img className="layout" src={img0228} alt="Image 0228" /> */}
      </div>
      <div className='grid-container ml-6 mr-6 '>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>All-Time Win-Loss Records</h3>
          <AllTimeRecords />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>All-Time Points Records</h3>
          <YearlyRecords />
        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>All-Time Money Leaders</h3>
          <MoneyRecords />
        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most Wins All-Time</h3>
          <Wins />
        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most Losses All-Time</h3>
          <Losses />
        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most High Point Wins All-Time</h3>
          <HighPoints />
        </div>
      </div>

    </section>
  );
}

export default LeagueRecordsAT;
