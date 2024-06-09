import { UserDetails } from '../auth-context/authTypes';
import { BookDto } from './book.dto';

export interface LoanResponseDto {
  loanDate: Date;
  dueDate: Date;
  book: BookDto;
  user: UserDetails;
}

export class createLoanDto {
  bookId: number | undefined;
  userId: string | undefined;
  dueDate: Date | undefined;
}

export class getUserLoansDto {
  loandId: number | undefined;
  loanDate: Date | undefined;
  dueDate: Date | undefined;
  book: BookDto | undefined;
  user: UserLoanDetials | undefined;
}

export class UserLoanDetials {
  id: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

// "loanId": 3,
// "loanDate": 1717711200000,
// "dueDate": 1720303200000,
// "book": {
//     "bookId": 12,
//     "isbn": "978-0061120084",
//     "title": "To Kill a Mockingbird",
//     "author": "Harper Lee",
//     "publisher": "Harper Perennial Modern Classics",
//     "yearPublished": 2006,
//     "available": true,
//     "coverImageUrl": "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg"
// },
// "user": {
//     "id": 5,
//     "name": null,
//     "lastName": null,
//     "email": "reader3@email.com"
// }
