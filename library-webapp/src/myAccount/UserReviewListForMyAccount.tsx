import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Rating,
  Typography,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReviewResponseDto } from '../api/dto/review.dto';
import { useApi } from '../api/ApiProvider';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserReviewListForMyAccount() {
  const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 4;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const client = useApi();

  useEffect(() => {
    const fetchReviews = async () => {
      const userDetails = await client.getMe();
      const userId = userDetails.data?.id;
      if (!userId) return;

      const response = await client.getUserReviews(userId);
      if (response.success && response.data !== null) {
        setReviews(response.data);
        console.log('Reviews fetched successfully:', response.data);
      } else {
        setReviews([]);
        console.log('No reviews found');
      }
    };

    fetchReviews();
  }, [client]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleDeleteReview = async (reviewId: number) => {
    const response = await client.deleteReview(reviewId);
    if (response.success) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );
      console.log('Review deleted successfully');
    } else {
      console.log('Failed to delete review');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={8}
      sx={{
        borderRadius: 2,
        width: '700px',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Reviews
      </Typography>
      <Box width="100%">
        <List>
          {currentReviews.map((review, index) => (
            <Box key={review.reviewId} width="100%" bgcolor="inherit">
              <ListItem alignItems="flex-start" disableGutters>
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
                        color="textPrimary"
                      >
                        {review.comment}
                      </Typography>
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
                    </>
                  }
                />
                <IconButton
                  aria-label="delete"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => handleDeleteReview(review.reviewId ?? 0)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              {index < currentReviews.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Box>
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
    </Box>
  );
}
