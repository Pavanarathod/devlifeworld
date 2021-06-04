import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import SendIcon from "@material-ui/icons/Send";
import { useAuthState } from "react-firebase-hooks/auth";
import database, { auth } from "../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

const Comments = () => {
  const [user] = useAuthState(auth);
  const { post_id } = useParams();
  const [commentText, setCommentText] = useState("");
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    database
      .collection("posts")
      .doc(post_id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setCommentData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [post_id]);

  const addComment = (e) => {
    e.preventDefault();
    if (!commentText) return alert("Please enter the comment...");

    database
      .collection("posts")
      .doc(post_id)
      .collection("comments")
      .add({
        username: user.displayName,
        userImage: user.photoURL,
        userId: user.uid,
        commenText: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => alert(err.message));

    setCommentText("");
  };

  return (
    <div className="bg-black h-screen flex flex-col w-full">
      <div className="bg-gray-800 sticky top-0 py-3 p-2">
        <div className="flex items-center">
          <Link to="/">
            <ArrowBackIcon className=" text-yellow-300" fontSize="large" />
          </Link>
          <h4 className="text-yellow-400 ml-3">Comments</h4>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-2 space-y-6">
        <FlipMove>
          {commentData ? (
            commentData.map(
              ({ id, data: { username, userImage, commenText } }) => (
                <CommentList
                  key={id}
                  userName={username}
                  userPhoto={userImage}
                  comments={commenText}
                />
              )
            )
          ) : (
            <div className="flex justify-center">
              <h2 className="text-yellow-400">No comments yet</h2>
            </div>
          )}
        </FlipMove>
      </div>
      <div className="p-2">
        <form className="flex items-center">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            type="text"
            placeholder="Comment...."
            className="w-full py-1 focus:outline-none focus:ring-1 rounded-lg focus:ring-pink-500 p-1 border-2 text-white border-pink-500 bg-gray-800 placeholder-pink-400"
          />
          <button type="submit" onClick={addComment} className="hidden">
            submit
          </button>
          <SendIcon onClick={addComment} className="text-pink-400 ml-2" />
        </form>
      </div>
    </div>
  );
};

export default Comments;
