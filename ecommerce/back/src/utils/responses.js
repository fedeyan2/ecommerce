export default function responses(message, bool) {
  const responseData = {};

  if (message && typeof message !== "string") {
    throw new Error("El mensaje debe ser una cadena de texto");
  }

  if (typeof message === "string" && message.length < 1) {
    throw new Error("El mensaje no puede estar vacio");
  }

  if (bool && typeof bool !== "boolean") {
    throw new Error("El parametro 'bool' recibe un valor booleano");
  }
  if (message) {
    responseData.message = message;
  }

  if (typeof bool === "boolean") {
    responseData.bool = bool;
  }

  return responseData
}
