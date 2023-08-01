import { Link } from "react-router-dom";
import "./profileCard.scss";
import DeletePop from "../profile/DeletePop";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileCard = ({ data }) => {
  const id = data._id;

  // console.log(user.user.isAdmin);
  return (
    <div className="profileCard">
      <Link
        to={`/viewProfile/${id}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <p className="view">view profile</p>
      </Link>
      <div className="img">
        <img
          src={
            data.img
              ? data.img
              : "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?size=626&ext=jpg"
          }
          alt=""
        />
      </div>
      <div className="info">
        <span>{data.name}</span>
        <p>{data.course}</p>

        
      </div>
    </div>
  );
};

export default ProfileCard;
