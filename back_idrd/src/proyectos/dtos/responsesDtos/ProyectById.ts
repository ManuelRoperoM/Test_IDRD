import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Proyectos } from 'src/proyectos/entities/poryectos.entities';

export class ProyectById {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsOptional()
  msge?: string;

  @IsOptional()
  data?: Proyectos;
}
