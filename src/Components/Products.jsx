import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Card,
  message,
  Image,
  Popconfirm,
  Upload,
} from "antd";

import { deleteData, getData, postData, updateData } from "../apiService";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [buttonToggle, setButtonToggle] = useState(true);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);
  const [image, setImage] = useState("");
  const [editBtn, setEditbtn] = useState(false);
  const [rowId, setRowId] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getProductData();
    getCategoryData();
  }, []);
  const getProductData = async () => {
    try {
      const response = await getData("/product");
      setProducts(response);
    } catch (error) {
      message.error(error.message);
    }
  };
  const getCategoryData = async () => {
    try {
      const response = await getData("/categories");
      setCategories(response);
    } catch (error) {
      message.error(error.message);
    }
  };
  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "countInStock", key: "countInStock" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Category", dataIndex: ["category", "name"], key: "category" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Number of Reviews", dataIndex: "numReviews", key: "numReviews" },
    {
      title: "Image",
      key: "image",
      render: (text, record) => (
        <div>
          <Button
            className="m-1"
            onClick={() => {
              openImageModal(`${record.image}`, record);
            }}
          >
            <FileImageOutlined />
          </Button>
          <Image
            // width={200}
            style={{
              display: "none",
            }}
            src=""
            preview={{
              visible,
              scaleStep,
              src: image,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <div className="row">
            <div className="col-md-4">
              <Button
                className="m-1"
                onClick={() => {
                  onclikEdit(record);
                }}
              >
                <EditOutlined />
              </Button>
            </div>
            <div className="col-md-4">
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this product?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  deleteProduct(record);
                }}
              >
                <Button className="m-1" danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </div>
          </div>
        </>
      ),
    },
  ];
  const openImageModal = (image, data) => {
    setImage("");
    setImage(image);
    setVisible(true);
  };
  const onFinish = async (values) => {
    debugger;
    try {
      if (!editBtn) {
        const respose = await postData("/product", values);
        debugger;
        if (respose.data.message == "Product created successfully") {
          alert("Product created successfully");
          form.resetFields();
          getProductData();
        } else {
          alert("Something Went Wrong!");
        }
      } else {
        debugger;
        values._id = rowId;
        const respose = await updateData(`/product/${rowId}`, values);
        if (respose.data.message == "Product updated successfully") {
          alert("Product updated successfully");
          form.resetFields();
          getProductData();
          onClickClose();
        } else {
          alert("Something Went Wrong");
        }
      }
    } catch (error) {
      // message.error("Something Went Wrong!");
      alert(error.message);
    }
  };
  const onclikEdit = (data) => {
    debugger;
    setEditbtn(true);
    setButtonToggle(false);
    setRowId(data._id);
    form.setFieldsValue({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category.id,
      countInStock: data.countInStock,
      rating: data.rating,
      numReviews: data.numReviews,
      image: data.image,
    });
  };
  const onClickClose = () => {
    setEditbtn(false);
    setButtonToggle(true);
    setRowId("");
    form.resetFields();
  };
  const deleteProduct = async (data) => {
    const RowId = data._id;
    try {
      const respose = await deleteData(`/product/${RowId}`, data);
      if (respose.data.message == "Product deleted successfully") {
        alert("Product deleted successfully");
        getProductData();
      } else {
        alert("Something Went Wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const pagination = {
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} entries`,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "15", "20"],
  };
  const handleCategory = (value, data) => {
    setSelectedCategory(value);
  };

  return (
    <div>
      <h2>Products</h2>

      {!editBtn ? (
        <>
          <Button
            style={{
              backgroundColor: "#212529",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginBottom: 16,
            }}
            type="primary"
            onClick={() => {
              setButtonToggle(!buttonToggle);
            }}
          >
            {buttonToggle ? "Add Product" : "View Product"}
          </Button>
        </>
      ) : (
        <>
          <Button
            style={{
              backgroundColor: "#212529",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginBottom: 16,
            }}
            type="primary"
            onClick={() => {
              onClickClose();
            }}
          >
            <CloseOutlined />
          </Button>
        </>
      )}

      {buttonToggle ? (
        <>
          <Card
            className="custom-card"
            title="Product List"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <Table
              columns={columns}
              dataSource={products}
              scroll={{ y: 400 }}
              pagination={pagination}
            />
          </Card>
        </>
      ) : (
        <Card
          className="custom-card"
          title={editBtn ? "Edit Product" : "Add Product"}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: "1000px", margin: "0 auto" }}
          >
            <Row gutter={16}>
              <Col span={8} className="mb-3">
                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product description!",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product price!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    {
                      
                      required: true,
                      message: "Please select the product category!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a category"
                    allowClear={true}
                    value={selectedCategory}
                    onChange={handleCategory}
                    showSearch
                  >
                    {categories.map((item) => (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="countInStock"
                  label="Stock"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product stock!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="rating"
                  label="Rating"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product rating!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="numReviews"
                  label="Number of Reviews"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product number of reviews!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={8} className="mb-3">
                <Form.Item
                  name="image"
                  label="Image"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the product Image!",
                    },
                  ]}
                >
                  {/* <Upload
                    beforeUpload={(file) => {
                      // Handle file upload logic here
                      return false; // Prevent automatic upload
                    }}
                    onChange={({ file }) => {
                      if (file.status === "done") {
                        message.success(
                          `${file.name} file uploaded successfully`
                        );
                      } else if (file.status === "error") {
                        message.error(`${file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button>Upload Image</Button>
                  </Upload> */}

                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    style={{ backgroundColor: "#212529", color: "#ffff" }}
                  >
                    {editBtn ? "Edit Product" : "Add Product"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default Products;
