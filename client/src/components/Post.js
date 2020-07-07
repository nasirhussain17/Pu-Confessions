import React, { useEffect, Fragment, useState } from "react";
import { getPosts, sortPost } from "../actions/post";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Moment from "react-moment";
import createPagination from "../helpers/createPagination";

const PostItem = ({ post: { _id, text, date } }) => {
  return (
    <Fragment>
      <div className="container">
        <div class="post-items">
          <h4>
            Date Posted: <Moment format="D MMM YYYY HH:mm">{date}</Moment>
          </h4>
          <p>{text}</p>
        </div>
      </div>
    </Fragment>
  );
};
const Post = ({ getPosts, post: { posts, loading }, sortPost }) => {
  const [toggle, setToggle] = useState(1);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [currentPage, setCurrentPage] = React.useState(1);

  const { pagination } = createPagination({
    numberOfArticles: posts.length,
    articlesPerPage: 5,
    numberOfButtons: 4,
    currentPage,
  });
  // Get current posts
  const indexOfLastPost = currentPage * 5;
  const indexOfFirstPost = indexOfLastPost - 5;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleClick = (page) => setCurrentPage(page);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="heading">
        <h1>Welcome to the Pondicherry University Confession Page</h1>
      </div>
      <div class="post">
        <div class="sort">
          <button
            class="btn btn-secondary btn-md"
            onClick={(e) => {
              sortPost(toggle);
              setToggle(toggle * -1);
            }}
          >
            Sort by Date <span class="fa fa-sort"></span>
          </button>
        </div>
        {currentPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <div className="pagination">
        <ul>
          <li
            className={`${pagination[0] === currentPage && "disabled"}`}
            onClick={handleClick.bind(null, currentPage - 1)}
          >
            Prev
          </li>
          {pagination.map((page) => (
            <li
              className={`${currentPage === page && "active"}`}
              onClick={handleClick.bind(null, page)}
            >
              {page}
            </li>
          ))}
          <li
            className={`${
              pagination.reverse()[0] === currentPage && "disabled"
            }`}
            onClick={handleClick.bind(null, currentPage + 1)}
          >
            Next
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  sortPost: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts, sortPost })(Post);
