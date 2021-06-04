import React, { useRef, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import GroupsChats from "../components/GroupsChats";
import ImageIcon from "@material-ui/icons/Image";
import { useSelector } from "react-redux";
import { selectGroupData } from "../features/groupSlice";
import database, { auth, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const Groupspage = () => {
  const groups = useSelector(selectGroupData);
  const textMessageRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const storageRef = storage;
  const [user] = useAuthState(auth);

  const submitData = (e) => {
    e.preventDefault();
    if (!textMessageRef) return alert("Plese enter the message...");
    database
      .collection("groups")
      .doc(groups.group_id)
      .collection("messages")
      .add({
        username: user.displayName,
        userphoto: user.photoURL,
        useremail: user.email,
        userid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: textMessageRef.current.value,
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storageRef
            .ref(`groupImages/${doc.id}`)
            .putString(imageToPost, "data_url");

          uploadTask.on(
            "STATE_CHANGED",
            null,
            (error) => alert(error.message),
            () => {
              storageRef
                .ref("groupImages")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  database
                    .collection("groups")
                    .doc(groups.group_id)
                    .collection("messages")
                    .doc(doc.id)
                    .set(
                      {
                        messageImage: url,
                      },
                      { merge: true }
                    );
                });
            }
          );
        }
      });
    textMessageRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const [messageData] = useCollection(
    database
      .collection("groups")
      .doc(groups.group_id)
      .collection("messages")
      .orderBy("timestamp")
  );

  // useEffect(() => {
  //   database
  //     .collection(groups)
  //     .doc(groups.group_id)
  //     .collection("messages")
  //     .orderBy("timestamp")
  //     .onSnapshot((snapshot) =>
  //       setgroupsMessageData(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  // }, []);

  return (
    <div className="bg-black h-screen flex flex-col w-full">
      <div className="bg-gray-800 sticky top-0 py-3 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <ArrowBackIcon className=" text-yellow-300" fontSize="large" />
            </Link>
            <h1 className="text-white ml-2 text-base font-semibold tracking-wider">
              Group chat
            </h1>
          </div>
          <h4 className="text-yellow-400 text-base font-semibold tracking-wider mr-2">
            {groups?.groupName}
          </h4>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-2 space-y-6">
        {messageData?.docs.map((doc) => (
          <GroupsChats
            key={doc.id}
            username={doc.data().username}
            email={doc.data().useremail}
            imgSrc={doc.data().messageImage}
            messageText={doc.data().message}
            senderPhoto={doc.data().userphoto}
          />
        ))}
      </div>
      <div className="p-2 mb-3">
        <form className="flex items-center sm:justify-center">
          <input
            ref={textMessageRef}
            type="text"
            placeholder="Message"
            className=" w-full sm:w-2/3 py-1 focus:outline-none focus:ring-1 rounded-lg focus:ring-pink-500 p-1 border-2 text-white border-pink-500 bg-gray-800 placeholder-pink-400"
          />

          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            id="file"
            onChange={addImageToPost}
            ref={filePickerRef}
            style={{ display: "none" }}
          />
          <h1>
            <label htmlFor="file" className="text-white text-sm px-1">
              <ImageIcon
                fontSize="large"
                className="text-pink-400 cursor-pointer"
              />
            </label>
          </h1>
          <button className="hidden" onClick={submitData}>
            some
          </button>
          <SendIcon
            onClick={submitData}
            className="text-pink-400"
            fontSize="large"
          />
        </form>
      </div>
    </div>
  );
};

export default Groupspage;
