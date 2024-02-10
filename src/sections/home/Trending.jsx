import React, { useEffect } from 'react';
import GAC from '../../assets/Icons/Agency.png';
import Tour1 from '../../assets/Tourism Places/Amritsar.jpg';
import Tour2 from '../../assets/Tourism Places/Jaipur.jpg';
import Tour3 from '../../assets/Tourism Places/Rishikesh.jpg';
import Tour4 from '../../assets/Tourism Places/Spiti_Vally.jpg';
import Tour5 from '../../assets/Tourism Places/Thekkady.jpg';
import Tour6 from '../../assets/Tourism Places/Udaipur.jpg';
import { Image } from 'antd';

function Trending() {

  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    });

    // Destroy Swiper when the component unmounts to avoid memory leaks
    return () => {
      swiper.destroy();
    };
  }, []); 
  
  return (
    <section id="trending">
      <div class="trending-heading">
        <h2>Trending</h2>
        <p>Trending Places for You...</p>
      </div>

      <div class="trending-box-container">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour1} alt="Tending Image 1" />
                </div>

                <div class="t-b-text">
                  <a href="#"> Amritsar </a>
                  <span> 10 Places | 3 Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> 10,999 INR </span>
                  <a href="#" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour6} alt="Tending Image 6" />
                </div>

                <div class="t-b-text">
                  <a href="#"> Udaipur </a>
                  <span> 4 Places | 5 Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> 3,999 INR </span>
                  <a href="#" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour4} alt="Tending Image 4" />
                </div>

                <div class="t-b-text">
                  <a href="#"> Spiti vally </a>
                  <span> 14 Places | 2 Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> 14,999 INR </span>
                  <a href="#" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour3} alt="Tending Image 3" />
                </div>

                <div class="t-b-text">
                  <a href="#"> Rishikesh </a>
                  <span> 6 Places | 6 Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> 4,999 INR </span>
                  <a href="#" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour2} alt="Tending Image 2" />
                </div>

                <div class="t-b-text">
                  <a href="#"> Jaipur </a>
                  <span> 9 Places | 5 Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> 7,999 INR </span>
                  <a href="#" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour5} alt="Tending Image 5" />
                </div>

                <div class="t-b-text">
                  <a href="#"> Thekkady </a>
                  <span> 5 Places | 8 Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> 6,999 INR </span>
                  <a href="#" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>

            
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}

export default Trending
