import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RegisterMaterialDto } from './dtos/requestsDtos/RegisterMaterialDto';
import { MaterialCreateDto } from './dtos/responsesDtos/MaterialCreateDto';
import { MaterialesService } from './materiales.service';
import { MaterialById } from './dtos/responsesDtos/MaterialById';
import { AllMaterialsDTO } from './dtos/responsesDtos/AllMaterialsDto';
import { ResUpdateMaterialDto } from './dtos/responsesDtos/ResUpdateMaterialDto';
import { UpdateMaterialDto } from './dtos/requestsDtos/UpdateMaterialDto';

@Controller('materiales')
export class MaterialesController {
  constructor(private materialService: MaterialesService) {}
  @Post('register')
  async register(
    @Body() registerMaterial: RegisterMaterialDto,
  ): Promise<MaterialCreateDto> {
    return await this.materialService.registerMaterial(registerMaterial);
  }

  @Get(':id')
  async getMaterialById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MaterialById> {
    return await this.materialService.getMaterialByID(id);
  }
  @Get()
  async getAllMaterials(): Promise<AllMaterialsDTO> {
    return await this.materialService.getAllMaterials();
  }
  @Put(':id')
  async updateMaterial(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateMaterialDto,
  ): Promise<ResUpdateMaterialDto> {
    return await this.materialService.updateMaterialData(id, updateData);
  }
}
