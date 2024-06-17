import { getLoansPageResponseDto, getUserLoansDto } from '../api/dto/loan.dto';
import React, { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';

export default function EditLoans() {
  const [loans, setLoans] = useState<getUserLoansDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const client = useApi();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLoan, setSelectedLoan] = useState<getUserLoansDto | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const loansPerPage = 6;
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await client.getLoans();
      if (response.success && response.data !== null) {
        const sortedLoans = response.data.sort((a, b) => {
          if (a.loanDate && b.loanDate) {
            return (
              new Date(b.loanDate).getTime() - new Date(a.loanDate).getTime()
            );
          }
          return 0;
        });
        setLoans(sortedLoans);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleInputChange =
    (field: keyof getUserLoansDto) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedLoan) {
        setSelectedLoan({ ...selectedLoan, [field]: event.target.value });
      }
    };

  const filteredLoans = loans.filter((loan) =>
    loan.book?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        Loans
      </Typography>
      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Box width="100%">
        <List>
          {filteredLoans.map((selectedLoan) => (
            <React.Fragment key={selectedLoan.loandId}>
              <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6">
                        {selectedLoan.book?.title ?? 'Untitled'}
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
                        {selectedLoan.loanDate
                          ? new Date(selectedLoan.loanDate).toLocaleDateString()
                          : 'N/A'}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        display="block"
                      >
                        Due Date:{' '}
                        {selectedLoan.dueDate
                          ? new Date(selectedLoan.dueDate).toLocaleDateString()
                          : 'N/A'}
                      </Typography>
                    </>
                  }
                />
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
