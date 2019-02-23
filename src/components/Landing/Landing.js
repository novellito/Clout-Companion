import React from 'react';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './Landing.css';

const Landing = props => {
  return (
    <div>
      <AppNavbar history={props.history} />

      <section id="landing">
        <div className="container ">
          {/* <div className="row flex-center "> */}
          <div className="row">
            <div className="">
              <div className="white-text landing-text">
                <h1>A Hypebeast sales tracker</h1>
                <h6>
                  With the resources you need to become a successful reseller
                </h6>
              </div>
            </div>

            <Carousel
              showArrows={false}
              showStatus={false}
              // interval={2000}
              infiniteLoop={true}
              autoPlay={true}
              showThumbs={false}
              // onChange={onChange}
              // onClickItem={onClickItem}
              // onClickThumb={onClickThumb}
            >
              <div className="foofoo">
                <h1>poop</h1>I eat poopoo
                {/* <img src="https://lorempixel.com/250/250/nature/1" /> */}
                {/* <p className="legend">Legend 1</p> */}
              </div>
              <div>
                <img src="https://lorempixel.com/250/250/nature/3" />
                {/* <p className="legend">Legend 2</p> */}
              </div>
              <div>
                <img src="https://lorempixel.com/250/250/nature/2" />
                {/* <p className="legend">Legend 3</p> */}
              </div>
            </Carousel>
            <div className="card landing-text">
              hello
              {/* <Carousel options={{ fullWidth: true }}>
                <div className="red">
                  <h2>First Panel</h2>
                  <p className="white-text">This is your first panel</p>
                </div>
                <div className="amber">
                  <h2>Second Panel</h2>
                  <p className="white-text">This is your second panel</p>
                </div>
                <div className="green">
                  <h2>Third Panel</h2>
                  <p className="white-text">This is your third panel</p>
                </div>
                <div className="blue">
                  <h2>Fourth Panel</h2>
                  <p className="white-text">This is your fourth panel</p>
                </div>
              </Carousel> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
