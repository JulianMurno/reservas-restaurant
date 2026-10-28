// Datos que el cliente puede enviar para crear una mesa
export interface CrearMesaDto {
  numero: number;
  capacidad: number;
  ubicacion?: string;
  activa?: boolean;
}


// Al actualizar, todos los campos son opcionales
export type ActualizarMesaDto = Partial<CrearMesaDto>;


// Valida el body y devuelve solo los campos permitidos (ignora id, reservas, etc.)
export function validarMesaDto(body: any, parcial = false) {
  const errores: string[] = [];
  const dto: ActualizarMesaDto = {};

  if (body.numero !== undefined) {
    if (!Number.isInteger(body.numero) || body.numero < 1) {
      errores.push("numero debe ser un entero mayor que 0");
    } else dto.numero = body.numero;
  } else if (!parcial) errores.push("numero es obligatorio");

  if (body.capacidad !== undefined) {
    if (!Number.isInteger(body.capacidad) || body.capacidad < 1) {
      errores.push("capacidad debe ser un entero mayor que 0");
    } else dto.capacidad = body.capacidad;
  } else if (!parcial) errores.push("capacidad es obligatoria");

  if (body.ubicacion !== undefined) {
    if (typeof body.ubicacion !== "string" || body.ubicacion.trim() === "") {
      errores.push("ubicacion debe ser un texto no vacío");
    } else dto.ubicacion = body.ubicacion.trim();
  }

  if (body.activa !== undefined) {
    if (typeof body.activa !== "boolean") {
      errores.push("activa debe ser true o false");
    } else dto.activa = body.activa;
  }

  return { dto, errores };
}
