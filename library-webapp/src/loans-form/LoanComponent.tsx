import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Pagination,
  Typography,
} from '@mui/material';
import { useApi } from '../api/ApiProvider';
import { getUserLoansDto } from '../api/dto/loan.dto';
import { useUser } from '../user/UserProvider';

export default function LoanComponent() {
  const [loans, setLoans] = useState<getUserLoansDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const loansPerPage = 3;

  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  const client = useApi();

  useEffect(() => {
    const fetchLoans = async () => {
      const userDetails = await client.getMe();
      const userId = userDetails.data?.id;
      if (!userId) return;

      const response = await client.getUserLoans(userId);

      if (response.success && response.data !== null) {
        setLoans(response.data);
      } else {
        setLoans([]);
        console.log('No loans found');
      }
    };

    fetchLoans();

    return () => {
      setLoans([]);
    };
  }, [client]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
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
        My Loans
      </Typography>
      <Box width="100%">
        <List>
          {currentLoans.map((loan) => (
            <React.Fragment key={loan.loandId}>
              <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                <Box
                  component="img"
                  src={loan.book?.coverImageUrl || 'default-cover-url.jpg'}
                  alt={loan.book?.title || 'Book cover'}
                  sx={{
                    maxWidth: '150px',
                    maxHeight: '180px',
                    marginRight: '10px',
                  }}
                />
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6">
                        {loan.book?.title ?? 'Untitled'}
                      </Typography>
                      <Typography variant="subtitle1">
                        {loan.book?.author ?? 'Unknown Author'}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Loan Date:{' '}
                        {loan.loanDate
                          ? new Date(loan.loanDate).toLocaleDateString()
                          : 'N/A'}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        display="block"
                      >
                        Due Date:{' '}
                        {loan.dueDate
                          ? new Date(loan.dueDate).toLocaleDateString()
                          : 'N/A'}
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 'auto',
                  }}
                >
                  <Button>
                    <Typography variant="h6">Return</Typography>
                  </Button>
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            count={Math.ceil(loans.length / loansPerPage)}
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
