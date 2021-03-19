import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const schema = yup.object().shape({
  title: yup.string().required("ชื่อภาพยนต์ห้ามว่าง"),
  year: yup.number().min(1900).max(2050).typeError("กรุณากรอกปี เท่านั้น"),
  rating: yup.string().required("กรุณาเลือก"),
});

const AddMoviePage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const token = JSON.parse(localStorage.getItem("token"));
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/movie/`;
    const resp = await axios.post(
      apiUrl,
      {
        title: data.title,
        release_year: data.year,
        rating: data.rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    addToast(resp.data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    history.replace("/");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <span>Add Moive</span>
        <hr />
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            ref={register}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          {errors.title && (
            <Form.Control.Feedback type="invalid">
              {errors.title.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label>Year Released</Form.Label>
          <Form.Control
            type="text"
            name="year"
            ref={register}
            className={`form-control ${errors.year ? "is-invalid" : ""}`}
          />
          {errors.year && (
            <Form.Control.Feedback type="invalid">
              {errors.year.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            custom
            name="rating"
            ref={register}
            className={`form-control ${errors.rating ? "is-invalid" : ""}`}
          >
            <option>G</option>
            <option>PG</option>
            <option>M</option>
            <option>MA</option>
            <option>R</option>
          </Form.Control>
          {errors.rating && (
            <Form.Control.Feedback type="invalid">
              {errors.rating.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          บันทึก
        </Button>
      </Form>
    </>
  );
};

export default AddMoviePage;
