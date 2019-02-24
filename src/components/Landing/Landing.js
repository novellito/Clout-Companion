import React from 'react';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from 'react-materialize';
import './Landing.css';

const Landing = props => {
  return (
    <div>
      <AppNavbar history={props.history} />

      <section id="landing">
        <div className="container ">
          <div className="landing-row">
            <div className="">
              <div className="white-text landing-text">
                <h1>A Hypebeast sales tracker</h1>
                <h6>
                  With the resources you need to become a successful reseller
                </h6>
              </div>
              <div className="action-btns">
                <Button modal="close" waves="light">
                  login
                </Button>
              </div>
            </div>

            <Carousel
              showArrows={false}
              showStatus={false}
              // interval={2000}
              infiniteLoop={true}
              // autoPlay={true}
              showThumbs={false}
            >
              <div className="feature-container">
                <i className="fas fa-calculator" />
                <p>Calculate shipping fees for Paypal, StockX, and Grailed</p>
              </div>
              <div className="feature-container">
                <i className="fas fa-chart-line" />
                <p>Track sales</p>
              </div>
              <div className="feature-container">
                <i className="fas fa-toolbox" />
                <p>Access tools</p>
              </div>
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
