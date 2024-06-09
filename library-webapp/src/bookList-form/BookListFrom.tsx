// BookListForm.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, Typography } from '@mui/material';
import './BookList.css';
import { BookDto } from '../api/book.dto';
import { useApi } from '../api/ApiProvider';
import { useAuth } from '../auth-context/AuthProvider';

function BookListForm() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookDto[]>([]);
  const client = useApi();
  const { user } = useAuth();

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
    <Box width={800} my={5} sx={{ flexGrow: 3, pl: 70 }}>
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
  );
}

export default BookListForm;
