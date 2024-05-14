import { Box } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useNavigate } from 'react-router-dom';
import BookListForm from '../bookList-form/BookListFrom';

function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MenuAppBar />
      <Box sx={{ flexGrow: 1, mt: '5%' }}>
        <BookListForm />
      </Box>
    </Box>
  );
}

export default HomePage;
