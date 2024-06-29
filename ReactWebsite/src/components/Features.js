import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import icon1 from '../images/icon1.png';
import icon2 from '../images/icon2.png';
import icon3 from '../images/icon3.png';
import icon4 from '../images/icon4.png';

const Features = () => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Container>
        <div
          style={{
            textAlign: 'left',
            marginTop: '3rem',
            marginBottom: '3rem',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Welcome to Karnataka Coffee Plantation Insight
          </h2>
          <h5 style={{ textAlign: 'center' }}>
            Discover the Heart of India's Coffee
          </h5>
          <p>
            Nestled in the lush, green hills of southern India, Karnataka is the
            largest coffee-producing state in the country. Renowned for its
            high-quality Arabica and Robusta beans, Karnataka's coffee
            plantations in Chikmagalur, Kodagu, and Hassan regions offer a
            unique flavor and aroma cherished worldwide.
          </p>

          <h5 style={{ textAlign: 'center' }}>A Rich Legacy</h5>
          <p>
            Introduced by Baba Budan over 350 years ago, coffee cultivation in
            Karnataka has flourished, becoming a vital part of the state's
            economy and culture. Thousands of families depend on coffee farming
            for their livelihoods, and the state's coffee is a significant
            export product.
          </p>

          <h5 style={{ textAlign: 'center' }}>
            Facing Challenges with Innovation
          </h5>
          <p>
            Despite its success, Karnataka's coffee industry faces challenges
            like climate change, pests, and market volatility. Our application
            provides advanced tools for disease detection and root cause
            analysis, helping farmers protect their crops and enhance
            productivity.
          </p>

          <h5 style={{ textAlign: 'center' }}>Empowering Farmers</h5>
          <p>
            Join us in supporting Karnataka's coffee heritage. Our platform
            offers real-time insights, expert guidance, and a community of
            support to ensure the continued prosperity of Karnataka's coffee
            plantations.
          </p>
        </div>
      </Container>
      <Container>
        <div
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            marginBottom: '3rem',
          }}
        >
          <h2>Our Range of Services</h2>
        </div>
        <Row>
          <Col>
            <img src={icon1} alt="Crop Disease Detection" />
            <br />
            <span>
              <strong>Coffee Plant Disease Detection</strong>
            </span>
          </Col>
          <Col>
            <img src={icon2} alt="Weather and All API support" />
            <br />
            <span>
              <strong>Weather and All API support</strong>
            </span>
          </Col>
          <Col>
            <img src={icon3} alt="Irrigation and Modern Farming" />
            <br />
            <span>
              <strong>Irrigation and Modern Farming</strong>
            </span>
          </Col>
          <Col>
            <img src={icon4} alt="Cross-Platform Application" />
            <br />
            <span>
              <strong>Cross-Platform Application</strong>
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
