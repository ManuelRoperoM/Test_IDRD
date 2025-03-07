import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Materiales } from 'src/materiales/entities/materiales.entity';

export class MaterialById {
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsOptional()
  data?: Materiales;

  @IsOptional()
  msge?: string;
}
