import { SyntheticEvent, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  ListItemIcon,
  FormControl,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, InputOutlined } from '@mui/icons-material';

export default function MenuAppBar() {
  const navigate = useNavigate();
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<HTMLElement | null>(null);

  const handleAccountMenuOpen = (event: SyntheticEvent) => {
    setAccountMenuAnchor(event.currentTarget as HTMLElement);
  };
  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const navigateToLogin = () => {
    navigate('/login');
    handleAccountMenuClose();
  };

  const navigateToHomePage = () => {
    navigate('/home');
  };

  const navigateToMyAccount = () => {
    navigate('/my-account');
    handleAccountMenuClose();
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    handleAccountMenuClose();
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
          onClick={navigateToHomePage}
        >
          LIBRARY
        </Typography>
        <Box display="flex" alignItems="center">
          <FormControl>
            <Select
              open={Boolean(accountMenuAnchor)}
              onClose={handleAccountMenuClose}
              onOpen={handleAccountMenuOpen}
              value=""
              IconComponent={() => (
                <AccountCircle
                  fontSize="large"
                  sx={{ color: 'white', cursor: 'pointer' }}
                />
              )}
              sx={{
                '.MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                },
              }}
              MenuProps={{
                anchorEl: accountMenuAnchor,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
              }}
            >
              <MenuItem onClick={navigateToMyAccount}>My Account</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
