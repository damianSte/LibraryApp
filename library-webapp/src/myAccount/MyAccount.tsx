import React, { useState } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import LoanComponent from '../loans-form/LoanComponent';
import UserReviewListForMyAccount from './UserReviewListForMyAccount';
import UsersProfile from './UsersProfile';
export default function MyAccount() {
  const [selectedOption, setSelectedOption] = useState('loans');

  const renderContent = () => {
    switch (selectedOption) {
      case 'loans':
        return <LoanComponent />;
      case 'reviews':
        return <UserReviewListForMyAccount />;
      case 'myProfile':
        return <UsersProfile />;
      default:
        return null;
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <MenuAppBar />

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={6}>
          <Grid
            container
            item
            xs={3}
            direction="column"
            ml={35}
            position={'fixed'}
          >
            <Box>
              <Grid container spacing={0}>
                <Grid item xs={12} md={3} mt={10}>
                  <Typography variant="h6">Options</Typography>
                  <Button
                    onClick={() => handleOptionClick('myProfile')}
                    fullWidth
                    sx={{ mt: 2 }}
                    variant={
                      selectedOption === 'myProfile' ? 'contained' : 'text'
                    }
                  >
                    My Profile
                  </Button>
                  <Button
                    onClick={() => handleOptionClick('loans')}
                    fullWidth
                    sx={{ mt: 2 }}
                    variant={selectedOption === 'loans' ? 'contained' : 'text'}
                  >
                    Loans
                  </Button>
                  <Button
                    onClick={() => handleOptionClick('reviews')}
                    fullWidth
                    sx={{ mt: 2 }}
                    variant={
                      selectedOption === 'reviews' ? 'contained' : 'text'
                    }
                  >
                    Reviews
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={4}
            direction="column"
            ml={80}
            sx={{ width: '800px' }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                mt: 10,
                mb: 10,
              }}
            >
              <Grid item xs={12} md={9} display="flex" justifyContent="center">
                <Paper>{renderContent()}</Paper>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
