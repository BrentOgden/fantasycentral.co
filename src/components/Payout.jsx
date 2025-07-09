import '../customCss/Payout.css'
import React from 'react'

function Payout(props) {
  return (
    <section className='content-icons bg-gradient-to-br from-red-900 via-black to-red-700 shadow-slate-500 mt-4 shadow-2xl rounded-2xl'>
      <div className='grid grid-cols-2 divide-x p-4 mt-4'>
        <div className='align-middle text-center'>
          <h3 className='font-bold text-lg'>2025 Redraft Updates</h3>
          <p className='text-center p-3'>Below are the payouts for 2025 season. The entry fee will remain the same this season. The entry fee is <span className='font-bold'>$230</span>. Reminder that all league dues must be paid prior to the start of the season (or partial payment must be made). </p>
          <h3 className='font-bold'>Redraft Payouts</h3>
          <p className='text-center p-3'>1st Place - $1100<br></br>
            2nd Place - $600<br></br>
            3rd Place - $230<br></br>
            Weekly High Points - $45/week<br></br>
            Overall High Points - $70<br></br>
            Weekly Picks Champion - $50</p>
        </div>
        <div className='text-center'>
          <h3 className='font-bold text-lg'>2025 Dynasty League Updates</h3>
          <p className='text-center p-3' >Below are the payouts for this season in dynasty. The entry fee will remain <span className='font-bold'>$160</span> for this season. The 3 year progressive pot has been reset and starts fresh this season. Reminder that all league dues must be paid prior to the start of the season (or partial payment must be made). </p>
          <h3 className='font-bold'>Dynasty Payouts</h3>
          <p className='text-center p-3'>1st Place - $800<br></br>
            2nd Place - $490<br></br>
            3rd Place - $160<br></br>
            Progressive Pot - $240/year</p>
        </div>
      </div>


    </section>
  )

}
export default Payout
