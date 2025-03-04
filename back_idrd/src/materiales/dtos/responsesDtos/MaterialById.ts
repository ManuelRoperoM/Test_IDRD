import { IsNotEmpty, IsNumber } from 'class-validator';
import { Materiales } from 'src/materiales/entities/materiales.entity';

export class MaterialById {
  @IsNotEmpty()
  @IsNumber()
  status: number;
  data?: Materiales;
  msge?: string;
}
