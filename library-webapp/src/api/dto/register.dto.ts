export class RegisterDto {
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
  email: string | undefined;
}

export class RegisterResponseDto {
  userId: number | undefined;
  username: string | undefined;
  role: string | undefined;
}
