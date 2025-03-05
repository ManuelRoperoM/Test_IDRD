import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyectos } from './entities/poryectos.entities';
import { In, Repository } from 'typeorm';
import { Ciudades } from './entities/ciudades.entities';
import { RegisterProyectDto } from './dtos/requestDtos/RegisterProyectDto';
import { ProyectCreteDto } from './dtos/responsesDtos/ProyectCreateDto';
import { ProyectById } from './dtos/responsesDtos/ProyectById';
import { ALlProyectsDto } from './dtos/responsesDtos/AllProyectsDto';
import { UpdateProyectDto } from './dtos/requestDtos/UpdateProyectDto';
import { ResUpdateProyectDto } from './dtos/responsesDtos/ResUpdateProyectDto';
import { AddMaterialDto } from './dtos/responsesDtos/AddMaterialDto';
import { Materiales } from 'src/materiales/entities/materiales.entity';
import { MaterialAddDto } from './dtos/requestDtos/MaterialAddDto';
import { Departamento } from './entities/departamento.entities';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyectos)
    private proyectoRepository: Repository<Proyectos>,
    @InjectRepository(Ciudades)
    private ciudadRepsitory: Repository<Ciudades>,
    @InjectRepository(Materiales)
    private materialRepository: Repository<Materiales>,
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  async registerProyect(data: RegisterProyectDto): Promise<ProyectCreteDto> {
    try {
      const ciudad = await this.ciudadRepsitory.findOneBy({
        id: data.ciudadId,
      });
      if (!ciudad) {
        return {
          status: 404,
          msge: `No se encontro ciudad por id: ${data.ciudadId}`,
        };
      }
      const newProyect = this.proyectoRepository.create({
        nombre: data.nombre,
        ciudad: ciudad,
      });
      await this.proyectoRepository.save(newProyect);
      return {
        status: 200,
        msge: `Proyecto ${newProyect.nombre} creado exitosamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getProyectById(id: number): Promise<ProyectById> {
    try {
      const proyecto = await this.proyectoRepository.findOne({
        where: { id },
        relations: ['materiales', 'ciudad', 'ciudad.departamento'],
      });
      if (!proyecto) {
        return {
          status: 404,
          msge: `No se encontro proyecto con ID ${id}`,
        };
      }
      return {
        status: 200,
        data: proyecto,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getAllProyect(): Promise<ALlProyectsDto> {
    try {
      const proyects = await this.proyectoRepository.find({
        relations: ['materiales', 'ciudad', 'ciudad.departamento'],
      });
      return {
        status: 200,
        data: proyects,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async updateProyectData(
    id: number,
    updateData: UpdateProyectDto,
  ): Promise<ResUpdateProyectDto> {
    try {
      const proyecto = await this.proyectoRepository.findOneBy({ id });
      if (!proyecto) {
        return {
          status: 400,
          msge: `No se encontro proyecto por ID : ${id}`,
        };
      }
      if (updateData.ciudadId) {
        const ciudad = await this.ciudadRepsitory.findOneBy({
          id: updateData.ciudadId,
        });
        if (!ciudad) {
          return {
            status: 400,
            msge: `No se encontro ciudad por ID : ${updateData.ciudadId}`,
          };
        }
        proyecto.ciudad = ciudad;
      }
      Object.assign(proyecto, updateData);

      await this.proyectoRepository.save(proyecto);
      return {
        status: 200,
        msge: `Material: ${proyecto.nombre}, actualizado exitosamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async deleteProyect(id: number): Promise<ResUpdateProyectDto> {
    try {
      const proyecto = await this.proyectoRepository.delete(id);
      if (proyecto.affected === 0) {
        return {
          status: 400,
          msge: `No se encontro proyecto con id: ${id}`,
        };
      }
      return {
        status: 200,
        msge: `Proyecto con id: ${id}, eliminado correctamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async addMaterialsToProject(
    projectId: number,
    materialsIds: MaterialAddDto,
  ): Promise<AddMaterialDto> {
    try {
      const proyecto = await this.proyectoRepository.findOne({
        where: { id: projectId },
        relations: ['materiales'],
      });

      if (!proyecto) {
        return {
          status: 404,
          msge: `No se encontro proyecto con el ID: ${projectId}`,
        };
      }

      const materiales = await this.materialRepository.findBy({
        id: In(materialsIds.materialsIds),
      });

      if (materiales.length === 0) {
        return {
          status: 404,
          msge: `No se encontraron materiales con los id: ${materialsIds}`,
        };
      }

      proyecto.materiales = [...proyecto.materiales, ...materiales];
      await this.proyectoRepository.save(proyecto);
      return {
        status: 200,
        msge: `Materiales agregados al ${proyecto.nombre} exitosamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }
  async getAllDepartamentos(): Promise<{
    status: number;
    data?: Departamento[];
    msge?: string;
  }> {
    try {
      const departamentos = await this.departamentoRepository.find({
        relations: ['ciudad'],
      });
      return {
        status: 200,
        data: departamentos,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
