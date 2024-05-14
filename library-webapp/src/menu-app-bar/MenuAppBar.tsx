import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
export default function MenuAppBar() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <AppBar position="fixed">
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
        <Typography variant="h6" component={'div'} sx={{ flexGrow: 1 }}>
          LIBRARY
        </Typography>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="accaunt"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={navigateToLogin}
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
