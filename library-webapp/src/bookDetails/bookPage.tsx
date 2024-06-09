import React, { useCallback, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useApi } from '../api/ApiProvider';
import { useAuth } from '../auth-context/AuthProvider';
import { BookDto } from '../api/book.dto';
import { UserDetails } from '../auth-context/authTypes';

function BookPage() {
  const location = useLocation();
  const book = location.state?.book;
  const apiClient = useApi();
  const navgate = useNavigate();

  const calculateDueDate = () => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 30);
    return dueDate;
  };

  const [showReviews, setShowReviews] = useState(false);

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
        height="80vh"
        p={2}
      >
        <Box
          display="flex"
          flexDirection="row"
          p={8}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
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
              sx={{ mt: 5, backgroundColor: 'black', color: 'white' }}
              variant="contained"
              disabled={!book.available}
              onClick={() =>
                onSubmit({
                  bookId: book.bookId,
                  userId: '3',
                  dueDate: calculateDueDate(),
                })
              }
            >
              Loan
            </Button>
            <Button
              sx={{ mt: 5, backgroundColor: 'black', color: 'white' }}
              variant="contained"
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </Button>
            {showReviews && (
              <Box>
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Reviews
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    <strong>User1:</strong> This book was amazing! I couldn't
                    put it down.
                  </Typography>
                  <Typography variant="body1">
                    <strong>User2:</strong> I found the plot a bit slow, but the
                    characters were interesting.
                  </Typography>
                  {/* Add more reviews as needed */}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BookPage;
