import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Space, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "../style/ShrinkSleeve.css"; // Import CSS file for styling

const ShrinkSleeveList = () => {
  const [shrinkSleeves, setShrinkSleeves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchShrinkSleeves();
  }, []);

  const fetchShrinkSleeves = async () => {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      throw new Error("No token available");
    }

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        "http://localhost:5000/shrinksleeves",
        config
      );
      setShrinkSleeves(response.data);
      console.log("shr", response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching shrink sleeves data");
      setLoading(false);
    }
  };

  const confirmDelete = async (shrinkSleeveId) => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <DeleteOutlined />,
      content: "You won't be able to revert this!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteShrinkSleeve(shrinkSleeveId);
      },
    });
  };

  const deleteShrinkSleeve = async (shrinkSleeveId) => {
    setDeleteLoading(true);
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      throw new Error("No token available");
    }

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(
        `http://localhost:5000/shrinksleeves/${shrinkSleeveId}`,
        config
      );
      fetchShrinkSleeves(); // After deleting the shrink sleeve, refetch the data
      message.success("Shrink Sleeve deleted successfully");
    } catch (error) {
      message.error("Error deleting shrink sleeve");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "PN",
      dataIndex: "pn",
      key: "pn",
    },
    {
      title: "Supplied Diameter",
      dataIndex: "suppliedDiameter",
      key: "suppliedDiameter",
    },
    {
      title: "Recovered Diameter",
      dataIndex: "recoveredDiameter",
      key: "recoveredDiameter",
    },
    {
      title: "dNet",
      dataIndex: "dNet",
      key: "dNet",
    },
    {
      title: "VarMin",
      dataIndex: "varMin",
      key: "varMin",
    },
    {
      title: "VarMax",
      dataIndex: "varMax",
      key: "varMax",
    },
    {
      title: "Min Bundle Size",
      dataIndex: "minBundleSize",
      key: "minBundleSize",
    },
    {
      title: "Max Bundle Size",
      dataIndex: "maxBundleSize",
      key: "maxBundleSize",
    },
    {
      title: "Min Size Prog",
      dataIndex: "minSizeProg",
      key: "minSizeProg",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Button type="primary" onClick={() => setSelectedImage(record.image)}>
          View Image
        </Button>
      ),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 150, // Specify width for this column

      render: (text, record) => (
        <Space>
          <Link to={`/shrinksleeves/edit/${record.uuid}`}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => confirmDelete(record.uuid)}
            loading={deleteLoading}
          />
        </Space>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  const fixedColumnsWidth = 150; // Width of the fixed "Actions" column
  const otherColumnsWidth = // Sum of widths of other fixed-width columns
    columns
      .filter((column) => column.width && column.fixed !== "right") // Exclude the "Actions" column
      .reduce((total, column) => total + (column.width || 0), 0);

  // Set an estimated width for the remaining columns (adjust this value as needed)
  const remainingColumnsWidth = 100; // Estimated width for remaining columns

  // Calculate total width needed for all columns
  const totalWidthNeeded =
    fixedColumnsWidth + otherColumnsWidth + remainingColumnsWidth;

  // Set the width of the table component
  const tableWidth =
    totalWidthNeeded > window.innerWidth ? "100%" : totalWidthNeeded;

  return (
    <div>
      <h1 className="title">Shrink Sleeves</h1>
      <h2 className="subtitle">List of Shrink Sleeves</h2>
      {error && <div>Error: {error}</div>}
      <Link to="/shrinksleeves/add">
        {" "}
        <Link to="/shrinksleeves/add">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </Link>
      </Link>
      <div className="table-container">
        <Table
          dataSource={shrinkSleeves}
          columns={columns}
          bordered
          style={{ width: tableWidth, background: "white", color: "black" }}
          // Set background color to white
          pagination={false}
        />
      </div>
      <Modal
        title="Shrink Sleeve Image"
        visible={selectedImage !== null}
        onCancel={() => setSelectedImage(null)}
        footer={null}
      >
        {selectedImage && <img src={selectedImage} alt="Shrink Sleeve" />}
      </Modal>
    </div>
  );
};

export default ShrinkSleeveList;
