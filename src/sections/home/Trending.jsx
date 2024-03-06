import React, { useEffect, useState } from 'react';
import GAC from '../../assets/Icons/Agency.png';
// import Tour1 from '../../assets/Tourism Places/Amritsar.jpg';
// import Tour2 from '../../assets/Tourism Places/Jaipur.jpg';
// import Tour3 from '../../assets/Tourism Places/Rishikesh.jpg';
// import Tour4 from '../../assets/Tourism Places/Spiti_Vally.jpg';
// import Tour5 from '../../assets/Tourism Places/Thekkady.jpg';
// import Tour6 from '../../assets/Tourism Places/Udaipur.jpg';
import Tour from "../../assets/TourImage.webp"
import { Image } from 'antd';
import axios from "axios";

function Trending() {

  const [topdest, setDest] = useState([]);

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

  useEffect(() =>{
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/top-destinations`,
      )
      .then((response) => {
        setDest(response.data);
      })
      .catch((error) => {
        Modal.error({
          title: "Error",
          content: (
            <Card style={{ fontSize: "20px" }} bordered>
              <b>
                {error.message == "Request failed with status code 500"
                  ? "Internal Server Error"
                  : error.response.data.message === "Invalid token"
                  ? "Session Logged Out \n Please Login Again"
                  : error.response.data.message}
              </b>
            </Card>
          ),
          style: {
            top: "10%",
            left: "100px",
          },
        });
      });
  },[])

  console.log(topdest)
  
  return (
    <section id="trending" style={{ marginBottom: 0, minHeight: '100vh', paddingBottom: 0 }}>
      <div class="trending-heading">
        <h2>Trending</h2>
        <p>Trending Places for You...</p>
      </div>

      <div class="trending-box-container">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
          {topdest.map((item) => 
            <div class="swiper-slide">
              <div class="trending-box">
                <div class="t-b-img">
                  <Image src={Tour} alt="Tending Image"/>
                </div>

                <div class="t-b-text">
                  <a href="#"> {item.place_name} </a>
                  <span> {item.no_of_places} Places | {item.no_of_activities} Ativities </span>
                </div>

                <div class="price-book">
                  <span class="t-price"> {item.price_amount} INR </span>
                  <a href="/login" class="t-book"> Book Now </a>
                </div>

                <div class="agency-name">
                  <img src={GAC} alt="Agency Logo" />
                  <span> GAC </span>
                </div>
              </div>
            </div>
          )}
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}

export default Trending
