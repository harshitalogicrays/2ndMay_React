import React from "react";

const Slider = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src={require("../assets/images/a.jpg")}
            class="d-block w-100"
            style={{ height: "250px" }}
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src={require("../assets/images/b.jpg")}
            class="d-block w-100"
            style={{ height: "250px" }}
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src={require("../assets/images/d.jpg")}
            class="d-block w-100"
            style={{ height: "250px" }}
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
