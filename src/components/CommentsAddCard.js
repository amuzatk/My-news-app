// import React, { useState } from "react";

// export default function CommentsAddCard(props) {

//   let postComments;

//   const [comment, setComment] = useState("");
//   const [name, setName] = useState("");

//   return (
//     <div>
//       <strong> Comments </strong>
//       <form>
//         <br />
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           required
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         />

//         <br />
//         <label htmlFor="comment">Comment</label>
//         <textarea
//           name="comment"
//           required
//           className="form-control"
//           placeholder="Add a new comment"
//           onChange={(e) => setComment(e.target.value)}
//           value={comment}
//         />
//         <label>Button</label>
//         <button
//           onClick={(e) => {
//             postComments(e);
//             setComment("");
//           }}
//           className="btn btn-primary"
//         >
//           Post Comment
//         </button>
//       </form>
//     </div>
//   );
// }
