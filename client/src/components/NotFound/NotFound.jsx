import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImg from "../../assets/NotFound.jpg"

const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src={NotFoundImg} alt="notfound"/>
        <Link to={"/"}>Return To Home</Link>
      </div>
    </section>
  )
}

export default NotFound