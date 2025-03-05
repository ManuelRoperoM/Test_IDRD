import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProyectCreteDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  msge: string;
}
