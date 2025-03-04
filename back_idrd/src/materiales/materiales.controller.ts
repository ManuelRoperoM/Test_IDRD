import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RegisterMaterialDto } from './dtos/requestsDtos/RegisterMaterialDto';
import { MaterialCreateDto } from './dtos/responsesDtos/MaterialCreateDto';
import { MaterialesService } from './materiales.service';
import { MaterialById } from './dtos/responsesDtos/MaterialById';

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
}
