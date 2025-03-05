import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResUpdateProyectDto {
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsString()
  msge: string;
}
