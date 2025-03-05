import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProyectDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsNumber()
  @IsOptional()
  ciudadId?: number;
}
