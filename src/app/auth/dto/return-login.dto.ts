import { ReturnUserDto } from 'src/app/user/dtos/return-user-dto';

export class ReturnLoginDto {
  accessToken: string;
  user: ReturnUserDto;
}
