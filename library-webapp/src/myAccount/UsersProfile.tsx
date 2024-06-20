import { Box, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';

export default function UsersProfile() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const client = useApi();

  useEffect(() => {
    async function fetchData() {
      const response = await client.getMe();
      if (response.success && response.data) {
        setName(response.data?.name ?? '');
        setLastName(response.data?.lastName ?? '');
        setEmail(response.data.email ?? '');
      } else {
        console.error('Failed to fetch user data');
      }
    }

    fetchData();
  }, [client]);

  const handleSave = async () => {
    const userDetails = await client.getMe();
    const userId = userDetails.data?.id;

    if (userId !== null) {
      const updateResponse = await client.patchUser(
        userId ?? 0,
        name,
        lastName
      );
      if (updateResponse.success) {
        alert('User data updated successfully');
      } else {
        console.error('Failed to update user data');
      }
    } else {
      console.error('User ID is null, cannot update user data');
    }
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
        User Profile
      </Typography>
      <Box width="100%">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
