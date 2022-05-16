import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import CommentsCard from "./CommentsCard";
import CommentsAdd from "./CommentsAdd";
import logo from "./comment_img.png";

export default function CommentsGroup({ match }) {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadItem();
    console.log(item);
  }, []);

  const loadItem = async () => {
    const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;
    const url = `${baseURL}news/${id}/comments`;
    console.log("url=", url);

    const item = await axios
      .get(url)
      .then((response) => {
        setErrorMessage("");
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  };
  console.log("item2=", item);

  return (
    <div>
      {errorMessage !== "" && (
        <h3 className="text-danger text-center">
          Oops! No Comment at the moment, please try later
        </h3>
      )}
      <span>
        <p className="ms-2">Comment Sample</p>
        <img
          className="img ms-2"
          src={logo}
          alt=""
          height="80px"
          width="80px"
        />{" "}
      </span>
      <hr />

      {item.length > 0 ? (
        <div key={item.id}>
          {item.map((item) => {
            return <CommentsCard item={item} key={item.id} />;
          })}
        </div>
      ) : null}
      <CommentsAdd />
    </div>
  );
}
