import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  DatePicker,
  Table,
  Popconfirm,
  Typography,
  Input,
  Select,
  Button,
  message,
  Space,
} from "antd";
import "antd/dist/antd.css";
const { Option } = Select;
export default function StudentList() {
  const [student, setStudent] = useState([]);

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      editable: true,
      render: (text, record) => <Link to={`/detail/` + record.id}>{text}</Link>,
    },
    {
      key: "birthday",
      title: "Birthday",
      dataIndex: "birthday",
      editable: true,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "rank",
      title: "Rank",
      dataIndex: "rank",
    },
    {
      title: "Action",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
          <Link to={`/update/` + record.id}>Edit</Link>
        </Space>
      ),
    },
  ];

  const handleDelete = async (key) => {
    fetch("http://localhost:12345/api/student/" + key, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {});
  };

  useEffect(() => {
    fetch("http://localhost:12345/api/student")
      .then((res) => res.json())
      .then((response) => {
        setStudent(response.data);
      });
  }, []);

  return (
    <div style={{ margin: 100 }}>
      <Button type="primary">
        <Link to="/add">Add a student</Link>
      </Button>
      <Table rowKey="id" columns={columns} dataSource={student} />
    </div>
  );
}
