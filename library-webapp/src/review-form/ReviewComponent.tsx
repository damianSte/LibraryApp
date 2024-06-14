import React, { useCallback, useState } from 'react';
import { Box, Rating, TextField, Typography, Button } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import { useLocation } from 'react-router-dom';
import { BookDto } from '../api/dto/book.dto';
import UsersReviewList from './UsersReviewList';

export default function ReviewComponent() {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>('');
  const client = useApi();
  const location = useLocation();
  const book: BookDto = location.state?.book;

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setRating(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onSubmit = useCallback(
    (values: {
      bookId: number;
      userId: number;
      comment: string;
      rating: number;
    }) => {
      console.log('Submitting review with values:', values);

      client
        .postReview(values)
        .then((response) => {
          if (response.success) {
            console.log('Review created', response.data);
          } else {
            console.log('Review not created');
          }
        })
        .catch((error) => {
          console.error('API call failed:', error);
        });
    },
    [client]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={8}
      sx={{ borderRadius: 2, width: '800px', backgroundColor: 'white' }}
    >
      <Typography variant="h6">Share your Review!</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={handleRatingChange}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Comment"
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() =>
          onSubmit({
            bookId: book?.bookId ?? 0,
            userId: 1,
            comment: comment,
            rating: rating ?? 0,
          })
        }
      >
        SHARE
      </Button>
      <Box mt={4} width="100%">
        <UsersReviewList />
      </Box>
    </Box>
  );
}
