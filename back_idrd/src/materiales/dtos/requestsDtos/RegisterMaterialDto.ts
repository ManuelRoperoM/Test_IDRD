import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterMaterialDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  unidad: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}
