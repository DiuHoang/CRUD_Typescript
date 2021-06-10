import "antd/dist/antd.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  message,
  Popconfirm,
  Alert,
  Space,
} from "antd";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 6,
  },
};

export interface IStudent {
  name: string;
  birthday: Date;
  email: string;
  rank: boolean;
}
export default function Student_Add() {
  const { Option } = Select;
  const fillStudent = {
    name: "",
    birthday: new Date(),
    email: "",
    rank: false,
  };
  const [form] = Form.useForm();
  const [student, setStudent] = useState(fillStudent);
  const handleAdd = () => {
    const { name, birthday, email, rank } = form.getFieldsValue();
    const student = {
      name: name,
      birthday: birthday.format("YYYY-MM-DD"),
      email: email,
      rank: rank,
    };
    fetch("http://localhost:12345/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((response) => {
        message.success("Add a student successfully!");
        setStudent(response.data);
        window.location.href = "/detail/" + response.data.id;
      });
  };
  const cancel = () => {
    window.location.href = "/";
  };
  return (
    <div style={{ marginTop: "100px", marginLeft: "300px" }}>
      <h3 style={{ marginLeft: "400px", fontSize: "25px" }}>
        <p>Add a student</p>
      </h3>
      <Form form={form} onFinish={handleAdd}>
        <Form.Item
          {...layout}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Input your name" />
        </Form.Item>
        <Form.Item
          label="Birthday"
          name="birthday"
          {...layout}
          rules={[
            {
              required: true,
              message: "Please input your Birthday!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          {...layout}
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input placeholder="Input your email" />
        </Form.Item>
        <Form.Item
          name="rank"
          label="Rank"
          {...layout}
          rules={[
            {
              required: true,
              message: "Please select your Rank!",
            },
          ]}
        >
          <Select placeholder="Select your rank">
            <Option value="Excellent">Excellent</Option>
            <Option value="Good">Good</Option>
            <Option value="Pretty">Pretty</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Weak">Weak</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
          &ensp;
          <Popconfirm title="Sure to cancle?" onConfirm={cancel}>
            <Button type="ghost">Cancel</Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
}
