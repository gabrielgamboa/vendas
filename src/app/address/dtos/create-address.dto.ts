import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty()
  @IsInt()
  number: number;

  @ApiProperty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsInt()
  cityId: number;
}
