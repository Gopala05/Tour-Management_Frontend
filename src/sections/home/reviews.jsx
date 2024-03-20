import React, { useEffect, useState } from "react";
import user from "../../assets/Icons/user.png";
import FeedBack from "../../assets/feedback.jpeg";
import { Image } from "antd";
import axios from "axios";

function Reviews() {
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
      if (swiper && swiper.destroy) {
        swiper.destroy(true, true);
      }
    };
  }, []);
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/feedbacks`)
      .then((response) => {
        setDest(response.data.details);
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
  }, []);

  const generateRatingStars = (rating) => {
    const clampedRating = Math.min(5, Math.max(0, rating));
    const filledStars = Math.floor(clampedRating);

    // Generate the HTML for filled stars
    const filledStarsHtml = Array.from({ length: filledStars }, (_, index) => (
      <i key={index} className="fas fa-star"></i>
    ));

    // If there is a partially filled star, add it
    const halfStarHtml =
      clampedRating > filledStars ? (
        <i className="fas fa-star-half-alt"></i>
      ) : null;

    // Generate the HTML for empty stars
    const emptyStarsHtml = Array.from(
      { length: 5 - filledStars - (halfStarHtml ? 1 : 0) },
      (_, index) => (
        <i key={index + filledStars + 1} className="far fa-star"></i>
      )
    );

    return (
      <span className="rating-stars" style={{ fontSize:'1.5rem', marginBottom: 0 }}>
        {filledStarsHtml}
        {halfStarHtml}
        {emptyStarsHtml}
      </span>
    );
  };

  return (
    <section
      id="reviews"
      style={{ marginBottom: 0, minHeight: "100vh", paddingBottom: 0 }}
    >
      <div class="trending-heading">
        <h2>Reviews and Testimonials</h2>
      </div>

      <div class="trending-box-container">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            {topdest.map((item) => (
              <div class="swiper-slide" key={item.id}>
                <div class="trending-box">
                  <div class="t-b-img">
                    <Image src={FeedBack} alt="Feedback Image" />
                  </div>

                  <div class="t-b-text" style={{ marginBottom:0 }}>
                    {generateRatingStars(item.rating)}
                  </div>

                  <div class="price-book" style={{ overflowY: 'auto', height: '150px' }}>
                    <span class="t-price" style={{ fontSize: '1rem' }}>
                      {item.feedback_text}
                    </span>
                  </div>

                  <div class="agency-name">
                    <img src={user} alt="Agency Logo" />
                    <span> {item.user_name} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
