import Services from '../components/services'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './user_service.css'
import User_navbar from '../components/user_navbar'


const Service = (props) => {
  return (
    <div className="service-container">
      
      <User_navbar></User_navbar>
      <Services></Services>
      <div id="contact-section"></div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default Service