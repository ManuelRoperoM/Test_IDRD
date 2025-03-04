import { Injectable } from '@nestjs/common';
import { RegisterMaterialDto } from './dtos/requestsDtos/RegisterMaterialDto';
import { MaterialCreateDto } from './dtos/responsesDtos/MaterialCreateDto';
import { Repository } from 'typeorm';
import { Materiales } from './entities/materiales.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialById } from './dtos/responsesDtos/MaterialById';
import { AllMaterialsDTO } from './dtos/responsesDtos/AllMaterialsDto';
import { UpdateMaterialDto } from './dtos/requestsDtos/UpdateMaterialDto';
import { ResUpdateMaterialDto } from './dtos/responsesDtos/ResUpdateMaterialDto';

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

  async getAllMaterials(): Promise<AllMaterialsDTO> {
    try {
      const allMataterials = await this.materialRepository.find();
      return {
        status: 200,
        data: allMataterials,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async updateMaterialData(
    id: number,
    updateData: UpdateMaterialDto,
  ): Promise<ResUpdateMaterialDto> {
    try {
      const material = await this.materialRepository.findOneBy({ id });

      if (!material) {
        return {
          status: 500,
          msge: `No se encontro material por ID : ${id}`,
        };
      }
      Object.assign(material, updateData);

      await this.materialRepository.save(material);
      return {
        status: 200,
        msge: `Material: ${material.description}, actualizado exitosamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async deleteMaterial(id: number): Promise<ResUpdateMaterialDto> {
    try {
      const material = await this.materialRepository.delete(id);

      if (material.affected === 0) {
        return {
          status: 404,
          msge: `No se encontró material con id ${id}`,
        };
      }
      return {
        status: 200,
        msge: `Material con id ${id} eliminado correctamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
