import './App.css'
import './index.css'
import './customCss/Blocks.css'
import './customCss/Awards.css'
import './customCss/Payout.css'
import Blocks from './components/Blocks'
import Payout from './components/Payout'
import { useMediaQuery } from 'react-responsive';


function Hero() {
const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
// ... any other media queries you need


  return (
    <section className='md:container md:mx-auto px-10 heroMobile'>
      
      <div className='textBlock heroHeader'>
        <h1 className='my-4 text-center'>2025 Fantasy Football Companion Site</h1>
        <p className='my-4'>Welcome to another action-packed season of fantasy football. This will again be the companion site for both - <span className='font-bold'>"Hernandez's Hangmen"</span> - and our redraft league - <span className='font-bold'>"He-Man Woman Haters"</span>. All results and standings will be continually updated here. Please bookmark this page for easy reference.</p>
      </div>
      
      <div className='gridLayout'>
        <Blocks />
        <Payout />
       
      </div>
      <div>
        {/* <Awards /> */}
      </div>
    </section>
  
  )
  
}

export default Hero
