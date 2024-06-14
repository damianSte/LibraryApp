import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CreateUser() {
  const apiClient = useApi();

  // Validation schema for the form fields
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required'),
    email: yup.string().required('Email is required'),
  });

  const onSubmit = useCallback(
    (
      values: {
        // add first name and last name
        username: string;
        password: string;
        role: string;
        email: string;
      },
      formik: any
    ) => {
      apiClient.register(values).then((response) => {
        if (response.success) {
          console.log('User created successfully');
        } else {
          console.log('Failed to create user');
        }
      });
      formik.resetForm();
    },
    []
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={8}
      sx={{
        borderRadius: 2,
        width: '700px',
        backgroundColor: 'white',
      }}
    >
      <Formik
        initialValues={{
          username: '',
          password: '',
          role: 'ROLE_READER',
          email: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              label="Username"
              variant="filled"
              type="text"
              name="username"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="email"
              label="Email"
              variant="filled"
              type="text"
              name="email"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              type="password"
              name="password"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && !!formik.errors.role}
              >
                <MenuItem value="ROLE_READER">Reader</MenuItem>
                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
