import React from 'react';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from 'react-materialize';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = props => {
  return (
    <>
      <AppNavbar history={props.history} />
      <section id="landing">
        <div className="container">
          <div className="landing-row">
            <div>
              <div className="white-text landing-text">
                <h1>A hypebeast sales tracker</h1>
                <p>with the tools you need to become a successful reseller</p>
              </div>
              <div className="action-btns">
                {localStorage.length > 0 ? (
                  <Link to="/dashboard">
                    <Button modal="close" waves="light">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button modal="close" waves="light">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <Carousel
              showArrows={false}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={true}
              showThumbs={false}
            >
              <div className="feature-container">
                <i className="fas fa-calculator" />
                <p>Calculate shipping fees for Paypal, StockX, and Grailed</p>
              </div>
              <div className="feature-container">
                <i className="fas fa-chart-line" />
                <p>Keep track of past sales</p>
              </div>
              <div className="feature-container">
                <i className="fas fa-toolbox" />
                <p>Resources to help beginner resellers</p>
              </div>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
