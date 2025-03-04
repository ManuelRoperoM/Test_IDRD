import { Injectable } from '@nestjs/common';
import { RegisterMaterialDto } from './dtos/requestsDtos/RegisterMaterialDto';
import { MaterialCreateDto } from './dtos/responsesDtos/MaterialCreateDto';
import { Repository } from 'typeorm';
import { Materiales } from './entities/materiales.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialById } from './dtos/responsesDtos/MaterialById';

@Injectable()
export class MaterialesService {
  constructor(
    @InjectRepository(Materiales)
    private materialRepository: Repository<Materiales>,
  ) {}
  async registerMaterial(
    data: RegisterMaterialDto,
  ): Promise<MaterialCreateDto> {
    try {
      const newMaterial = this.materialRepository.create({
        description: data.description,
        unidad: data.unidad,
        precio: data.precio,
      });
      await this.materialRepository.save(newMaterial);
      const payload = {
        status: 200,
        msge: `${newMaterial.description} Creado correctamente con id: ${newMaterial.id}`,
      };
      return payload;
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getMaterialByID(id: number): Promise<MaterialById> {
    try {
      const material = await this.materialRepository.findOneBy({ id });
      if (!material) {
        return {
          status: 404,
          msge: `No se encontro material por ${id}`,
        };
      }
      return { status: 200, data: material };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
