import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materiales } from './entities/materiales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materiales])],
  providers: [MaterialesService],
  controllers: [MaterialesController],
})
export class MaterialesModule {}
