export default async function isAdmin(req, res, next) {
  try {
    const userId = req?.user?.id;

    console.log(userId);

    res.json("Funciona")
} catch (error) {
    console.error(error);
    throw new Error("Se produjo un error en isAdmin");
  }
}
