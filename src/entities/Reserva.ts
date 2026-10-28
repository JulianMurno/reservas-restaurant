import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Mesa } from "./Mesa";


@Entity()
export class Reserva {
@PrimaryGeneratedColumn()
id: number;


 @Column()
 nombreCliente: string;


 @Column()
 telefono: string;


 @Column()
 cantidadPersonas: number;


 @Column({ type: "timestamp" })
 fecha: Date;


 @Column({ default: "pendiente" })
 estado: string;


 @Column({ type: "text", nullable: true })
 notas: string | null;


 @Column({ type: "int", nullable: true })
 mesaId: number | null;


 @ManyToOne(() => Mesa, (mesa) => mesa.reservas, { nullable: true, onDelete: "SET NULL" })
 @JoinColumn({ name: "mesaId" })
 mesa: Mesa | null;


}
