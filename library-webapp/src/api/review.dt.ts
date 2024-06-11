export class ReviewDto {
  bookId: number | undefined;
  userId: string | undefined;
  review: string | undefined;
}

export class reviewResponseDto {
  bookId: number | undefined;
  userId: number | undefined;
  rating: number | undefined;
  comment: string | undefined;
}
