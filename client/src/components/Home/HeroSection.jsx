import React from "react";
import JobImg from "../../assets/Job.jpg";
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "23,000",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "1000",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "10,000",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "21,000 ",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h2>Discover Opportunities, Fulfill Dreams:</h2>
          <h2>Your Job Search Starts Now</h2>
          <p>
            "Welcome to Your Career Gateway. Discover Your Next Opportunity Here.
            Find Your Dream Job Today. Explore Thousands of Opportunities.
            Unlock Your Potential with Our Job Search Platform. Take the Next
            Step in Your Career Journey with Us. Empowering You to Find the
            Perfect Job Fit. Start Your Search Now!"
          </p>
        </div>
        <div className="image">
          <img src={JobImg} alt="Job" />
        </div>
      </div>

      <div className="details">
        {details.map((elements) => {
          return (
            <div className="card" key={elements.id}>
              <div className="icon">{elements.icon}</div>
              <div className="content">
                <p>{elements.title}</p>
                <p>{elements.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
