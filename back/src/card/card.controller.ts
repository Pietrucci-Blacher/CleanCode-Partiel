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
  @ApiOperation({ summary: 'Get all cards to review' })
  @ApiQuery({ name: 'date', description: 'Date to review' })
  @ApiResponse({
    status: 200,
    description: 'Return a quiz',
    type: [BaseCardDto],
  })
  quizz(@Query('date') date: string): Promise<Card[]> {
    return this.cardService.quizz(date);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiQuery({ name: 'tag', description: 'tag of card', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all cards.',
    type: [BaseCardDto],
  })
  findAll(@Query('tag') tag?: string): Promise<Card[]> {
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
  @ApiOperation({ summary: 'Delete a card by id' })
  @ApiParam({ name: 'id', description: 'Card id' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.cardService.remove(id);
  }

  @Patch(':id/answer')
  @ApiOperation({ summary: 'Respond to a card' })
  @ApiParam({ name: 'id', description: 'Card id' })
  @ApiResponse({
    status: 204,
    description: 'The card has been successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Card not found' })
  @HttpCode(204)
  async answer(
    @Param('id') id: string,
    @Body() { isValid }: AnswerCardDto,
  ): Promise<void> {
    await this.cardService.answer(id, isValid);
  }
}
