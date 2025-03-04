import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MaterialCreateDto {
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsString()
  msge: string;
}
