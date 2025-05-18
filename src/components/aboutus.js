import React from "react";

import { useLocation } from "react-router-dom"; // Import useLocation
import "./aboutus.css";

const AboutUs = () => {
  const location = useLocation(); // Get current route
  
  return (
    <div>
      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-container">
          <h2 className="about-us-title">About Healing Haven</h2>
          <p className="about-us-text">
          <p>
      <strong>Healing Haven</strong> is a comprehensive mental health and wellness consultancy dedicated to providing high-quality, evidence-based psychotherapy services tailored to meet the diverse needs of our clients.
    </p>
    <br></br>
    <p>
      Our practice is built on the principles of empathy, confidentiality, and clinical excellence. We offer a safe and supportive environment where individuals, couples, families, and groups can explore their emotional challenges, build resilience, and work toward meaningful personal growth and psychological well-being.
    </p>
    <p>
      With a team of licensed mental health professionals, Healing Haven delivers a wide spectrum of therapeutic services, including:
    </p>
    <br></br>
    <ul>
      <li><strong>Individual Therapy</strong> for stress, anxiety, depression, trauma, and self-esteem issues</li>
      <li><strong>Couples and Family Therapy</strong> focused on communication, conflict resolution, and relationship dynamics</li>
      <li><strong>Child and Adolescent Counseling</strong> to address behavioral, academic, and emotional concerns</li>
      <li><strong>Group Therapy</strong> sessions that foster peer support and shared healing</li>
      <li><strong>Career & Life Coaching</strong> to support goal setting, transitions, and work-life balance</li>
      <li><strong>Self-Assessment Tools</strong> that provide valuable insights into your mental health</li>
    </ul>
    <p>
      To ensure accessibility and convenience, we offer both <strong>in-person sessions</strong> and <strong>secure online therapy</strong>, including <strong>text-based therapy</strong> and <strong>video consultations</strong>, accommodating the evolving needs of our clients.
    </p>
    <br></br>

    <h3>Our Mission</h3>
    <p>
      To promote mental health awareness and provide client-centered, compassionate psychotherapy that empowers individuals to lead healthier, more fulfilling lives.
    </p>
    <br></br>

    <h3>Our Vision</h3>
    <p>
      To be a trusted and transformative mental health partner, fostering resilience and well-being across communities.
    </p>
    <br></br>

    <p>
      Healing Haven is more than just a therapy center — it's a place of support, transformation, and hope. We are committed to walking with you every step of your journey toward healing.
    </p>
    </p>
        </div>

      </section>
    </div>
  );
};

export default AboutUs;
