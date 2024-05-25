import React from "react";
import { FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";
import { SiBmw, SiTcs } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Google",
      location: "Bennigana Halli, Bengaluru, Karnataka 560016",
      openPositions: 10,
      icon: <FaGoogle />,
    },
    {
      id: 2,
      title: "Microsoft",
      location: "DLF Downtown,Gurugram 122002",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 3,
      title: "TCS",
      location: "Raveline Street, Fort, Mumbai - 400001 Maharashtra ",
      openPositions: 10,
      icon: <SiTcs />,
    },
    {
      id: 4,
      title: "Apple",
      location: "Vittal Mallya Rd, Bengaluru, 560001",
      openPositions: 15,
      icon: <FaApple />,
    },
    {
      id: 5,
      title: "BMW",
      location: "Kachadimangalam, Tamil Nadu 603002",
      openPositions: 5,
      icon: <SiBmw />,
    },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>POPULAR COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.subTitle}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
