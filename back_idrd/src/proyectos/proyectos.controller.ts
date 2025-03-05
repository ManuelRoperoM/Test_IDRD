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
import { AddMaterialDto } from './dtos/responsesDtos/AddMaterialDto';
import { MaterialAddDto } from './dtos/requestDtos/MaterialAddDto';

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
    return await this.proyectoService.getProyectById(id);
  }

  @Get()
  async getAllProyects(): Promise<ALlProyectsDto> {
    return await this.proyectoService.getAllProyect();
  }

  @Put(':id')
  async updateProyect(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateProyectDto,
  ): Promise<ResUpdateProyectDto> {
    return await this.proyectoService.updateProyectData(id, updateData);
  }

  @Delete(':id')
  async deleteProyect(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResUpdateProyectDto> {
    return await this.proyectoService.deleteProyect(id);
  }

  @Post('/:id/materiales')
  async addProductInProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() materialsIds: MaterialAddDto,
  ): Promise<AddMaterialDto> {
    return await this.proyectoService.addMaterialsToProject(id, materialsIds);
  }
}
