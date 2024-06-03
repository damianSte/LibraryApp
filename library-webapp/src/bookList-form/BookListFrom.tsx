import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, Typography, IconButton } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { mockBooks } from '../Books/mockBook';
import './BookList.css';

interface Book {
  BookID: string;
  ISBN: string;
  Title: string;
  Author: string;
  Publisher: string;
  YearPublished: number;
  AvailableCopies: number;
  coverImageUrl?: string;
}

function BookListForm() {
  const navigate = useNavigate();

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book.BookID}`, { state: { book } });
  };

  return (
    <Box width={800} my={5} sx={{ flexGrow: 3, pl: 70 }}>
      <Grid container spacing={2}>
        {mockBooks.map((book) => (
          <Grid key={book.BookID} item xs={12} sm={6} md={4}>
            <Paper className="tile">
              <img
                src={book.coverImageUrl}
                alt={book.Title}
                className="book-cover"
                style={{
                  maxWidth: '120px',
                  maxHeight: '180px',
                  cursor: 'pointer',
                }}
                onClick={() => handleBookClick(book)}
              />
              <Typography
                variant="subtitle1"
                className="book-title"
                onClick={() => handleBookClick(book)}
                style={{ cursor: 'pointer' }}
              >
                {book.Title}
              </Typography>
              <Typography variant="body2" className="book-author">
                {book.Author}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BookListForm;
