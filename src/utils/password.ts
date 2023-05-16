import { compare, hash } from 'bcrypt';

export const createHashedPassword = async (
  password: string,
): Promise<string> => {
  const saltOrRounds = 10;
  return hash(password, saltOrRounds);
};

export const validatePassword = (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return compare(password, passwordHash);
};
