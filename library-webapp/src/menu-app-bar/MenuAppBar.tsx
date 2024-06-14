import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Settings, ExitToApp, Book } from '@mui/icons-material';
import { BookDto } from '../api/dto/book.dto';
import { useApi } from '../api/ApiProvider';

export default function MenuAppBar() {
  const navigate = useNavigate();
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close

  const handleAccountMenuOpen = (event: React.SyntheticEvent) => {
    setAccountMenuAnchor(event.currentTarget as HTMLElement);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigateToLogin = () => {
    navigate('/login');
    handleAccountMenuClose();
  };

  const navigateToHomePage = () => {
    navigate('/home');
    handleAccountMenuClose();
  };

  const navigateToMyAccount = () => {
    navigate('/my-account');
    handleAccountMenuClose();
  };

  const handleLogout = () => {
    console.log('User logged out');
    handleAccountMenuClose();
  };

  const [books, setBooks] = useState<BookDto[]>([]);
  const client = useApi();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await client.getBooks();
        if (response.success && response.data !== null) {
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [client]);

  const bookListAutocomplete = books.map((book) => ({
    label: book.title,
  }));

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // Open drawer on click
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
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ width: 240 }}
      >
        <List>
          <ListItem button onClick={navigateToMyAccount}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
          <ListItem button onClick={navigateToHomePage}>
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary="Book List" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
