import React from 'react';
import SeasonPoints from './SeasonPoints';
import SeasonPointsLeast from './SeasonPointsLeast';
import SeasonPointsLeastRecent from './SeasonPointsLeastRecent';
import SeasonWins from './SeasonWins'
import SeasonLosses from './SeasonLosses'
import leagueChamp from '../assets/league_champ.jpg'; // Adjust path as needed
import img1214 from '../assets/IMG_1214.jpg'; // Adjust path as needed
import img0228 from '../assets/IMG_0228.jpg'; // Adjust path as needed

function LeagueRecordsYearly() {
  return (
    <section>
      <div className='pl-16 pr-16 pt-4 timeline-intro'>
        <h1 className='my-4 text-center'>Single Season Records</h1>
        <p>Here you will find historical records for an entire season - most points in a season, least points in a season, etc. These records are updated as they happen, so they will always be the most up-to-date.</p>
        <p>*These records are for regular season only</p>
        {/* <img className="layout" src={leagueChamp} alt="League Champion" />
        <img className="layout" src={img1214} alt="Image 1214" />
        <img className="layout" src={img0228} alt="Image 0228" /> */}
      </div>
      <div className='grid-container ml-6 mr-6'>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most Points in a Season</h3>
          <SeasonPoints />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Least Points in a Season (Prior to 2013)</h3>
          <SeasonPointsLeast />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Least Points in a Season (2013 to Present)</h3>
          <SeasonPointsLeastRecent />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most Wins in a Season</h3>
          <SeasonWins />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most Losses in a Season</h3>
          <SeasonLosses />

        </div>
      </div>

    </section>
  );
}

export default LeagueRecordsYearly;
