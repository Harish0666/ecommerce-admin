import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, Card, Image,Popconfirm } from "antd";
import { deleteData, getData, postData, updateData } from "../apiService";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";

const Blogs = () => {
  const [buttonToggle, setButtonToggle] = useState(true);
  const [form] = Form.useForm();
  const [editBtn, setEditbtn] = useState(false);
  const [rowId, setRowId] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);
  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    try {
      const response = await getData("/blogs");
      setBlogData(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const onclikEdit = (data) => {
    setEditbtn(true);
    setButtonToggle(false);
    setRowId(data._id);
    form.setFieldsValue({
      title: data.title,
      content: data.content,
      image: data.image,
      author: data.author,
    });
  };
  const onClickClose = () => {
    setEditbtn(false);
    setButtonToggle(true);
    setRowId("");
    form.resetFields();
  };
  const deleteBlog = async (data) => {
    const RowId = data._id;
    try {
      const respose = await deleteData(`/blogs/${RowId}`, data);
      if (respose.data.message == "Blog deleted") {
        alert(respose.data.message);
        getBlogData();
      } else {
        alert("Something Went Wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onFinish = async (values) => {
    if (!editBtn) {
      try {
        const respose = await postData("/blogs", values);
        if (respose.data.message == "Blog created successfully") {
          alert(respose.data.message);
          form.resetFields();
          getBlogData();
        } else {
          alert("Something Went Wrong!");
        }
      } catch (error) {
        alert.log(error.message);
      }
    } else {
      try {
        values.id = rowId;
        const respose = await updateData(`/blogs/${rowId}`, values);
        if (respose.data.message == "Blog updated successfully") {
          alert(respose.data.message);
          form.resetFields();
          getBlogData();
          onClickClose();
        } else {
          alert("Something Went Wrong");
        }
      } catch (error) {
        alert.log(error);
      }
    }
  };

  const columns = [
    { title: "Blog Title", dataIndex: "title", key: "title" },
    { title: "Blog Content", dataIndex: "content", key: "content" },
    { title: "Blog Author", dataIndex: "author", key: "author" },
    {
      title: "Blog Image",
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
                title="Delete the blog"
                description="Are you sure to delete this blog?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                    deleteBlog(record);
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

  const pagination = {
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} entries`,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "15", "20"],
  };

  const openImageModal = (image, data) => {
    setImage("");
    setImage(image);
    setVisible(true);
  };
  return (
    <div>
      <h2>Blogs</h2>
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
            {buttonToggle ? "Add Blog" : "View Blog"}
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
            title="Blog List"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <Table
              columns={columns}
              dataSource={blogData}
              scroll={{ y: 400 }}
              pagination={pagination}
            />
          </Card>
        </>
      ) : (
        <>
          <Card
            className="custom-card"
            title={editBtn ? "Edit Blog" : "Add Blog"}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: "1000px", margin: "0 auto" }}
            >
              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="title"
                    label="Blog Title"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the Blog Title!",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="content"
                    label="Blog content"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the Blog content!",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="image"
                    label="Blog image"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the Blog image!",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="author"
                    label="Blog author"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the Blog author!",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      style={{ backgroundColor: "#212529", color: "#ffff" }}
                    >
                      {editBtn ? "Edit Blog" : "Add Blog"}
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Card>
        </>
      )}
    </div>
  );
};

export default Blogs;
