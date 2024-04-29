import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import  axios  from 'axios';

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleCreateAccount = (values) => {
    axios.post('http://127.0.0.1:8000/api/customers/signup', JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': csrfToken
        }
      })
        .then(response => {
          // Handle the response data
          localStorage.setItem('user', JSON.stringify(response.data));

          console.log(response.data);
          navigate('/');
          window.location.reload()
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
  };

  return (  
    <Container>
      <h2>Create Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateAccount}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
      <p className="mt-3">
        Do have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </Container>
  );
};

export default CreateAccountPage;