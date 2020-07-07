import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header id="home">
        <nav className="navbar navbar-expand-lg">
          <Link to="/" className="navbar-brand">
            Pu Confessions
          </Link>

          <span className="ml-auto">
            <Link to="/create-post">
              <button className="btn btn-primary">
                <span className="fa fa-pencil-alt"></span> Post
              </button>
            </Link>
          </span>
        </nav>
      </header>
    </Fragment>
  );
};
export default Header;
