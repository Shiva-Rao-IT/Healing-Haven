import User_navbar from '../components/user_navbar'
import AboutUs from '../components/aboutus'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './user_about.css'


const About = (props) => {
  return (
    <div className="about-container">
      
      <User_navbar></User_navbar>
      <AboutUs></AboutUs>
      <div id="contact-section"></div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default About