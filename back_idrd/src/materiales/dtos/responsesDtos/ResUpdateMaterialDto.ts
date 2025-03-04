import { IsNumber, IsString } from 'class-validator';

export class ResUpdateMaterialDto {
  @IsNumber()
  status: number;

  @IsString()
  msge: string;
}
