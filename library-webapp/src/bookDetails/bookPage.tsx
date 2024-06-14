import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Tab, Tabs } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useApi } from '../api/ApiProvider';
import ReviewComponent from '../review-form/ReviewComponent';

function BookPage() {
  const location = useLocation();
  const book = location.state?.book;
  const userId = '1';
  const apiClient = useApi();
  const navgate = useNavigate();

  const calculateDueDate = () => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 30);
    return dueDate;
  };

  const [showReviews, setShowReviews] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  let onSubmit = useCallback(
    (values: { bookId: number; userId: string; dueDate: Date }) => {
      apiClient.postLoan(values).then((response) => {
        if (response.success) {
          console.log('loan created');
          navgate('/my-account');
        } else {
          console.log('loan not created');
        }
      });
    },
    [apiClient, navgate]
  );

  return (
    <>
      <MenuAppBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="auto"
        p={2}
        pt={15}
        pb={10}
        sx={{ backgroundColor: '#f5f5f5' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          p={8}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            mb: 5,
            bgcolor: 'white',
          }}
          height="400px"
          width="800px"
        >
          <img
            src={book.coverImageUrl}
            alt={book.title}
            style={{
              maxWidth: '300px',
              maxHeight: '400px',
            }}
          />
          <Box
            ml={2}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', ml: 12 }}
            width="400px"
          >
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="h6">{book.author}</Typography>
            <Typography variant="h6">rating placeholder</Typography>
            <Typography sx={{ mt: 4 }} variant="body1">
              Book Details
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>ISBN:</strong> {book.isbn}
            </Typography>
            <Typography variant="body2">
              <strong>Publisher:</strong> {book.publisher}
            </Typography>
            <Typography variant="body2">
              <strong>Year Published:</strong> {book.yearPublished}
            </Typography>
            <Typography variant="body2">
              <strong>Available:</strong> {book.available ? 'Yes' : 'No'}
            </Typography>

            <Button
              sx={{ mt: 12, backgroundColor: 'black', color: 'white' }}
              variant="contained"
              disabled={!book.available}
              onClick={() =>
                onSubmit({
                  bookId: book.bookId,
                  userId: '2',
                  dueDate: calculateDueDate(),
                })
              }
            >
              Loan
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={6}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            width: '800px',
            backgroundColor: 'white',
          }}
        >
          <Box p={3}>
            <ReviewComponent />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BookPage;
