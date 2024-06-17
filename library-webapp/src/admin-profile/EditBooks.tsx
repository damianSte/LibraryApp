import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useApi } from '../api/ApiProvider';
import { BookResponseDto } from '../api/dto/book.dto';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const columns: GridColDef[] = [
  { field: 'bookId', headerName: 'Book ID', width: 90 },
  { field: 'isbn', headerName: 'ISBN', width: 150 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'publisher', headerName: 'Publisher', width: 150 },
  {
    field: 'yearPublished',
    headerName: 'Year Published',
    type: 'number',
    width: 130,
  },
  {
    field: 'available',
    headerName: 'Available',
    type: 'boolean',
    width: 120,
  },
  {
    field: 'coverImageUrl',
    headerName: 'Cover Image URL',
    width: 200,
  },
];

export default function EditBooks() {
  const [books, setBooks] = useState<BookResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<BookResponseDto | null>(
    null
  );
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const client = useApi();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const response = await client.getBooks();
      if (response.success && response.data) {
        setBooks(response.data);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [client]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = () => {
    if (selectionModel.length === 1) {
      const bookToEdit = books.find(
        (book) => book.bookId === selectionModel[0]
      );
      if (bookToEdit) {
        setSelectedBook(bookToEdit);
        setOpenEditDialog(true);
      }
    }
  };

  const handleDeleteInDialog = async () => {
    if (selectedBook) {
      const response = await client.deleteBook(selectedBook.bookId ?? 0);
      if (response.success) {
        setBooks(books.filter((book) => book.bookId !== selectedBook.bookId));
        handleDialogClose();
      }
    }
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedBook(null);
  };

  const handleSave = async () => {
    // if (selectedBook) {
    //   const response = await client.updateBook(
    //     selectedBook.bookId,
    //     selectedBook
    //   );
    //   if (response.success) {
    //     setBooks((prevBooks) =>
    //       prevBooks.map((book) =>
    //         book.bookId === selectedBook.bookId ? selectedBook : book
    //       )
    //     );
    //   }
    //   handleDialogClose();
    // }
  };

  const handleInputChange =
    (field: keyof BookResponseDto) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedBook) {
        setSelectedBook({ ...selectedBook, [field]: event.target.value });
      }
    };

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ height: 'auto', width: '800px' }}>
      <h1>Edit Books</h1>
      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={filteredBooks}
        columns={columns}
        getRowId={(row) => row.bookId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(
          newSelectionModel: GridRowSelectionModel
        ) => {
          setSelectionModel(newSelectionModel);
        }}
        rowSelectionModel={selectionModel}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          disabled={selectionModel.length !== 1}
          sx={{ mr: 1, mb: 5 }}
        >
          Edit
        </Button>
      </Box>
      <Dialog open={openEditDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={selectedBook?.title || ''}
            onChange={handleInputChange('title')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Author"
            fullWidth
            value={selectedBook?.author || ''}
            onChange={handleInputChange('author')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="ISBN"
            fullWidth
            value={selectedBook?.isbn || ''}
            onChange={handleInputChange('isbn')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Publisher"
            fullWidth
            value={selectedBook?.publisher || ''}
            onChange={handleInputChange('publisher')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Year Published"
            fullWidth
            value={selectedBook?.yearPublished || ''}
            onChange={handleInputChange('yearPublished')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Available"
            fullWidth
            value={selectedBook?.available ? 'Yes' : 'No'}
            onChange={handleInputChange('available')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Cover Image URL"
            fullWidth
            value={selectedBook?.coverImageUrl || ''}
            onChange={handleInputChange('coverImageUrl')}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleDeleteInDialog} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
