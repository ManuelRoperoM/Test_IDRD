import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { RegisterProyectDto } from './dtos/requestDtos/RegisterProyectDto';
import { ProyectCreteDto } from './dtos/responsesDtos/ProyectCreateDto';
import { ProyectById } from './dtos/responsesDtos/ProyectById';
import { ALlProyectsDto } from './dtos/responsesDtos/AllProyectsDto';
import { UpdateProyectDto } from './dtos/requestDtos/UpdateProyectDto';
import { ResUpdateProyectDto } from './dtos/responsesDtos/ResUpdateProyectDto';

@Controller('proyectos')
export class ProyectosController {
  constructor(private proyectoService: ProyectosService) {}
  @Post('create')
  async createProyect(
    @Body() data: RegisterProyectDto,
  ): Promise<ProyectCreteDto> {
    return await this.proyectoService.registerProyect(data);
  }

  @Get(':id')
  async getProyectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProyectById> {
    return this.proyectoService.getProyectById(id);
  }

  @Get()
  async getAllProyects(): Promise<ALlProyectsDto> {
    return this.proyectoService.getAllProyect();
  }

  @Put(':id')
  async updateProyect(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateProyectDto,
  ): Promise<ResUpdateProyectDto> {
    return this.proyectoService.updateProyectData(id, updateData);
  }

  @Delete(':id')
  async deleteProyect(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResUpdateProyectDto> {
    return this.proyectoService.deleteProyect(id);
  }
}
