import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Pagination,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import { useApi } from '../api/ApiProvider';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { BookDto } from '../api/dto/book.dto';
import { MeDetails } from '../api/dto/me.dto';

export interface LoanProps {
  loanId: number;
  book: BookDto;
  user: MeDetails;
  loanDate: string;
  dueDate: string;
}

const EditLoans: React.FC = () => {
  const [loans, setLoans] = useState<LoanProps[]>([]);
  const [userIdQuery, setUserIdQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const apiClient = useApi();

  useEffect(() => {
    fetchLoans();
  }, [currentPage]);

  const fetchLoans = async () => {
    try {
      const loansResponse = await apiClient.getLoans(currentPage);
      const fetchedLoans = loansResponse.data.loans || [];
      const totalNumberOfPages = loansResponse.data.totalPages || 0;

      setLoans(fetchedLoans);
      setTotalPages(totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page - 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdQuery(event.target.value);
  };

  const handleDeleteLoan = async (loanId: number) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      setLoans((prevLoans) =>
        prevLoans.filter((loan) => loan.loanId !== loanId)
      );
      console.log('Review deleted successfully');
    } else {
      console.log('Failed to delete review');
    }
  };

  const filteredLoans = loans.filter((loan) =>
    loan.user?.id?.toString().includes(userIdQuery)
  );

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
        Loans
      </Typography>
      <TextField
        label="Search by User ID"
        variant="outlined"
        fullWidth
        value={userIdQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Box width="100%">
        <List>
          {filteredLoans.map((loan) => (
            <React.Fragment key={loan.loanId}>
              <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6">
                        {loan.book.title ?? 'Untitled'}
                      </Typography>

                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Reader ID: {loan.user.id ?? 'Untitled'}
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
                <IconButton
                  onClick={() => handleDeleteLoan(loan.loanId)}
                  color="primary"
                >
                  <BookmarkAddedIcon />
                </IconButton>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            count={totalPages}
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
};

export default EditLoans;
