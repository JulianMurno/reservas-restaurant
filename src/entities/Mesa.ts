import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reserva } from "./Reserva";


@Entity()
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ unique: true })
  numero: number;


  @Column()
  capacidad: number;


  @Column({ default: "salon" })
  ubicacion: string;


  @Column({ default: true })
  activa: boolean;


  @OneToMany(() => Reserva, (reserva) => reserva.mesa)
  reservas: Reserva[];
}
