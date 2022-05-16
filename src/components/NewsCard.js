import React from "react";
import "./NewsCard.css";
import { Link } from "react-router-dom";

const NewsCard = ({ item }) => {
  if (!item.title) return null;
  return (
    <div className="news">
      <h1 className="news__title">{item.title}</h1>
      <span className="news__author">{item.author}</span> <br />
      <span className="news__published">{item.createdAt}</span> <br />
      <Link to={`/${item.id}`} target="_blank">
        Read More
      </Link>
    </div>
  );
};

export default NewsCard;
