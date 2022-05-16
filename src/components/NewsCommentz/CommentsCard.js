import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import "../NewsCard.css";

export default function CommentsCard({ item }) {
  const { avatar, comment, createdAt, name, id, newsId } = item;

  const [data, setData] = useState([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [commentState, setCommentState] = useState(comment);

  const inputRef = useRef();

  var date = new Date(createdAt);
  var dt = date.toDateString();
  var time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;

  const url = `${baseURL}news/${newsId}/comments/${id}`;

  const deleteComments = () => {
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

  const updateComment = () => {
    axios
      .put(url, {
        method: "PUT",
        name,
        comment: commentState,
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
          defaultValue={commentState}
          onChange={(e) => setCommentState(e.target.value)}
          ref={inputRef}
        />
      </div>
    );
  };

  const renderDefaultView = () => {
    return <div>{comment} </div>;
  };

  return (
    <div className="container-lg" key={id}>
      <span>
        <img
          className="img"
          src={avatar}
          alt={name}
          height="80px"
          width="80px"
        />{" "}
      </span>
      <strong className="news__author">{name}</strong> <br />
      <span className="news__published">
        {dt} - {time}{" "}
      </span>{" "}
      <br />
      <span className="news__author">
        {isInEditMode ? renderEditView() : renderDefaultView()}
      </span>{" "}
      {toggle ? (
        <FontAwesomeIcon
          className="btn btn-primary mt-2"
          onClick={changeEditMode}
          icon={faPencil}
        ></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon
          className="btn btn-warning mt-2"
          onClick={changeEditMode}
          icon={faRectangleXmark}
        ></FontAwesomeIcon>
      )}{" "}
      {/* {!toggle && !isInEditMode ? ( */}
      {!toggle ? (
        <FontAwesomeIcon
          className="btn btn-success mt-2"
          onClick={() => updateComment()}
          icon={faCircleCheck}
        ></FontAwesomeIcon>
      ) : null}{" "}
      {!data.length > 0 ? (
        <FontAwesomeIcon
          className="btn btn-danger mt-2 "
          onClick={() => deleteComments()}
          icon={faTrashCan}
        ></FontAwesomeIcon>
      ) : null}
      <hr />
    </div>
  );
}
