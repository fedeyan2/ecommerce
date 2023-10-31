export default function expressValidatorErrors(array) {
  if (!array || !Array.isArray(array)) {
    throw new Error("La function expressValidatorErrors debe recibir un array");
  }
  const errorData = array?.map((e) => {
    return {
      message: e.msg,
      path: e.path,
    };
  });
  return errorData;
}
