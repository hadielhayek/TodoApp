import { IsNotEmpty, IsString, IsInt, IsBoolean, IsDateString } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  priority: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}