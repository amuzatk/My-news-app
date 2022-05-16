import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

import NewsForm from "./NewsForm";
import CardSkeleton from "./CardSkeleton";

const { Meta } = Card;

function News(props) {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  let limit = 12;
  let totalCount = 90;

  const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;

  const url = `${baseURL}news?page=1&limit=${limit}`;
  useEffect(() => {
    const getAllNews = async () => {
      const response = await axios
        .get(url)
        .then((response) => {
          setErrorMessage("");
          console.log(response);
          setItem(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error);
        });
    };
    setPageCount(Math.ceil(totalCount / limit));
    getAllNews();
  }, []);

  const getPaginatedNews = async (currentPage) => {
    const res = await axios.get(
      `${baseURL}news?page=${currentPage}&limit=${limit}`
    );

    const data = await res.data;
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const newsFormServer = await getPaginatedNews(currentPage);
    setItem(newsFormServer);
  };

  return (
    <div className="news-block">
      <div className="row justify-content-center align-item-center">
        <h1 className=" text-center mt-2">News App 👋</h1>

        <NewsForm />

        {errorMessage !== "" && (
          <h3 className="text-danger text-center">Oops! Please try again</h3>
        )}

        {isLoading && <CardSkeleton cards={3} />}
        {item.length > 0 ? (
          <div key={item.id} className="row m-2">
            {item.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="col-11 col-md-6 col-lg-3 mx-0 mb-4"
                >
                  <div className="card p-0 overflow-hidden h-100 shadow">
                    <div className="card-body bg-info border border-0 ">
                      <h4 className="card-subtitle mb-2 text-primary text-center">
                        {item.title}{" "}
                      </h4>
                      <p className="more"> {item.body + "..."} </p>
                      <div className="text-center">
                        <Link to={`/${item.id}`} target="_blank">
                          <FontAwesomeIcon
                            icon={faFileLines}
                            className="btn btn-danger"
                            style={{
                              color: "#fff",
                              background: "#2f261cdb",
                              border: "#f004b5b0",
                            }}
                          ></FontAwesomeIcon>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={6}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default News;
