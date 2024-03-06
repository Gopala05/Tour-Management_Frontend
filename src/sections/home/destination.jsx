import React, { useEffect } from 'react';
import dest1 from '../../assets/Destination Places/Badami.jpg';
import dest2 from '../../assets/Destination Places/Coorg.jpg';

function destination() {

  return (
    <section id="destination">
      <div class="destination-heading">
        <h2>Top Destinations</h2>
        <p>Our Top Destinations...</p>
      </div>

      <div class="destination-grid">
        <div class="destination-box d-b-1">
          <img src={dest1} alt="Destination Image 1" />

          <div class="d-b-text-container">
            <span class="ratio"> 3.5 </span>
            <div class="d-b-text">
              <strong> Vientam </strong>
              <span> Waterfall </span>
            </div>
          </div>
        </div>

        <div class="destination-box d-b-2">
          <img src={dest2} alt="Destination Image 2" />

          <div class="d-b-text-container">
            <span class="ratio"> 4.2 </span>
            <div class="d-b-text">
              <strong> Coorg </strong>
              <span> Grass Land </span>
            </div>
          </div>
        </div>

        <div class="destination-box d-b-3">
          <img src={dest1} alt="Destination Image 3" />

          <div class="d-b-text-container">
            <span class="ratio"> 3.5 </span>
            <div class="d-b-text">
              <strong> Vientam </strong>
              <span> Waterfall </span>
            </div>
          </div>
        </div>

        <div class="destination-box d-b-4">
          <img src="/images/d-4.webp" alt="Destination Image 4" />

          <div class="d-b-text-container">
            <span class="ratio"> 3.5 </span>
            <div class="d-b-text">
              <strong> Vientam </strong>
              <span> Waterfall </span>
            </div>
          </div>
        </div>

        <div class="destination-box d-b-5">
          <img src="/images/d-5.jpg" alt="Destination Image 5" />

          <div class="d-b-text-container">
            <span class="ratio"> 3.5 </span>
            <div class="d-b-text">
              <strong> Vientam </strong>
              <span> Waterfall </span>
            </div>
          </div>
        </div>

        <div class="destination-box d-b-6">
          <img src="/images/d-6.webp" alt="Destination Image 6" />

          <div class="d-b-text-container">
            <span class="ratio"> 3.5 </span>
            <div class="d-b-text">
              <strong> Vientam </strong>
              <span> Waterfall </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default destination
