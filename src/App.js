import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { auth } from "./firebase";
import Comments from "./pages/Comments";
import Groupspage from "./pages/Groupspage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Profilepage from "./pages/Profilepage";

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;
  return (
    <BrowserRouter>
      {user ? (
        <div>
          <Switch>
            <Route path="/comments/:post_id">
              <Comments />
            </Route>
            <Route path="/posts">
              <Post />
            </Route>
            <Route path="/profile">
              <Profilepage />
            </Route>
            <Route path="/groupspage">
              <Groupspage />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
