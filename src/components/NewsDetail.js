import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import CommentsGroup from "./NewsCommentz/CommentsGroup";
import NewsDetailCard from "./NewsDetailCard";
import NewsImage from "./Images/NewsImage";

const { Meta } = Card;

function NewsDetail({ match }) {
  const [item, setItem] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    loadItem();
    console.log(match);
  }, []);

  const loadItem = async () => {
    const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;

    const url = `${baseURL}news/${match.params.id}`;
    console.log("url=", url);
    const item = await axios
      .get(url)
      .then((response) => {
        setError("");
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  console.log("item=", item);

  return !item.id ? null : (
    <CardGroup
      className="mb-3 mt-3 ms-3  "
      border="primary"
      style={{ width: "82rem" }}
    >
      {error !== "" && <h3>Oops! Please try reloading again</h3>}
      <Card>
        <NewsImage />
        <NewsDetailCard key={item.id} item={item} />
      </Card>
      <Card>
        <CommentsGroup />
      </Card>
    </CardGroup>
  );
}

export default NewsDetail;
