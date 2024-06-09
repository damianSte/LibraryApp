import { Box } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useNavigate } from 'react-router-dom';
import BookListForm from '../bookList-form/BookListFrom';
import { useApi } from '../api/ApiProvider';

function HomePage() {
  const apiClient = useApi();

  apiClient.getBooks().then((response) => {
    console.log(response);
  });

  apiClient.getUserLoans(3).then((response) => {
    console.log(response);
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MenuAppBar />
      <Box sx={{ flexGrow: 1, paddingTop: '60px' }}>
        <BookListForm />
      </Box>
    </Box>
  );
}

export default HomePage;
