import { Proyectos } from 'src/proyectos/entities/poryectos.entities';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materiales')
export class Materiales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: false, default: 'UND' })
  unidad: string;

  @Column()
  precio: number;

  @ManyToMany(() => Proyectos, (proyecto) => proyecto.materiales)
  proyectos: Proyectos[];
}
