import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useApi } from '../api/ApiProvider';
import ReviewComponent from '../review-form/ReviewComponent';
import { ReviewResponseDto } from '../api/dto/review.dto';

function BookPage() {
  const location = useLocation();
  const book = location.state?.book;
  const apiClient = useApi();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMeDetails = async () => {
      try {
        const response = await apiClient.getMe();
        if (response.success && response.data !== null) {
          setUserId(response.data?.id ?? null);
        } else {
          console.error('Failed to fetch user details:', response);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchMeDetails();
  }, [apiClient]);

  const calculateDueDate = () => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 30);
    return dueDate;
  };

  let onSubmit = useCallback(
    (values: { bookId: number; userId: number; dueDate: Date }) => {
      apiClient.postLoan(values).then((response) => {
        if (response.success) {
          console.log('loan created');
          navigate('/my-account');
        } else {
          console.log('loan not created');
        }
      });
    },
    [apiClient, navigate]
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.getReview(book?.bookId ?? 0);
        if (response.success && response.data !== null) {
          setReviews(response.data);
          console.log('Reviews fetched successfully:', response.data);

          const totalRating = response.data.reduce((sum, review) => {
            if (review.rating !== undefined) {
              return sum + review.rating;
            }
            return sum;
          }, 0);
          const avgRating = totalRating / response.data.length;
          setAverageRating(avgRating);
        } else {
          setReviews([]);
          setAverageRating(null);
          console.log('No reviews found');
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviews([]);
        setAverageRating(null);
      }
    };

    if (book) {
      fetchReviews();
    }
  }, [apiClient, book]);

  const renderRatingStars = () => {
    if (averageRating === null) {
      return 'No rating';
    }

    const stars = [];
    const roundedRating = Math.round(averageRating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<span key={i}>&#9733;</span>);
      } else if (i - 0.5 <= roundedRating) {
        stars.push(<span key={i}>&#9734;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <>
      <MenuAppBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="auto"
        p={2}
        pt={15}
        pb={10}
        sx={{ backgroundColor: '#f5f5f5' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          p={8}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            mb: 5,
            bgcolor: 'white',
          }}
          height="400px"
          width="800px"
        >
          <img
            src={book?.coverImageUrl}
            alt={book?.title}
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
            <Typography variant="h4">{book?.title}</Typography>
            <Typography variant="h6">{book?.author}</Typography>
            <Typography variant="h6">
              {averageRating !== null ? renderRatingStars() : 'No rating'}
            </Typography>
            <Typography sx={{ mt: 4 }} variant="body1">
              Book Details
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>ISBN:</strong> {book?.isbn}
            </Typography>
            <Typography variant="body2">
              <strong>Publisher:</strong> {book?.publisher}
            </Typography>
            <Typography variant="body2">
              <strong>Year Published:</strong> {book?.yearPublished}
            </Typography>
            <Typography variant="body2">
              <strong>Available:</strong> {book?.available ? 'Yes' : 'No'}
            </Typography>

            <Button
              sx={{ mt: 12, backgroundColor: 'black', color: 'white' }}
              variant="contained"
              disabled={!book?.available}
              onClick={() =>
                onSubmit({
                  bookId: book?.bookId,
                  userId: userId ?? 0,
                  dueDate: calculateDueDate(),
                })
              }
            >
              Loan
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={8}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            width: '800px',
            backgroundColor: 'white',
          }}
        >
          <Box>
            <ReviewComponent />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BookPage;
