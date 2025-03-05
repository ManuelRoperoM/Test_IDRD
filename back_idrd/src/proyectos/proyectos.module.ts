import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudades } from './entities/ciudades.entities';
import { Departamento } from './entities/departamento.entities';
import { Proyectos } from './entities/poryectos.entities';
import { Materiales } from 'src/materiales/entities/materiales.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ciudades, Departamento, Proyectos, Materiales]),
  ],
  providers: [ProyectosService],
  controllers: [ProyectosController],
})
export class ProyectosModule {}
