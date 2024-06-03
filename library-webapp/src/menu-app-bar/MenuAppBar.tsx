import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const naviagteToHomePage = () => {
    navigate('/home');
  };

  const navigateToMyAccount = () => {
    navigate('/my-account');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={naviagteToHomePage}
        >
          LIBRARY
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer', marginRight: 2 }}
            onClick={navigateToMyAccount}
          >
            My Account
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={navigateToLogin}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
