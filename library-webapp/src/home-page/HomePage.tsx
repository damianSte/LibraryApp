import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useApi } from '../api/ApiProvider';
import BookListForm from '../bookList-form/BookListFrom';
import { Box } from '@mui/material';

function HomePage() {
  const apiClient = useApi();

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
