import { UserDetails } from '../../auth-context/authTypes';
import { BookDto } from './book.dto';
import { MeDetails } from './me.dto';

export class CreateReviewDto {
  bookId: number | undefined;
  userId: number | undefined;
  comment: string | undefined;
  rating: number | undefined;
}

export class ReviewResponseDto {
  reviewId: number | undefined;
  bookId: BookDto | undefined;
  userId: UserDetails | undefined;
  rating: number | undefined;
  comment: string | undefined;
  reviewDate: Date | undefined;
}

export class ReviewResponseListDto {
  reviews: ReviewResponseDto[] | undefined;
}

export class getBookReviewsDto {
  reviewdId: number | undefined;
  comment: string | undefined;
  rating: number | undefined;
  userId: UserDetails | undefined;
  book: BookDto | undefined;
}
