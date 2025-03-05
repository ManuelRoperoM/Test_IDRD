import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddMaterialDto {
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsString()
  msge: string;
}
