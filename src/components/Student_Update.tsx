import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Space,
  message,
  Popconfirm,
  Modal,
} from "antd";
import moment from "moment";
import "antd/dist/antd.css";

export default function Student_Update(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  type Student = {
    isLoading: boolean;
    students: {};
  };
  const getDetailId = (path: string) => {
    const id = window.location.pathname.replace(path, "");
    if (id.includes("/update"))
      return id.replace("/update", "").replace("/", "");
    return id.replace("/", "");
  };
  const [student, setStudent] = useState<Student>({
    isLoading: true,
    students: {},
  });

  const id = getDetailId(window.location.href);

  useEffect(() => {
    fetch(`http://localhost:12345/api/student/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((detail) => {
        setStudent({
          isLoading: false,
          students: {
            ...detail.data,
            birthday: moment(detail.data["birthday"]),
          },
        });
      });
  }, []);

  const editStudent = async () => {
    const { name, birthday, email, rank } = form.getFieldsValue();
    const student = {
      name: name,
      birthday: birthday.format("YYYY-MM-DD"),
      email: email,
      rank: rank,
    };
    fetch(`http://localhost:12345/api/student/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((students) => {
        setIsModalVisible(true);
        setStudent(students.data);
      });
  };
  const handleOk = () => {
    setIsModalVisible(false);
    window.location.href = "/detail/" + id;
    message.success("Edit a student successfully!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const cancel = () => {
    window.location.href = "/";
  };
  return (
    <div style={{ marginTop: "100px", marginLeft: "300px" }}>
      <h3 style={{ marginLeft: "400px", fontSize: "25px" }}>
        <p>Update student</p>
      </h3>
      {student.isLoading ? (
        <></>
      ) : (
        <Form
          form={form}
          onFinish={editStudent}
          initialValues={student.students}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
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
            <Input />
          </Form.Item>
          <Form.Item
            name="rank"
            label="Rank"
            rules={[
              {
                required: true,
                message: "Please select your Rank!",
              },
            ]}
          >
            <Select>
              <Option value="Excellent">Excellent</Option>
              <Option value="Good">Good</Option>
              <Option value="Pretty">Pretty</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Weak">Weak</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Modal
                title="Editting a student"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Are you sure save?</p>
              </Modal>
              <Popconfirm title="Sure to cancle?" onConfirm={cancel}>
                <Button type="ghost">Cancel</Button>
              </Popconfirm>
            </Space>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
