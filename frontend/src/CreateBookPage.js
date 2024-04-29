import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'; // Import Yup

// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  writer: Yup.string().required('Writer is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  tag: Yup.string().required('Tag is required'),
});

const CreateBookPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
   

  }, []);

  const handleSubmit = (values) => {
    axios.post('http://127.0.0.1:8000/api/books', JSON.stringify(values), {
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRF-TOKEN': csrfToken
      }
    })
      .then(response => {
        console.log(response.data);
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container>
      <h1>Create Book</h1>
      <Formik
        initialValues={{ title: '', writer: '', price: '', tag: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema} // Apply the validation schema
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="writer">
              <Form.Label>Writer</Form.Label>
              <Form.Control
                type="text"
                name="writer"
                value={values.writer}
                onChange={handleChange}
                isInvalid={touched.writer && !!errors.writer}
              />
              <Form.Control.Feedback type="invalid">
                {errors.writer}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={touched.price && !!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="tag">
              <Form.Label>Tag</Form.Label>
              <Form.Select
                name="tag"
                value={values.tag}
                onChange={handleChange}
                isInvalid={touched.tag && !!errors.tag}
              >
                <option value="fiction" selected>Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science">Science</option>
                <option value="essay">Essay</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.tag}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateBookPage;
