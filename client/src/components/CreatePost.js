import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/post";

const CreatePost = ({ createPost, history }) => {
  const [text, setText] = useState("");
  return (
    <Fragment>
      <div className="heading">
        <h1>Post a Confession</h1>
      </div>
      <div className="create-post">
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createPost({ text });
              setText("");
              history.push("/");
            }}
          >
            <div class="form-group">
              <label htmlfor="add-post">
                <span className="text-primary"> Create a post</span>
              </label>

              <textarea
                className="form-control"
                rows="5"
                cols="30"
                id="add-post"
                placeholder="Create a post"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              <span className="fa fa-user-secret"></span> Post
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(CreatePost);
