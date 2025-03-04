import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departamento } from './departamento.entities';
import { Proyectos } from './poryectos.entities';

@Entity('ciudades')
export class Ciudades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.ciudad, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento;

  @OneToMany(() => Proyectos, (proyecto) => proyecto.ciudad)
  proyecto: Proyectos[];
}
