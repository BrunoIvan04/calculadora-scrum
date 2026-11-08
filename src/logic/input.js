/**
 * Funciones para editar la operación que el usuario está capturando.
 */

/**
 * Elimina el último carácter de la captura.
 * Si la captura está vacía, la regresa sin cambios.
 */
export function deleteLastChar(input) {
  if (typeof input !== 'string' || input.length === 0) {
    return '';
  }
  // Array.from respeta caracteres como "×" y "÷" aunque ocupen más de un byte.
  return Array.from(input).slice(0, -1).join('');
}
