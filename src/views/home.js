import React from 'react'



import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Features1 from '../components/features1'
import CTA from '../components/cta'
import Features2 from '../components/features2'
import Pricing from '../components/pricing'
import Steps from '../components/steps'
import Testimonial from '../components/testimonial'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      
      <Navbar></Navbar>
      <Hero></Hero>
      <Features1></Features1>
      <CTA></CTA>
      <Features2></Features2>
      <Pricing></Pricing>
      <Steps></Steps>
      <Testimonial></Testimonial>
      <div id="contact-section"></div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default Home
