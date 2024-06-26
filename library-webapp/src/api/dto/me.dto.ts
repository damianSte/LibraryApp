export class MeDetails {
  id: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  role: string | undefined;
}

export class AddNameAndLastNameDto {
  userId: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
}
