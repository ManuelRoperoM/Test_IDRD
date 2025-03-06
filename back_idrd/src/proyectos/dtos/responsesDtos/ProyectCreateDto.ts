import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Proyectos } from 'src/proyectos/entities/poryectos.entities';

export class ProyectCreteDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  msge: string;

  @IsOptional()
  data?: Proyectos;
}
