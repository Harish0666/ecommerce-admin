import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, Card, message, Popconfirm } from "antd";
import { deleteData, getData, postData, updateData } from "../apiService";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [buttonToggle, setButtonToggle] = useState(true);
  const [form] = Form.useForm();

  const [editBtn, setEditbtn] = useState(false);
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    getCategoryData();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Icon", dataIndex: "icon", key: "icon" },
    { title: "Color", dataIndex: "color", key: "color" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
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
        </>
      ),
    },
  ];

  // const [columnDefs] = useState([
  //   { headerName: "Name", field: "name" },
  //   { headerName: "Icon", field: "icon" },
  //   { headerName: "Color", field: "color" },
  //   {
  //     headerName: "Actions", // Column header for buttons
  //     field: "actions",
  //     cellRendererFramework: (params) => (
  //       <>
  //         <div className="col-md-4">
  //           <Button
  //             className="m-1"
  //             onClick={() => {
  //               onclikEdit(params); // Use params for row data
  //             }}
  //           >
  //             <EditOutlined />
  //           </Button>
  //         </div>
  //         <div className="col-md-4">
  //           <Popconfirm
  //             title="Delete the product"
  //             description="Are you sure to delete this product?"
  //             okText="Yes"
  //             cancelText="No"
  //             onConfirm={() => {
  //               deleteProduct(params); // Use params for row data
  //             }}
  //           >
  //             <Button className="m-1" danger>
  //               <DeleteOutlined />
  //             </Button>
  //           </Popconfirm>
  //         </div>
  //       </>
  //     ),
  //   },
  // ]);

  const getCategoryData = async () => {
    try {
      const response = await getData("/categories");
      setCategories(response);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onclikEdit = (data) => {
    debugger;
    setEditbtn(true);
    setButtonToggle(false);
    setRowId(data._id);
    form.setFieldsValue({
      name: data.name,
      icon: data.icon,
      color: data.color,
    });
  };
  const onClickClose = () => {
    setEditbtn(false);
    setButtonToggle(true);
    setRowId("");
    form.resetFields();
  };

  const onFinish = async (values) => {
    debugger;
    if (!editBtn) {
      try {
        const respose = await postData("/categories", values);
        if (respose.data.message == "category created successfully") {
          alert("Category created successfully");
          form.resetFields();
          getCategoryData();
        } else {
          alert("Something Went Wrong!");
        }
      } catch (error) {
        alert.log(error);
      }
    } else {
      try {
        values.id = rowId;
        const respose = await updateData(`/categories/${rowId}`, values);
        if (respose.data.message == "Category updated successfully") {
          alert(respose.data.message);
          form.resetFields();
          getCategoryData();
          onClickClose();
        } else {
          alert("Something Went Wrong");
        }
      } catch (error) {
        alert.log(error);
      }
    }
  };

  const deleteProduct = async (data) => {
    debugger;
    const RowId = data._id;
    try {
      const respose = await deleteData(`/categories/${RowId}`, data);
      if (respose.data.message == "the category is deleted!") {
        alert("Category deleted successfully");
        getCategoryData();
      } else {
        alert("Something Went Wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const defaultColDef = {
    flex: 1,
  };
  const pagination = {
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} entries`,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "15", "20"],
  };
  return (
    <div>
      <h2>Categories</h2>
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
            {buttonToggle ? "Add Category" : "View Category"}
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
            title="Categories List"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            {/* <div
              className="ag-theme-alpine"
              style={{ height: 400, width: "100%" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={categories}
                defaultColDef={defaultColDef}
                pagination={true}
                // paginationPageSize={20}
                // paginationPageSizeOptions={[5, 10, 15]}
              />
            </div> */}

            <Table
              columns={columns}
              dataSource={categories}
              scroll={{ y: 400 }}
              pagination={pagination}
            />
          </Card>
        </>
      ) : (
        <>
          <Card
            className="custom-card"
            title={editBtn ? "Edit Category" : "Add Category"}
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
                    name="name"
                    label="Category Name"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the category name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="icon"
                    label="Category icon"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the category icon!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="color"
                    label="Category color"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the category color!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    style={{ backgroundColor: "#212529", color: "#ffff" }}
                  >
                    {editBtn ? "Edit Category" : "Add Category"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </>
      )}
    </div>
  );
};

export default Categories;
