import { ReturnUserDto } from '../../user/dtos/return-user-dto';

export class ReturnLoginDto {
  accessToken: string;
  user: ReturnUserDto;
}
