import React from 'react'

import PropTypes from 'prop-types'
import { useHistory , useLocation} from "react-router-dom";
import './steps.css'

const Steps = (props) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="steps-container1 thq-section-padding">
      <div className="steps-max-width thq-section-max-width">
        <div className="steps-container2 thq-grid-2">
          <div className="steps-section-header">
            <h2 className="thq-heading-2">
              Discover the Power of Our Products
            </h2>
            <p className="thq-body-large">
            Unlock a world of innovation and quality with our carefully crafted products designed to enhance your well-being. Whether you're seeking comfort, efficiency, or transformation, our solutions are tailored to meet your needs. Experience the perfect blend of cutting-edge technology, superior craftsmanship, and thoughtful design—empowering you to live better every day. Explore our collection and discover how our products can make a difference in your life!
            </p>
            <div className="steps-actions">
              <button className="thq-button-animated thq-button-filled steps-button">
                <span className="thq-body-small"  onClick={() => {
              if (location.pathname.startsWith("/user")) {
                history.push("/user/service");
              } else {
                history.push("/service");
              }
              window.scrollTo(0, 0);
            }}>Explore Products</span>
              </button>
            </div>
          </div>
          <div className="steps-container3">
            <div className="steps-container4 thq-card">
              <h2 className="thq-heading-2">{props.step1Title}</h2>
              <span className="steps-text14 thq-body-small">
                {props.step1Description}
              </span>
              <label className="steps-text15 thq-heading-3">01</label>
            </div>
            <div className="steps-container5 thq-card">
              <h2 className="thq-heading-2">{props.step2Title}</h2>
              <span className="steps-text17 thq-body-small">
                {props.step2Description}
              </span>
              <label className="steps-text18 thq-heading-3">02</label>
            </div>
            <div className="steps-container6 thq-card">
              <h2 className="thq-heading-2">{props.step3Title}</h2>
              <span className="steps-text20 thq-body-small">
                {props.step3Description}
              </span>
              <label className="steps-text21 thq-heading-3">03</label>
            </div>
            <div className="steps-container7 thq-card">
              <h2 className="thq-heading-2">{props.step4Title}</h2>
              <span className="steps-text23 thq-body-small">
                {props.step4Description}
              </span>
              <label className="steps-text24 thq-heading-3">04</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Steps.defaultProps = {
  step1Description:
    'Schedule an initial consultation to discuss your needs and goals with one of our experienced psychotherapists.',
  step3Description:
    'Engage in regular therapy sessions either in person or through online video calls to work towards your mental health goals.',
  step2Title: 'Customized Treatment Plan',
  step2Description:
    'Receive a personalized treatment plan tailored to your specific concerns and preferences.',
  step1Title: 'Initial Consultation',
  step3Title: 'Therapy Sessions',
  step4Description:
    'Regularly evaluate your progress with your therapist to ensure that you are on track towards achieving your desired outcomes.',
  step4Title: 'Progress Evaluation',
}

Steps.propTypes = {
  step1Description: PropTypes.string,
  step3Description: PropTypes.string,
  step2Title: PropTypes.string,
  step2Description: PropTypes.string,
  step1Title: PropTypes.string,
  step3Title: PropTypes.string,
  step4Description: PropTypes.string,
  step4Title: PropTypes.string,
}

export default Steps
