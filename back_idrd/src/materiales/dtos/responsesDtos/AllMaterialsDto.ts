import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Materiales } from 'src/materiales/entities/materiales.entity';

export class AllMaterialsDTO {
  @IsNumber()
  status: number;

  @IsOptional()
  data?: Materiales[];

  @IsString()
  @IsOptional()
  msge?: string;
}
