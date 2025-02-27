import React, { useEffect, useState } from "react";
import { Card, Col, Flex, Row } from "antd";
import "./Dashboard.css";
import { getData } from "../apiService";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    getProductData();
    getCategoryData();
    getBlogData();
  }, []);

  

  const getProductData = async () => {
    try {
      const response = await getData("/product");
      setProducts(response);
    } catch (error) {
      alert(error.message);
    }
  };
  const getCategoryData = async () => {
    try {
      const response = await getData("/categories");
      setCategories(response);
    } catch (error) {
      alert(error.message);
    }
  };
  const getBlogData = async () => {
    try {
      const response = await getData("/blogs");
      setBlogData(response);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} className="mb-2">
          <Card
            title="Total Sales"
            className="custom-card"
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <a href="" style={{ textDecoration: "none" }}>
                  <h2>2000</h2>
                </a>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="../images/sales.png" width="45" height="45" alt="" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} className="mb-2">
          <Card
            className="custom-card"
            title="Orders Today"
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <a href="" style={{ textDecoration: "none" }}>
                  <h2>150</h2>
                </a>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="../images/orders.png" width="45" height="45" alt="" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} className="mb-2">
          <Card
            className="custom-card"
            title="New Users"
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <a href="" style={{ textDecoration: "none" }}>
                  <h2>30</h2>
                </a>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="../images/user.png" width="45" height="45" alt="" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} className="mb-2">
          <Card
            className="custom-card"
            title="Total Product"
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <a href="/products" style={{ textDecoration: "none" }}>
                  <h2> {products.length}</h2>
                </a>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="../images/product.png"
                  width="45"
                  height="45"
                  alt=""
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} className="mb-2">
          <Card
            className="custom-card"
            title="Total Categories"
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <a href="/categories" style={{ textDecoration: "none" }}>
                  <h2> {categories.length}</h2>
                </a>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="../images/category.png"
                  width="45"
                  height="45"
                  alt=""
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} className="mb-2">
          <Card
            className="custom-card"
            title="Total Blogs"
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="row">
              <div className="col-md-6">
                <a href="/blogs" style={{ textDecoration: "none" }}>
                  <h2> {blogData.length}</h2>
                </a>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="../images/blog.png" width="45" height="45" alt="" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
