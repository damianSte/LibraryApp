import { BookDto } from './book.dto';

//used
export interface LoanResponseDto {
  loanDate: Date;
  dueDate: Date;
  book: BookDto;
}

//used
export class createLoanDto {
  bookId: number | undefined;
  userId: number | undefined;
  dueDate: Date | undefined;
}

//used
export class getUserLoansDto {
  loandId: number | undefined;
  loanDate: Date | undefined;
  dueDate: Date | undefined;
  book: BookDto | undefined;
}

// Used
export class getLoansPageResponseDto {
  loans: getUserLoansDto[] | undefined;
  currantPage: number | undefined;
  totalPage: number | undefined;
  totalItems: number | undefined;
  hasMore: boolean | undefined;
}
