import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretRight } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretRight,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function NewsForm() {
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [author, setAuthor] = useState("");
  const [authorTouched, setAuthorTouched] = useState(false);
  const [bodyState, setBodyState] = useState("");

  const [bodyStateTouched, setBodyStateTouched] = useState(false);

  const titleIsValid = title.trim() !== "";
  const titleInputIsInvalid = !titleIsValid && titleTouched;

  const authorIsValid = author.trim() !== "";
  const authorInputIsInvalid = !authorIsValid && authorTouched;

  const bodyStateIsValid = bodyState.trim() !== "";
  const bodyStateInputIsValid = !bodyStateIsValid && bodyStateTouched;

  let formIsValid = false;

  if (titleIsValid && authorIsValid && bodyStateIsValid) {
    formIsValid = true;
  }

  const titleInputBlurHandler = (event) => {
    setTitleTouched(true);
  };

  const authorInputBlurHandler = (event) => {
    setAuthorTouched(true);
  };

  const bodyStateInputBlurHandler = (event) => {
    setBodyStateTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setTitleTouched(true);

    if (!titleIsValid) {
      return;
    }

    setTitle("");
    setTitleTouched(false);
    setAuthor("");
    setAuthorTouched(false);
    setBodyState("");
    setAuthorTouched(false);
  };

  const titleInputClasses = titleInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const authorInputClasses = authorInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const bodyStateInputClasses = bodyStateInputIsValid
    ? "form-control invalid"
    : "form-control";

  const postNews = (e) => {
    e.preventDefault();

    const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;
    axios
      .post(`${baseURL}news`, {
        method: "POST",
        title,
        author,
        body: bodyState,
      })
      .then((res) => {
        console.log("Posting data", res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h5>Post News Item</h5>
      <form onSubmit={formSubmissionHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            //  onChange={nameInputChangeHandler}
            onBlur={titleInputBlurHandler}
            value={title}
            placeholder="Add a news title"
          />
          {titleInputIsInvalid && (
            <p className="text-danger">Title must not be empty.</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            className="form-control"
            type="text"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            //  onChange={nameInputChangeHandler}
            onBlur={authorInputBlurHandler}
            value={author}
            placeholder="Add a news author"
          />
          {authorInputIsInvalid && (
            <p className="text-danger">Author must not be empty.</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="news" className="form-label">
            News
          </label>
          <textarea
            className="form-control"
            type="text"
            id="bodyState"
            // id="news"
            onChange={(e) => setBodyState(e.target.value)}
            //  onChange={nameInputChangeHandler}
            onBlur={bodyStateInputBlurHandler}
            value={bodyState}
            placeholder="Add a news item"
          />
          {bodyStateInputIsValid && (
            <p className="text-danger">News body must not be empty.</p>
          )}
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            disabled={!formIsValid}
            onClick={(e) => {
              postNews(e);
              setBodyState();
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faCircleArrowRight}></FontAwesomeIcon>
            {/* Post News */}
          </button>
        </div>
      </form>
    </div>
  );
}
