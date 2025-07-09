import React from 'react';
import WeeklyPoints from './WeeklyPoints';
import WeeklyPointsLeast from './WeeklyPointsLeast';
import WeeklyPointsLeastRecent from './WeeklyPointsLeastRecent';
import leagueChamp from '../assets/league_champ.jpg'; // Adjust path as needed
import img1214 from '../assets/IMG_1214.jpg'; // Adjust path as needed
import img0228 from '../assets/IMG_0228.jpg'; // Adjust path as needed

function LeagueRecordsWeekly() {
  return (
    <section>
      <div className='pl-16 pr-16 pt-4 timeline-intro'>
        <h1 className='my-4 text-center'>Weekly Records</h1>
        <p>Here you will find historical records for a single week - most points in a week, least points in a week, etc. These records are updated as they happen, so they will always be the most up-to-date.</p>
        <p>*These records are for regular season only</p>
        {/* <img className="layout" src={leagueChamp} alt="League Champion" />
        <img className="layout" src={img1214} alt="Image 1214" />
        <img className="layout" src={img0228} alt="Image 0228" /> */}
      </div>
      <div className='grid-container ml-6 mr-6'>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Most Points in a Week</h3>
          <WeeklyPoints />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Fewest Points in a Week (prior to 2013)</h3>
          <WeeklyPointsLeast />

        </div>
        <div className='grid-column timeline-layout'>
          <h3 className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>Fewest Points in a Week (2013 to Present)</h3>
          <WeeklyPointsLeastRecent />

        </div>
      </div>

    </section>
  );
}

export default LeagueRecordsWeekly;
