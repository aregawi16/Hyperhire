import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './AuthContext';
import  axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const navigate = useNavigate();

   


  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values) => {
   
    
    axios.post('http://127.0.0.1:8000/api/customers/login', JSON.stringify(values), {
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
    console.log('Logged in:', values.email, values.password);
  };
  const handleLogout = () => {
    logout();
};

  return (
    <Container>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <p className="mt-3">
        Don't have an account?{' '}
        <Link to="/create-account">Create Account</Link>
      </p>
    </Container>
  );
};

export { LoginPage };