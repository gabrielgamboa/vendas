import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(data: CreateUserDto): Promise<User> {
    return {
      ...data,
      id: 1,
    };
  }
}
