import React from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Box, Typography } from '@mui/material';

export default function MyAccount() {
  return (
    <>
      <MenuAppBar />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        alignContent={'center'}
        alignItems={'center'}
      >
        <Box sx={{ flexGrow: 1, paddingTop: '60px' }}>
          <Typography variant="h4" sx={{ flexGrow: 1, paddingTop: '60px' }}>
            My Loans
          </Typography>
          <Box>
            <Typography variant="h6">Placeholder For Loans</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
