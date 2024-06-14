import { Button, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';

export default function Options() {
  const [selectedOption, setSelectedOption] = useState('loans');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3} mt={10}>
        <Paper style={{ padding: '15px', marginBottom: '10px' }}>
          <Typography variant="h6">Options</Typography>
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
            variant={selectedOption === 'reviews' ? 'contained' : 'text'}
          >
            Reviews
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
