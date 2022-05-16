import React, { useState, useRef } from "react";
import axios from "axios";
import { Card, Button } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretRight } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretRight,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
// import CommentsAddCard from "../CommentsAddCard";

const { Meta } = Card;

export default function CommentsAdd(props) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [commentTouched, setCommentTouched] = useState(false);
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const commentIsValid = comment.trim() !== "";
  const commentInputIsInvalid = !commentIsValid && commentTouched;

  const nameIsValid = name.trim() !== "";
  const nameInputIsInvalid = !nameIsValid && nameTouched;

  let formIsValid = false;

  if (commentIsValid && nameIsValid) {
    formIsValid = true;
  }

  const commentInputBlurHandler = (event) => {
    setCommentTouched(true);
  };

  const nameInputBlurHandler = (event) => {
    setNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setCommentTouched(true);

    if (!commentIsValid) {
      return;
    }
    // console.log(title);

    setComment("");
    setCommentTouched(false);
    setName("");
    setNameTouched(false);
  };

  const postComments = (e) => {
    e.preventDefault();

    const baseURL = `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/`;
    axios
      .post(`${baseURL}news/${id}/comments`, {
        method: "POST",
        name,
        comment,
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
        setComment("");
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={formSubmissionHandler}>
        <br />
        <div className="mb-3">
          <label htmlFor="name" className="form-label ms-3">
            Name
          </label>
          <input
            className="form-control"
            placeholder="Add a name..."
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={nameInputBlurHandler}
          />
          {/* {nameInputIsInvalid && (
            <p className="text-danger">Name must not be empty.</p>
          )} */}
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label ms-3">
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            // required
            value={comment}
            className="form-control"
            placeholder="Add a new comment..."
            onChange={(e) => setComment(e.target.value)}
            onBlur={commentInputBlurHandler}
          />
          {/* {commentInputIsInvalid && (
            <p className="text-danger">Comment must not be empty.</p>
          )} */}
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            disabled={!formIsValid}
            onClick={(e) => {
              postComments(e);
            }}
          >
            {" "}
            {/* <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon> */}
            <FontAwesomeIcon icon={faCircleArrowRight}></FontAwesomeIcon>
            {/* Post Comment */}
          </button>
        </div>
      </form>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function NewsForm() {
//   const [title, setTitle] = useState("");
//   const [titleTouched, setTitleTouched] = useState(false);
//   const [author, setAuthor] = useState("");
//   const [authorTouched, setAuthorTouched] = useState(false);
//   const [bodyState, setBodyState] = useState("");

//   const [bodyStateTouched, setBodyStateTouched] = useState(false);

// const titleIsValid = title.trim() !== "";
// const titleInputIsInvalid = !titleIsValid && titleTouched;

//   const authorIsValid = author.trim() !== "";
//   const authorInputIsInvalid = !authorIsValid && authorTouched;

//   const bodyStateIsValid = bodyState.trim() !== "";
//   const bodyStateInputIsValid = !bodyStateIsValid && bodyStateTouched;

// let formIsValid = false;

// if (titleIsValid && authorIsValid && bodyStateIsValid) {
//   formIsValid = true;
// }

// const titleInputBlurHandler = (event) => {
//   setTitleTouched(true);
// };

//   const authorInputBlurHandler = (event) => {
//     setAuthorTouched(true);
//   };

//   const bodyStateInputBlurHandler = (event) => {
//     setBodyStateTouched(true);
//   };

// const formSubmissionHandler = (event) => {
//   event.preventDefault();

//   setTitleTouched(true);

//   if (!titleIsValid) {
//     return;
//   }
//   // console.log(title);

//   setTitle("");
//   setTitleTouched(false);
//   setAuthor("");
//   setAuthorTouched(false);
//   setBodyState("");
//   setAuthorTouched(false);
// };

//   const titleInputClasses = titleInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   const authorInputClasses = authorInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   const bodyStateInputClasses = bodyStateInputIsValid
//     ? "form-control invalid"
//     : "form-control";

//   const postNews = (e) => {
//     e.preventDefault();
//     axios
//       .post("https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news", {
//         method: "POST",
//         title,
//         author,
//         body: bodyState,
//       })
//       .then((res) => {
//         console.log("Posting data", res);
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div>
//       <h5>Post News Item</h5>
//       <form onSubmit={formSubmissionHandler}>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Title
//           </label>
//           <input
//   className="form-control"
//   type="text"
//   id="title"
//   onChange={(e) => setTitle(e.target.value)}
//   //  onChange={nameInputChangeHandler}
//   onBlur={titleInputBlurHandler}
//   value={title}
//   placeholder="Add a news title"
// />
// {titleInputIsInvalid && (
//   <p className="error-text">Title must not be empty.</p>
// )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="author" className="form-label">
//             Author
//           </label>
//           <input
//             className="form-control"
//             type="text"
//             id="author"
//             onChange={(e) => setAuthor(e.target.value)}
//             //  onChange={nameInputChangeHandler}
//             onBlur={authorInputBlurHandler}
//             value={author}
//             placeholder="Add a news author"
//           />
//           {authorInputIsInvalid && (
//             <p className="error-text">Author must not be empty.</p>
//           )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="news" className="form-label">
//             News
//           </label>
//           <textarea
//             className="form-control"
//             type="text"
//             id="bodyState"
//             // id="news"
//             onChange={(e) => setBodyState(e.target.value)}
//             //  onChange={nameInputChangeHandler}
//             onBlur={bodyStateInputBlurHandler}
//             value={bodyState}
//             placeholder="Add a news item"
//           />
//           {bodyStateInputIsValid && (
//             <p className="error-text">News body must not be empty.</p>
//           )}
//         </div>

// <div className="form-actions">
//   <button
//     className="btn btn-primary"
//     disabled={!formIsValid}
//     onClick={(e) => {
//       postNews(e);
//       setBodyState();
//     }}
//   >
//     {" "}
//     Post News
//   </button>
// </div>
//       </form>
//     </div>
//   );
// }

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { Card, Button } from "antd";
// import { useParams } from "react-router-dom";
// // import CommentsAddCard from "../CommentsAddCard";

// const { Meta } = Card;

// export default function CommentsAdd(props) {
//   const { id } = useParams();
//   const [comment, setComment] = useState("");
//   const [name, setName] = useState("");

//   const postComments = (e) => {
//     e.preventDefault();

//     axios
//       .post(
//         `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`,
//         {
//           method: "POST",

//           name,
//           comment,
//         }
//       )

//       .then((data) => {
//         console.log(data);
//         window.location.reload();
//         setComment("");
//         setName("");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // console.log(id);

//   return (
//     <div>
//       {/* <CommentsAddCard item={props} /> */}
//       {/* <strong> Comments </strong> */}
//       <form>
//         <br />
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             className="form-control"
//             placeholder="Add a name"
//             type="text"
//             required
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Comment</label>
//           <textarea
//             name="comment"
//             required
//             value={comment}
//             className="form-control"
//             placeholder="Add a new comment"
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           {/* <label className="form-label">Button</label> */}
//           <button
//             onClick={(e) => {
//               postComments(e);
//             }}
//             className="btn btn-info"
//           >
//             Post Comment
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
