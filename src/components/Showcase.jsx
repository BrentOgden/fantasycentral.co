import './index.css'
import './App.css'
import React from 'react'

function Showcase(props) {
  let badgeText
  if (props.item.openSpots === 0) {
    badgeText = "SOLD OUT"
  } else if (props.item.location === "Online") {
    badgeText = "ONLINE"
  }


return (
  <section>
    <div className='showcase'>
      {badgeText && <div className='card--badge'>
        {badgeText}
      </div>}
      <img src={props.item.coverImg} className='showcase-card--image' /></div>
    <div>
      {/* <img src={star} className="card--star" /> {props.item.stats.rating} <span className='grey'>({props.item.stats.reviewCount})</span> - {props.item.location}
      <br></br> */}
      <h4>{props.item.title}</h4>
      <p>{props.item.description}</p>
    </div>
  </section>
)

}
export default Showcase
