import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudades } from './entities/ciudades.entities';
import { Departamento } from './entities/departamento.entities';
import { Proyectos } from './entities/poryectos.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudades, Departamento, Proyectos])],
  providers: [ProyectosService],
  controllers: [ProyectosController],
})
export class ProyectosModule {}
