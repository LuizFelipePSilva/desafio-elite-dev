import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secret123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'secret123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  confirm_password: string;
}
