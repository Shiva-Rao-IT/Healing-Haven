import Navbar from '../components/navbar'
import AboutUs from '../components/aboutus'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './about.css'


const About = (props) => {
  return (
    <div className="about-container">
      
      <Navbar></Navbar>
      <AboutUs></AboutUs>
      <div id="contact-section"></div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default About