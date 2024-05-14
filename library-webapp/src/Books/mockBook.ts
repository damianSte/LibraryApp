export interface BookType {
  BookID: string;
  ISBN: string;
  Title: string;
  Author: string;
  Publisher: string;
  YearPublished: number;
  AvailableCopies: number;
  coverImageUrl?: string;
}

export const mockBooks: BookType[] = [
  {
    BookID: '1',
    ISBN: '978-0451524935',
    Title: '1984',
    Author: 'George Orwell',
    Publisher: 'Signet Classic',
    YearPublished: 1950,
    AvailableCopies: 12,
    coverImageUrl:
      'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    BookID: '2',
    ISBN: '978-0061120084',
    Title: 'To Kill a Mockingbird',
    Author: 'Harper Lee',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 2006,
    AvailableCopies: 7,
    coverImageUrl:
      'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    BookID: '3',
    ISBN: '978-0451524935',
    Title: 'The Great Gatsby',
    Author: 'F. Scott Fitzgerald',
    Publisher: 'Signet Classic',
    YearPublished: 1925,
    AvailableCopies: 5,
    coverImageUrl:
      'https://m.media-amazon.com/images/I/61z0MrB6qOS._AC_UF1000,1000_QL80_DpWeblab_.jpg',
  },
  {
    BookID: '4',
    ISBN: '978-0061120084',
    Title: 'Pride and Prejudice',
    Author: 'Jane Austen',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1813,
    AvailableCopies: 3,
    coverImageUrl:
      'https://readaloudrevival.com/wp-content/uploads/2016/05/Pride-and-Prejudice.png.webp',
  },
  {
    BookID: '5',
    ISBN: '978-0451524935',
    Title: 'The Catcher in the Rye',
    Author: 'J. D. Salinger',
    Publisher: 'Signet Classic',
    YearPublished: 1951,
    AvailableCopies: 10,
    coverImageUrl:
      'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF894,1000_QL80_DpWeblab_.jpg',
  },

  {
    BookID: '8',
    ISBN: '978-0061120084',
    Title: 'Sense and Sensibility',
    Author: 'Jane Austen',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1811,
    AvailableCopies: 6,
    coverImageUrl:
      'https://m.media-amazon.com/images/I/71fYC-M-KnL._AC_UF894,1000_QL80_.jpg',
  },
  {
    BookID: '9',
    ISBN: '978-0451524935',
    Title: 'The Picture of Dorian Gray',
    Author: 'Oscar Wilde',
    Publisher: 'Signet Classic',
    YearPublished: 1890,
    AvailableCopies: 4,
    coverImageUrl:
      'https://covers.storytel.com/jpg-640/9782378072513.ae79b1db-de10-4c0b-89cb-e995b01c9070?optimize=high&quality=70',
  },
  {
    BookID: '10',
    ISBN: '978-0061120084',
    Title: 'The Importance of Being Earnest',
    Author: 'Shakespeare',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1600,
    AvailableCopies: 9,
    coverImageUrl:
      'https://m.media-amazon.com/images/I/71bsCt1u-hL._AC_UF894,1000_QL80_.jpg',
  },

  {
    BookID: '7',
    ISBN: '978-0451524935',
    Title: 'The Grapes of Wrath',
    Author: 'John Steinbeck',
    Publisher: 'Signet Classic',
    YearPublished: 1939,
    AvailableCopies: 8,
    coverImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Grapes_of_Wrath_%281939_1st_ed_cover%29.jpg',
  },
];
