import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Mesa } from "../entities/Mesa";
import { validarMesaDto } from "../dtos/mesa.dto";


const router = Router();
const mesaRepo = AppDataSource.getRepository(Mesa);


// CREAR
router.post("/", async (req, res) => {
  try {
    const { dto, errores } = validarMesaDto(req.body ?? {});
    if (errores.length > 0) {
      return res.status(400).json({ mensaje: "Datos inválidos", errores });
    }
    const nueva = mesaRepo.create(dto);
    const guardada = await mesaRepo.save(nueva);
    res.status(201).json(guardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la mesa" });
  }
});


// LISTAR
router.get("/", async (_req, res) => {
  try {
    const mesas = await mesaRepo.find({ order: { numero: "ASC" } });
    res.json(mesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar las mesas" });
  }
});


// OBTENER UNA
router.get("/:id", async (req, res) => {
  try {
    const mesa = await mesaRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: { reservas: true },
    });
    if (!mesa) {
      return res.status(404).json({ mensaje: "Mesa no encontrada" });
    }
    res.json(mesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la mesa" });
  }
});


// ACTUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const mesa = await mesaRepo.findOneBy({ id: Number(req.params.id) });
    if (!mesa) {
      return res.status(404).json({ mensaje: "Mesa no encontrada" });
    }
    const { dto, errores } = validarMesaDto(req.body ?? {}, true);
    if (errores.length > 0) {
      return res.status(400).json({ mensaje: "Datos inválidos", errores });
    }
    mesaRepo.merge(mesa, dto);
    const actualizada = await mesaRepo.save(mesa);
    res.json(actualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la mesa" });
  }
});


// ELIMINAR
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await mesaRepo.delete(Number(req.params.id));
    if (resultado.affected === 0) {
      return res.status(404).json({ mensaje: "Mesa no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la mesa" });
  }
});


export default router;
