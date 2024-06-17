import { useState } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import CreateBook from './CreateBook';
import CreateUser from './CreateUser';
import EditBooks from './EditBooks';
import EditLoans from './EditLoans';

export default function AdminProfile() {
  const [selectedOption, setSelectedOption] = useState('');

  const renderContent = () => {
    switch (selectedOption) {
      case 'createBook':
        return <CreateBook />;
      case 'register':
        return <CreateUser />;
      case 'editBooks':
        return <EditBooks />;
      case 'editLoans':
        return <EditLoans />;
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
            ml={20}
            position={'fixed'}
          >
            <Box>
              <Grid item xs={12} md={3} mt={10} lg={8}>
                <Typography variant="h6">Select</Typography>
                <Button
                  onClick={() => handleOptionClick('createBook')}
                  fullWidth
                  sx={{ mt: 2 }}
                  variant={
                    selectedOption === 'createBook' ? 'contained' : 'text'
                  }
                >
                  Crate Book
                </Button>
                <Button
                  onClick={() => handleOptionClick('register')}
                  fullWidth
                  sx={{ mt: 2 }}
                  variant={selectedOption === 'register' ? 'contained' : 'text'}
                >
                  Register user
                </Button>
                <Button
                  onClick={() => handleOptionClick('editBooks')}
                  fullWidth
                  sx={{ mt: 2 }}
                  variant={
                    selectedOption === 'editBooks' ? 'contained' : 'text'
                  }
                >
                  Edit Books
                </Button>
                <Button
                  onClick={() => handleOptionClick('editLoans')}
                  fullWidth
                  sx={{ mt: 2 }}
                  variant={
                    selectedOption === 'editLoans' ? 'contained' : 'text'
                  }
                >
                  Edit Loans
                </Button>
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
