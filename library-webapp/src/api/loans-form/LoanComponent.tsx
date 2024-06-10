import { useEffect, useState } from 'react';
import { useApi } from '../ApiProvider';
import { getUserLoansDto } from '../loan.dto';
import MenuAppBar from '../../menu-app-bar/MenuAppBar';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

export default function LoanComponent() {
  const [loans, setLoans] = useState<getUserLoansDto[]>([]);
  const client = useApi();

  // Replace with actual user ID from auth context/ local storage. message: "Endpoint /user not found"
  const userId = 5;

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await client.getUserLoans(userId);

      if (response.success && response.data !== null) {
        setLoans(response.data);
      }
    };
    fetchLoans();
  }, [client, userId]);

  return (
    <>
      <MenuAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          alignItems: 'center',
          pt: 15,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          My Loans
        </Typography>
        <Box width={800} sx={{ flexGrow: 8 }}>
          <Grid container spacing={2}>
            {loans.map((loan) => (
              <Grid key={loan.loandId} item xs={12}>
                <Paper
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 3,
                  }}
                >
                  <img
                    src={loan.book?.coverImageUrl || 'default-cover-url.jpg'}
                    alt={loan.book?.title || 'Book cover'}
                    style={{
                      maxWidth: '120px',
                      maxHeight: '180px',
                      marginRight: '10px',
                    }}
                  />
                  <Box
                    ml={5}
                    mr={35}
                    p={0}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    width="400px"
                  >
                    <Typography variant="h5">{loan.book?.title}</Typography>
                    <Typography variant="h6">{loan.book?.author}</Typography>
                    <Typography variant="h6">
                      {loan.loanDate
                        ? new Date(loan.loanDate).toLocaleDateString()
                        : ''}
                    </Typography>
                    <Typography variant="h6">
                      {loan.dueDate
                        ? new Date(loan.dueDate).toLocaleDateString()
                        : ''}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button>
                      <Typography variant="h6">Return</Typography>
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
