import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Post} />
            <Route path="/create-post" component={CreatePost} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
