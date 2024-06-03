import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { mockBooks } from '../Books/mockBook';
import MenuAppBar from '../menu-app-bar/MenuAppBar';

export default function BookPage() {
  const { bookId } = useParams();
  const location = useLocation();
  const book =
    location.state?.book || mockBooks.find((book) => book.BookID === bookId);

  if (!book) {
    return <Typography variant="h4">Book not found</Typography>;
  }

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
            alt={book.Title}
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
            <Typography variant="h4">{book.Title}</Typography>
            <Typography variant="h6">{book.Author}</Typography>
            <Typography variant="h6">rating placeholder</Typography>
            <Typography sx={{ mt: 4 }} variant="body1">
              Book Details
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Publisher:</strong> {book.Publisher}
            </Typography>
            <Typography variant="body2">
              <strong>Year Published:</strong> {book.YearPublished}
            </Typography>
            <Typography variant="body2">
              <strong>Available Copies:</strong> {book.AvailableCopies}
            </Typography>
            <Button
              sx={{ mt: 10, backgroundColor: 'black', color: 'white' }}
              variant="contained"
            >
              Loan
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
