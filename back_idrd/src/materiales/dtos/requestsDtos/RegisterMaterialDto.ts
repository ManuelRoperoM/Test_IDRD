import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterMaterialDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  unidad: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}
