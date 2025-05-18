import Appointment from '../components/appointment'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './appoint.css'
import User_navbar from '../components/user_navbar'


const Service = (props) => {
  return (
    <div className="service-container">
      
      <User_navbar></User_navbar>
      <Appointment></Appointment>
      <div id="contact-section"></div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default Service