import React, { useContext, useEffect, useState } from "react";
import ResumeModel from "./ResumeModel";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeimageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("/api/v1/application/employer/getall", { withCredentials: true })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
       axios
        .delete(`/api/v1/application/delete/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) => {
            prevApplication.filter((application) => application._id !== id);
          });
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h3>My Applications</h3>
            {applications && applications.length > 0 ? (
              applications.map((element) => (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))
            ) : (
              <h4>No Application Found</h4>
            )}
          </div>
        ) : (
          <div className="container">
            <h1>Applications From Job Seekers</h1>
            {applications && applications.length > 0 ? (
              applications.map((element) => (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              ))
            ) : (
              <h4>No Applications Found</h4>
            )}
          </div>
        )}
        {modalOpen && (
          <ResumeModel imageUrl={resumeimageUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span>
            {element.name}
          </p>
          <p>
            <span>Email:</span>
            {element.email}
          </p>
          <p>
            <span>Address:</span>
            {element.address}
          </p>
          <p>
            <span>PhoneNumber:</span>
            {element.phone}
          </p>
          <p>
            <span>CoverLetter:</span>
            {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>

        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({element, openModal}) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span>
            {element.name}
          </p>
          <p>
            <span>Email:</span>
            {element.email}
          </p>
          <p>
            <span>Address:</span>
            {element.address}
          </p>
          <p>
            <span>PhoneNumber:</span>
            {element.phone}
          </p>
          <p>
            <span>CoverLetter:</span>
            {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
