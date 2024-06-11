import React, { useEffect, useState } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import { getUserLoansDto } from '../api/loan.dto';

export default function MyAccount() {
  const [reviews, setLoans] = useState<getUserLoansDto[]>([]);
  const client = useApi();
  const bookId = 3;

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await client.getReviewByBookId(bookId);

      if (response.success && Array.isArray(response.data)) {
        setLoans(response.data);
      } else {
        console.log('Error fetching loans or data is not an array');
        setLoans([]);
      }
    };
    fetchLoans();
  }, [client, bookId]);

  return (
    <>
      <MenuAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          alignItems: 'center',
          pt: 25,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          My Loans
        </Typography>
        <Box width={800} sx={{ flexGrow: 8 }}>
          {reviews.length === 0 ? (
            <Typography variant="h6">No loans found</Typography>
          ) : (
            reviews.map((review) => (
              <Grid key={review.loandId} item xs={12}>
                <Paper
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 2,
                  }}
                >
                  <Box
                    ml={5}
                    mr={35}
                    p={0}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    width="400px"
                  ></Box>
                </Paper>
              </Grid>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
