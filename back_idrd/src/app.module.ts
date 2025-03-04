import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialesModule } from './materiales/materiales.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materiales } from './materiales/entities/materiales.entity';
import { Ciudades } from './proyectos/entities/ciudades.entities';
import { Proyectos } from './proyectos/entities/poryectos.entities';
import { Departamento } from './proyectos/entities/departamento.entities';

@Module({
  imports: [
    MaterialesModule,
    ProyectosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'IDRD_TEST',
      entities: [Materiales, Proyectos, Ciudades, Departamento],
      synchronize: true, //Desactivar en PRODUCCION
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
