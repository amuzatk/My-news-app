import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faIdBadge } from "@fortawesome/free-regular-svg-icons";

export default function NewsDetailCard({ item }) {
  const { title, body, author, createdAt, id } = item;

  const [data, setData] = useState([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [newsState, setNewsState] = useState(body);

  const inputRef = useRef();

  var date = new Date(createdAt);
  var dt = date.toDateString();
  var time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;

  const url = `${baseURL}news/${id}`;

  const imageUrl = `${baseURL}news/${id}/images`;

  const deleteNews = () => {
    axios
      .delete(url, {
        method: "DELETE",
      })
      .then((res) => {
        // alert("comment deleted!");
        console.log("Deleted ::::", res.data);
        window.location.reload();
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateNews = () => {
    axios
      .put(url, {
        method: "PUT",
        body: newsState,
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewsImages = (e) => {
    e.preventDefault();

    axios
      .post(imageUrl, {
        method: "POST",
        newsId: 1,
        image: "http://placeimg.com/640/480/food",
        // 'http://placeimg.com/640/480/nightlife',
        //  'http://placeimg.com/640/480/food'
        // "http://placeimg.com/640/480/people",
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeEditMode = () => {
    setIsInEditMode(!isInEditMode);
    setToggle(!toggle);
  };

  const renderEditView = () => {
    return (
      <div>
        <textarea
          style={{
            height: "200px",
            width: "400px",
          }}
          type="text"
          defaultValue={newsState}
          onChange={(e) => setNewsState(e.target.value)}
          ref={inputRef}
        />
      </div>
    );
  };

  const renderDefaultView = () => {
    return (
      <div>
        <p className="news__body">{body}</p>
      </div>
    );
  };

  return (
    <div className="container-lg ">
      <br />
      <h2 className="text-primary">{title}</h2>
      <span className="news__author">
        <strong>By:</strong> {author}
      </span>{" "}
      <br />
      <span className="news__author">
        {isInEditMode ? renderEditView() : renderDefaultView()}
      </span>{" "}
      <span className="news__published">
        {dt} - {time}{" "}
      </span>{" "}
      <br />
      {toggle ? (
        <FontAwesomeIcon
          className="btn btn-info mt-2"
          onClick={changeEditMode}
          icon={faPencil}
        ></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon
          className="btn btn-primary mt-2"
          onClick={changeEditMode}
          icon={faRectangleXmark}
        ></FontAwesomeIcon>
      )}{" "}
      {/* {!toggle && !isInEditMode ? ( */}
      {!toggle ? (
        <FontAwesomeIcon
          className="btn btn-success mt-2"
          onClick={() => updateNews()}
          icon={faCircleCheck}
        ></FontAwesomeIcon>
      ) : null}{" "}
      {!data.length > 0 ? (
        <FontAwesomeIcon
          className="btn btn-danger mt-2"
          onClick={() => deleteNews()}
          icon={faTrashCan}
        ></FontAwesomeIcon>
      ) : null}{" "}
      <FontAwesomeIcon
        onClick={(e) => {
          postNewsImages(e);
          //   setComment("");
        }}
        className="btn btn-primary  mt-2"
        icon={faIdBadge}
      ></FontAwesomeIcon>
    </div>
  );
}
