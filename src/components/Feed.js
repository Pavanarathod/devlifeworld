import React from "react";
import database from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

import Posts from "./Posts";

const Feed = () => {
  const userPosts = database.collection("posts").orderBy("timestamp", "desc");

  const [posts] = useCollection(userPosts);

  return (
    <div className="px-3 py-2 mt-3 ">
      <div className="space-y-4">
        {posts?.docs.map((doc) => (
          <Posts
            key={doc.id}
            id={doc.id}
            username={doc.data().username}
            userPhoto={doc.data().userPhoto}
            imageUrl={doc.data().postImageUrl}
            caption={doc.data().imageCaptin}
            timestamp={doc.data().timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
