import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/api/v1/job/getmyjobs", {
          withCredentials: true,
        });
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function for editing jobs
  //Enable
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //Disable
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const upadtedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`/api/v1/job/update/${jobId}`, upadtedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Delete function for job editing
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`/api/v1/job/delete/${jobId}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => [toast.error(error.response.data.message)]);
  };

  //Input change for job editing
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>Country:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>City:</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>Category:</span>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="Backend Web Development">
                                Backend Web Development
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Account & Finance">
                                Account & Finance
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                              <option value="Game Development">
                                Game Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                            </select>
                          </div>

                          <div>
                            <span>
                              Salary:
                              {element.fixedSalary ? (
                                <input
                                  type="number"
                                  value={element.fixedSalary}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "fixedSalary",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                />
                              ) : (
                                <div>
                                  <input
                                    type="number"
                                    value={element.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryFrom",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                  />

                                  <input
                                    type="number"
                                    value={element.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryTo",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                  />
                                </div>
                              )}
                            </span>
                          </div>
                          <div>
                            <span>Expired:</span>
                            <select
                              type="number"
                              value={element.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>
                        </div>
                        <div className="long_field">
                          <div>
                            <span>Description:</span>
                            <textarea
                              rows="3"
                              value={element.description}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "description",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            ></textarea>
                          </div>

                          <div>
                            <span>Location:</span>
                            <textarea
                              rows="3"
                              value={element.location}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="button_wrapper">
                        <div className="edit_btn_wrapper">
                          {editingMode === element._id ? (
                            <>
                              <button
                                onClick={() => handleUpdateJob(element._id)}
                                className="check_btn"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleDisableEdit()}
                                className="cross_btn"
                              >
                                <RxCross2 />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEnableEdit(element._id)}
                              className="edit_btn"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteJob(element._id)}
                          className="delete_btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>
              You have not posted any job or may you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
