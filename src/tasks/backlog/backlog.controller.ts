import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateBacklogItemRequestDto,
  BacklogItemResponseDto,
} from '../dtos/create-task.dto';
import { EditBacklogItemRequestDto } from '../dtos/edit-task.dto';
import { BacklogService } from '../../services/backlog/backlog.service';

@Controller('backlog')
export class BacklogController {
  constructor(private service: BacklogService) {}
  @Post()
  async createBacklogItem(
    @Body() createBacklogItemRequestDto: CreateBacklogItemRequestDto,
  ): Promise<BacklogItemResponseDto> {
    return await this.service.createBacklogItem(createBacklogItemRequestDto);
  }

  @Get()
  async getAllBacklogItems(
    @Query('label') label: string,
    @Query('name') name: string,
    @Query('points') points: number,
  ): Promise<BacklogItemResponseDto[]> {
    return await this.service.getAllBacklogItems(label, name, points);
  }

  @Get(':id')
  async getBacklogItem(
    @Param('id') id: string,
  ): Promise<BacklogItemResponseDto> {
    return await this.service.getBacklogItem(id);
  }

  @Patch(':id')
  async editBacklogItem(
    @Param('id') id: string,
    @Body() editBacklogItemRequestDto: EditBacklogItemRequestDto,
  ): Promise<BacklogItemResponseDto> {
    return await this.service.editBacklogItem(id, editBacklogItemRequestDto);
  }

  @Delete(':id')
  async deleteBacklogItem(@Param('id') id: string) {
    return await this.service.deleteBacklogItem(id);
  }
}
