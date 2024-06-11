export class BookDto {
  bookId: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: number | undefined;
  available: boolean | undefined;
  coverImageUrl: string | undefined;
}

export class BookResponseDto {
  bookId: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: number | undefined;
  available: boolean | undefined;
  coverImageUrl: string | undefined;
}
