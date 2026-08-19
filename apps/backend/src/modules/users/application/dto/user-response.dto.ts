import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: ['ORGANIZER', 'CUSTOMER', 'GATEKEEPER'],
    example: 'CUSTOMER',
  })
  role: string;
}
