import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const schema = yup.object().shape({
  username: yup.string().required("username ห้ามว่าง"),

  password: yup
    .string()
    .required("รหัสผ่านห้ามว่าง")
    .min(4, "รหัสผ่านต้อง 4 ตัวอักษรขึ้นไป"),
});

const LoginPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  //call redux action
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {

      const apiUrl = `${process.env.REACT_APP_API_URL}/users/login`;
      const resp = await axios.post(apiUrl, {
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("token", JSON.stringify(resp.data.access_token));
      localStorage.setItem("profile", JSON.stringify(resp.data.data));
      const profile = localStorage.getItem("profile");
      dispatch(updateProfile(profile));
      history.replace("/");


      addToast("เข้าระบบเรียบร้อยแล้ว", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } catch (error) {

      addToast(error.response.data.error.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Log in </h3>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            name="username"
            ref={register}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            ref={register}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <br />

        <button type="submit" className="btn btn-dark btn-lg btn-block">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
