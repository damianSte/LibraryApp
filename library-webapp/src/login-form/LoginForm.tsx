import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Loginform.css';
import { Formik } from 'formik';
import { useMemo } from 'react';
import * as yup from 'yup';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function LoginForm() {
  const navgate = useNavigate();

  const apiClient = useApi();

  let onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navgate('/home');
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
    },
    [apiClient, navgate]
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(6, 'Password too short'),
      }),
    []
  );
  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <form
            className="Login-form"
            id="signinform"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <TextField
              id="username"
              label="username"
              variant="filled"
              type="text"
              color="primary"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              label="password"
              variant="filled"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              color="success"
              type="submit"
              variant="contained"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Log In
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
