import Navbar from '../components/navbar'
import Services from '../components/services'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './service.css'


const Service = (props) => {
  return (
    <div className="service-container">
      
      <Navbar></Navbar>
      <Services></Services>
      <div id="contact-section"></div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default Service