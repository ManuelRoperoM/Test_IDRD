import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterProyectDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  ciudadId: number;
}
