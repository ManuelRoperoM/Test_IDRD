import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ciudades } from './ciudades.entities';
import { Materiales } from 'src/materiales/entities/materiales.entity';

@Entity('proyectos')
export class Proyectos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Ciudades, (ciudad) => ciudad.proyecto, {
    onDelete: 'CASCADE',
  }) // n a 1
  @JoinColumn({ name: 'ciudad_id' })
  ciudad: Ciudades;

  @ManyToMany(() => Materiales, (material) => material.proyectos, {
    cascade: true,
  })
  @JoinTable()
  materiales: Materiales[];
}
