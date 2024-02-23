import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardCategory } from '../interface/card.interface';

export class BaseCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tag: string;

  @ApiProperty()
  @IsEnum(CardCategory)
  @IsNotEmpty()
  category: CardCategory;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  nextReview: Date;

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  updatedAt: Date;
}
