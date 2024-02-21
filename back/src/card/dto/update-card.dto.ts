import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  answer?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tag?: string;
}
