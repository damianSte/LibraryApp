import React, { useCallback, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { Box } from '@mui/material';

function CreateBook() {
  const apiClient = useApi();

  // Validation schema for the form fields
  const validationSchema = yup.object().shape({
    isbn: yup.string().required('ISBN is required'),
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publisher: yup.string().required('Publisher is required'),
    publicationYear: yup.number().required('Publication Year is required'),
    coverImageUrl: yup
      .string()
      .url('Invalid URL format')
      .required('Cover Image URL is required'),
  });

  const onSubmit = useCallback(
    (
      values: {
        isbn: string;
        title: string;
        author: string;
        publisher: string;
        publicationYear: number;
        availableCopies: number;
        coverImageUrl: string;
      },
      formik: any
    ) => {
      apiClient.postBook(values).then((response) => {
        if (response.success) {
          console.log('Book created successfully');
        } else {
          console.log('Failed to create book');
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
          isbn: '',
          title: '',
          author: '',
          publisher: '',
          publicationYear: 0,
          availableCopies: 0,
          coverImageUrl: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="isbn"
              label="ISBN"
              variant="filled"
              type="text"
              name="isbn"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.isbn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.isbn && !!formik.errors.isbn}
              helperText={formik.touched.isbn && formik.errors.isbn}
            />
            <TextField
              id="title"
              label="Title"
              variant="filled"
              type="text"
              name="title"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && !!formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              id="author"
              label="Author"
              variant="filled"
              type="text"
              name="author"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.author && !!formik.errors.author}
              helperText={formik.touched.author && formik.errors.author}
            />
            <TextField
              id="publisher"
              label="Publisher"
              variant="filled"
              type="text"
              name="publisher"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.publisher}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.publisher && !!formik.errors.publisher}
              helperText={formik.touched.publisher && formik.errors.publisher}
            />
            <TextField
              id="publicationYear"
              label="Publication Year"
              variant="filled"
              type="text"
              name="publicationYear"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.publicationYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.publicationYear &&
                !!formik.errors.publicationYear
              }
              helperText={
                formik.touched.publicationYear && formik.errors.publicationYear
              }
            />
            <TextField
              id="availableCopies"
              label="Available Copies"
              variant="filled"
              type="text"
              name="availableCopies"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.availableCopies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.availableCopies &&
                !!formik.errors.availableCopies
              }
              helperText={
                formik.touched.availableCopies && formik.errors.availableCopies
              }
            />
            <TextField
              id="coverImageUrl"
              label="Cover Image URL"
              variant="filled"
              type="text"
              name="coverImageUrl"
              fullWidth
              sx={{ mb: 2 }}
              value={formik.values.coverImageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.coverImageUrl && !!formik.errors.coverImageUrl
              }
              helperText={
                formik.touched.coverImageUrl && formik.errors.coverImageUrl
              }
            />
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

export default CreateBook;
