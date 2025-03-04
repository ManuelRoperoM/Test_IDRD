import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ciudades } from './ciudades.entities';

@Entity('departamento')
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Ciudades, (ciudad) => ciudad.departamento) // relacion 1 a n
  ciudad: Ciudades[];
}
