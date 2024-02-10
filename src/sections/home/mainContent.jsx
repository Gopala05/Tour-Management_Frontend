import React, { useEffect } from 'react'
import lottie from 'lottie-web';
import Horizon from '../../assets/Icons/horizon.png';
import { Image } from 'antd';

function mainContent() {

  useEffect(() => {
    const container = document.getElementById("lottie-container");

    if (!container) {
      console.error("Container element not found");
      return;
    }

    const animation = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/src/assets/Animation_files/Tour.json",
    });

    return () => {
      animation.destroy();
    };
  }, []); 
  
  return (
    <div style={{marginTop: '12rem'}}>
      <section id="main">
      <div className="main-content">
        <div className="main-text">
          <strong>
            Explore Horizons
            <Image
            //   style="margin-left: 5px"
              style={{marginLeft: '8px'}}
              src={Horizon}
              width="30px"
              alt="Horizon Icon"
            />
          </strong>
          <h1>Embark on an Odyssey of Liberation, Every Step is a Leap into Boundless Freedom</h1>
          <p>
            Embrace the Call of the Unknown, Your Journey Awaits, Unshackle Your
            Spirit, Roam Free Across Boundless Horizons.
          </p>
          <a href='/login'> 
            {/* <Button className='FreedomBtn' style={{background: 'transparent', border: 'transparent'}}> */}
              Step Into Freedom
            {/* </Button> */}
            </a>
        </div>

        <div className="main-img" id="lottie-container"></div>
      </div>

      {/* <div class="search-your">
            <form>
                <div class="t-search">

                    <div class="s-b-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="s-b-input">
                       <span> Location <i class="fas fa-chevron-down"></i></span>
                       <input type="text"  name="location" placeholder="Location" required> 
                    </div>
                </div>
            </form>
        </div> */}
      <div className="padd"></div>
    </section>
    </div>
  )
}

export default mainContent
