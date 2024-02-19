import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  answer?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tag?: string;
}
