import "dotenv/config";
import { DataSource } from "typeorm";
import { Reserva } from "./entities/Reserva";
import { Mesa } from "./entities/Mesa";


export const AppDataSource = new DataSource({
type: "postgres",
host: process.env.DB_HOST,
port: Number(process.env.DB_PORT),
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
synchronize: true, // SOLO desarrollo
logging: true, // muestra el SQL en consola
entities: [Reserva, Mesa],
});
