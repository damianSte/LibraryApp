import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Rating,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReviewResponseDto } from '../api/dto/review.dto';
import { useApi } from '../api/ApiProvider';
import { useLocation } from 'react-router-dom';
import { BookDto } from '../api/dto/book.dto';

export default function UsersReviewList() {
  const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 6;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const client = useApi();

  const location = useLocation();
  const book: BookDto = location.state?.book;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await client.getReview(book.bookId ?? 0);
        if (response.success && response.data !== null) {
          setReviews(response.data);
          console.log('Reviews fetched successfully:', response.data);
        } else {
          setReviews([]);
          console.log('No reviews found');
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviews([]);
      }
    };

    if (book) {
      fetchReviews();
    }
  }, [client, book]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Typography variant="h6">User Reviews</Typography>
      <List>
        {currentReviews.map((review) => (
          <React.Fragment key={review.reviewId}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <Typography variant="h6">
                      {review.userId?.name ?? 'Anonymous'}
                    </Typography>
                    <Rating value={review.rating} readOnly />
                  </>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      display="block"
                    >
                      {review.reviewDate
                        ? new Date(review.reviewDate).toLocaleDateString()
                        : ''}
                    </Typography>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="textPrimary"
                    >
                      {review.comment}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(reviews.length / reviewsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </Box>
  );
}
