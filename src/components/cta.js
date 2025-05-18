import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./cta.css";

const CTA = (props) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta-accent2-bg">
          <div className="cta-accent1-bg">
            <div className="cta-container2">
              <div className="cta-content">
                <span className="thq-heading-2">{props.heading1}</span>
                <p className="thq-body-large">{props.content1}</p>
              </div>
              <div className="cta-actions">
                <button
                  type="button"
                  className="thq-button-filled cta-button"
                  onClick={() => {
                    if (location.pathname.startsWith("/user")) {
                      history.push("/user/service");
                    } else {
                      history.push("/service");
                    }
                    window.scrollTo(0, 0);
                  }}
                >
                  {props.action1}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CTA.defaultProps = {
  heading1: "Start your journey towards healing and growth",
  content1:
    "Take the first step towards a healthier mind and a happier life. Contact us today to schedule your initial consultation.",
  action1: "Schedule a Consultation",
};

CTA.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
  action1: PropTypes.string,
};

export default CTA;
