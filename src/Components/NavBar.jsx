import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [route, setRoute] = useState("");
  const navigate = useNavigate();
  const redirectPage = (routepath) => {
    setTimeout(() => {
      navigate(routepath);
    }, 1000);
  };
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">
          <img src="../images/ecommerce.png" width="45" height="45" alt="" /> E Admin
          Portal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              style={{ color: "#fff !important" }}
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="dashboard"
                  onClick={() => redirectPage("/dashboard")}
                >
                  Dashboard
                </a>
                <a
                  className="nav-link"
                  href="products"
                  onClick={() => redirectPage("/products")}
                >
                  Product
                </a>
                <a
                  className="nav-link"
                  href="/categories"
                  onClick={() => redirectPage("/categories")}
                >
                  Categories
                </a>
                <a
                  className="nav-link"
                  href="/blogs"
                  onClick={() => redirectPage("/blogs")}
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
