import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TodoDto } from './todo.dto';
import { Todo, User } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(user: User): Promise<Todo[]> {
    return this.prismaService.client.todo.findMany({
      where: { userId: user.id },
      orderBy: [
        { date: 'asc' },
        { priority: 'asc' },
      ],    });
  }

  async create(user: User, todoDto: TodoDto): Promise<Todo> {
    console.log(user)
    console.log(todoDto)
    const todo = await this.prismaService.client.todo.create({
      data: {
        description: todoDto.description,
        priority: todoDto.priority,
        date: new Date(todoDto.date),
        completed: false,
        user: { connect: { id: user.id } },
      },
    });

    return todo;
  }

  async update(user: User, id: number, todoDto: TodoDto): Promise<Todo> {
    const existingTodo = await this.prismaService.client.todo.findUnique({
      where: { id: Number(id) },  
      });

    if (!existingTodo || existingTodo.userId !== user.id) {
      throw new NotFoundException('Todo not found');
    }

    const updatedTodo = await this.prismaService.client.todo.update({
      where: { id: Number(id) },
            data: {
        description: todoDto.description,
        priority: todoDto.priority,
        date: todoDto.date,
        completed: todoDto.completed,
      },
    });

    return updatedTodo;
  }

  async delete(user: User, id: number): Promise<void> {
    const existingTodo = await this.prismaService.client.todo.findUnique({
      where: { id: Number(id) }, 
        });

    if (!existingTodo || existingTodo.userId !== user.id) {
      throw new NotFoundException('Todo not found');
    }

    await this.prismaService.client.todo.delete({ where: { id: Number(id) } });
  }

  async getCompleted(user: User): Promise<Todo[]> {
    return this.prismaService.client.todo.findMany({
      where: { userId: user.id, completed: true },
      orderBy: { date: 'asc', priority: 'asc' },
    });
  }
}
