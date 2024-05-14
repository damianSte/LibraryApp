import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { mockBooks } from '../Books/mockBook';
import './BookList.css';
import BookDetailsTooltip from '../BookDetails/BookDetailsToolip';

function BookListForm() {
  return (
    <div className="book-list-container">
      <Grid container spacing={3} className="book-list">
        {mockBooks.map((book) => (
          <Grid item xs={12} sm={4} md={3} key={book.BookID}>
            <BookDetailsTooltip book={book}>
              <div className="book-details">
                <img
                  src={book.coverImageUrl}
                  alt={book.Title}
                  className="book-cover"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                <div>
                  <Typography variant="subtitle1" className="book-title">
                    {book.Title}
                  </Typography>
                  <Typography variant="body2" className="book-author">
                    {book.Author}
                  </Typography>
                </div>
              </div>
            </BookDetailsTooltip>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default BookListForm;
