import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import ImageCardSkeleton from "./ImageCardSkeleton";

export default function NewsImage({ match }) {
  const { id } = useParams();

  const [item, setItem] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;

  const url = `${baseURL}news/${id}/images`;

  const loadItems = async () => {
    const response = await axios
      .get(url)
      .then((response) => {
        setErrorMessage("");
        console.log(response.data);
        setItem(response.data);
        // console.log(item);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const deleteImage = (id, newsId) => {
    console.log(newsId, id);
    axios
      .delete(`${baseURL}news/${newsId}/images/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
        console.log(id, newsId);

        console.log("Deleted ::::", res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {errorMessage !== "" && (
        <h3 className="text-danger text-center">
          Oops! No images Found, Check your Url or Post an image
        </h3>
      )}
      <div>
        {item.image && isLoading ? <ImageCardSkeleton /> : null}
        {item.length > 0 ? (
          <Carousel key={item.id}>
            {item.map((item) => {
              const { id, newsId, image } = item;
              return (
                <Carousel.Item key={id}>
                  <img src={image} className="d-block w-100" />
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="position-absolute bottom-0 end-0"
                      onClick={() => deleteImage(id, newsId)}
                      style={{
                        cursor: "pointer",
                        zIndex: 3,
                        width: "30px",
                        height: "30px",
                        marginBottom: "5px",
                        marginRight: "5px",
                        color: "#e71f1fa6",
                      }}
                    ></FontAwesomeIcon>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : null}
      </div>
    </div>
  );
}
