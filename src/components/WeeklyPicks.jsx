import '../customCss/WeeklyPicks.css'
import React from 'react'


function WeeklyPicks(props) {
  return (
    <section>
      
      <div className='flex-container section-header'>
        <h2>

          Week 1 Award Winners

        </h2>
        <div className="award-weekly-results flex-item animate__animated animate__zoomIn animate__delay-1s">
          <h3>High Points</h3>
          <p>Met Nagatani - 189.65 points</p>
        </div>
        <div className="award-weekly-results flex-item animate__animated animate__zoomIn animate__delay-1s">
          <h3>Tim Tebow "Praise Jesus" Award</h3>
          <p>Lamar Jackson - 57.45 points </p>
        </div>

        <div className="award-weekly-results flex-item animate__animated animate__zoomIn animate__delay-1s">
          <h3>Big Ben's "Buy me Dinner First" Award</h3>
          <p>Kristen Hazen - Lost to Met by 58.3 points</p>
        </div>
        <div className="award-weekly-results flex-item animate__animated animate__zoomIn animate__delay-1s">
          <h3>Pot of Gold Award</h3>
          <p>Kristen Hazen - Lost to Met 189.65 to 131.35</p>
        </div>
        <div className="award-weekly-results flex-item animate__animated animate__zoomIn animate__delay-1s">
          <h3>Aaron Hernandez "Hangin' Tough" Award</h3>
          <p>Nick Hazen - Lost to Brandon by 3.5 points</p>
        </div>

      </div>
    </section>
    
  )
}

export default WeeklyPicks
