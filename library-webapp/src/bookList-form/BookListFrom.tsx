import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mockBooks } from '../Books/mockBook';
import './BookList.css';

function BookListForm() {
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
                style={{ maxWidth: '120px', maxHeight: '180px' }}
              />
              <div className="book-info">
                <Typography variant="subtitle1" className="book-title">
                  {book.Title}
                </Typography>
                <Typography variant="body2" className="book-author">
                  {book.Author}
                </Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default BookListForm;
