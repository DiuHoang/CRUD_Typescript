import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Space, Popconfirm } from "antd";
import moment from "moment";
export default function Student_Detail() {
  type Student = {
    isLoading?: boolean;
    students?: any;
  };
  const getDetailId = (path: string) => {
    const id = window.location.pathname.replace(path, "");
    if (id.includes("/detail"))
      return id.replace("/detail", "").replace("/", "");
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
          },
        });
      });
  }, []);

  const cancel = () => {
    window.location.href = "/";
  };
  const edit = () => {
    window.location.href = "/update/" + id;
  };
  const onDelete = () => {
    fetch("http://localhost:12345/api/student/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.href = "/";
    });
  };
  return (
    <div style={{ marginTop: "100px", marginLeft: "300px" }}>
      <h2>
        <p>Student Profile</p>
      </h2>
      {student.isLoading ? (
        <></>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Fullname: &ensp;&ensp;</h3>
                </td>
                <td>
                  <h3>
                    <b>{student.students.name}</b>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Birthday: &ensp;&ensp;</h3>
                </td>
                <td>
                  <h3>
                    <b>{student.students.birthday}</b>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Email: &ensp;&ensp;</h3>
                </td>
                <td>
                  <h3>
                    <b>{student.students.email}</b>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Rank: &ensp;&ensp;</h3>
                </td>
                <td>
                  <h3>
                    <b>{student.students.rank}</b>
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
          <Space>
            <Popconfirm title="Sure to edit?" onConfirm={edit}>
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Popconfirm>
            <Popconfirm title="Sure to delete?" onConfirm={onDelete}>
              <Button danger htmlType="submit">
                Delete
              </Button>
            </Popconfirm>
            <Popconfirm title="Sure to cancle?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </Space>
        </div>
      )}
    </div>
  );
}
