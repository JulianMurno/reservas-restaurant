import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Reserva } from "../entities/Reserva";
import { Mesa } from "../entities/Mesa";


const router = Router();
const reservaRepo = AppDataSource.getRepository(Reserva);
const mesaRepo = AppDataSource.getRepository(Mesa);


// Devuelve true si no se envió mesaId o si la mesa existe
async function mesaValida(mesaId: unknown): Promise<boolean> {
  if (mesaId === undefined || mesaId === null) return true;
  return mesaRepo.existsBy({ id: Number(mesaId) });
}


// CREAR
router.post("/", async (req, res) => {
  try {
    if (!(await mesaValida(req.body.mesaId))) {
      return res.status(400).json({ mensaje: "La mesa indicada no existe" });
    }
    const nueva = reservaRepo.create(req.body as Partial<Reserva>);
    const guardada = await reservaRepo.save(nueva);
    res.status(201).json(guardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
});


// LISTAR
router.get("/", async (_req, res) => {
  try {
    const reservas = await reservaRepo.find({ relations: { mesa: true }, order: { fecha: "ASC" } });
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar las reservas" });
  }
});


// OBTENER UNA
router.get("/:id", async (req, res) => {
  try {
    const reserva = await reservaRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: { mesa: true },
    });
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la reserva" });
  }
});


// ACTUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const reserva = await reservaRepo.findOneBy({ id: Number(req.params.id) });
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
    if (!(await mesaValida(req.body.mesaId))) {
      return res.status(400).json({ mensaje: "La mesa indicada no existe" });
    }
    reservaRepo.merge(reserva, req.body as Partial<Reserva>);
    const actualizada = await reservaRepo.save(reserva);
    res.json(actualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la reserva" });
  }
});


// ELIMINAR
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await reservaRepo.delete(Number(req.params.id));
    if (resultado.affected === 0) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la reserva" });
  }
});


export default router;
