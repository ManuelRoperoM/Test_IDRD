import { IsArray, IsNumber } from 'class-validator';

export class MaterialAddDto {
  @IsArray()
  @IsNumber({}, { each: true })
  materialsIds: number[];
}
