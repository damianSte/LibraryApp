// BookListForm.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, Typography } from '@mui/material';
import './BookList.css';
import { useApi } from '../api/ApiProvider';
import { BookDto } from '../api/dto/book.dto';

function BookListForm() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookDto[]>([]);
  const client = useApi();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await client.getBooks();
      if (response.success && response.data !== null) {
        setBooks(response.data);
      }
    };
    fetchBooks();
  }, [client]);

  const handleBookClick = (book: BookDto) => {
    navigate(`/book/${book.bookId}`, { state: { book } });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        width={800}
        my={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid key={book.bookId} item xs={12} sm={6} md={4}>
              <Paper className="tile">
                <img
                  src={book.coverImageUrl || 'default-cover-url.jpg'}
                  alt={book.title}
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
                  {book.title}
                </Typography>
                <Typography variant="body2" className="book-author">
                  {book.author}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default BookListForm;
