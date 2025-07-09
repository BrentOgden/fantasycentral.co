import './index.css'
import data from './data'
import Card from './Card'
import './App.css'
import React from 'react'

function Contact() {

  const cards = data.map(item => {


    return (
      <section>
        <div className='cardLayout'>
          <Card
            img={item.coverImg}
            rating={item.stats.rating}
            stats={item.stats.reviewCount}
            location={item.location}
            title={item.title}
            price={item.price}
          />
          
        </div>
      </section>
    )
  }
)}
export default Contact
