import "./App.css";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(2, "minimun 5").required("Required"),
      password: Yup.string().min(2, "minimun 5").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}authentication/token/new?api_key=${process.env.REACT_APP_APIKEY}`)
        .then((response) => {
          const token = response.data.request_token;
          axios
            .post(
              `${process.env.REACT_APP_BASEURL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}`,
              {
                username: values.username,
                password: values.password,
                request_token: token,
              }
            )
            .then((respon) => {
              const validateToken = respon.data.request_token;

              console.log(validateToken);
              axios
                .post(`${process.env.REACT_APP_BASEURL}authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}`, {
                  request_token: validateToken,
                })
                .then((res) => {
                  const sessionID = res.data.session_id;
                  localStorage.setItem("sessionId", sessionID);
                  localStorage.setItem("name", values.username);
                  window.location.assign("/movie");
                });
            })
            .catch((err) => {
              const showError = err.response.data.status_message;
              alert(showError);
            });
        });
    },
  });

  return (
    <div className="login">
      <Container className="pr">
        <h1 className="text-white text-center fw-bold">Login</h1>
        <Row className=" justify-content-center p-1">
          <Col md={4} className="kolom">
            <Form onSubmit={formik.handleSubmit} className="p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username" className="text-white">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger">{formik.errors.username}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="password" className="text-white">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Button variant="primary" type="submit" className="tombol">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
