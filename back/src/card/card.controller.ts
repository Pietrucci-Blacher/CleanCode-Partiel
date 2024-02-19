import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './entity/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { BaseCardDto } from './dto/base-card.dto';
import { AnswerCardDto } from './dto/answer-card.dto';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('quizz')
  @ApiOperation({ summary: 'Get a quiz' })
  @ApiQuery({ name: 'date', description: 'Date of the quiz' })
  @ApiResponse({
    status: 200,
    description: 'Return a quiz',
    type: [BaseCardDto],
  })
  quiz(@Query('date') date: string): Promise<Card[]> {
    return this.cardService.quizz(date);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiQuery({ name: 'tag', description: 'tag card' })
  @ApiResponse({
    status: 200,
    description: 'Return all cards.',
    type: [BaseCardDto],
  })
  findAll(@Query('tag') tag: string): Promise<Card[]> {
    if (tag) return this.cardService.findByTag(tag);
    return this.cardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by id' })
  @ApiParam({ name: 'id', description: 'Card id' })
  @ApiResponse({
    status: 200,
    description: 'Return a card by id',
    type: BaseCardDto,
  })
  findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created',
    type: BaseCardDto,
  })
  create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.create(createCardDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card by id' })
  @ApiParam({ name: 'id', description: 'Card id' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully updated',
    type: BaseCardDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Card id' })
  @ApiOperation({ summary: 'Delete a card by id' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.cardService.remove(id);
  }

  @Patch(':id/answer')
  @ApiParam({ name: 'id', description: 'Card id' })
  @ApiOperation({ summary: 'Update a card answer by id' })
  @ApiResponse({
    status: 204,
    description: 'The card has been successfully updated',
  })
  @HttpCode(204)
  answer(
    @Param('id') id: string,
    @Body() { isValid }: AnswerCardDto,
  ): Promise<void> {
    return this.cardService.answer(id, isValid);
  }
}
