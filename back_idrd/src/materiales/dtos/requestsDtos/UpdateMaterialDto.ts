import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMaterialDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  unidad?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  precio?: number;
}
