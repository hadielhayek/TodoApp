import { Controller, Get, Post, Body, Put, Delete, Param, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import {  FileInterceptor } from '@nestjs/platform-express';
@Controller('todo')
@UseGuards(JwtAuthGuard) 
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(@Req() req) {
    return this.todoService.getAll(req.user); 
  }

  @Post()
  @UseInterceptors(FileInterceptor(''))
async create(@Req() req, @Body() todoDto: TodoDto) {
  return this.todoService.create(req.user, todoDto);
}
  @Put(':id')
  async update(@Req() req, @Param('id') id: number, @Body() todoDto: TodoDto) {
    return this.todoService.update(req.user, id, todoDto);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: number) {
    return this.todoService.delete(req.user, id); 
  }

  @Get('completed')
async getCompleted(@Req() req) {
  return this.todoService.getCompleted(req.user); 
}

}
