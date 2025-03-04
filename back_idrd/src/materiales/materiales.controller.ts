import { Body, Controller, Post } from '@nestjs/common';
import { RegisterMaterialDto } from './dtos/requestsDtos/RegisterMaterialDto';
import { MaterialCreateDto } from './dtos/responsesDtos/MaterialCreateDto';
import { MaterialesService } from './materiales.service';

@Controller('materiales')
export class MaterialesController {
  constructor(private materialService: MaterialesService) {}
  @Post('register')
  async register(
    @Body() registerMaterial: RegisterMaterialDto,
  ): Promise<MaterialCreateDto> {
    return await this.materialService.registerMaterial(registerMaterial);
  }
}
