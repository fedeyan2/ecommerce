import responses from "../../../utils/responses.js";

export default function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("ERROR::::::: -- --- --- ---Error al cerrar sesión.");
      return res.json(
        responses("Error al cerrar sesión, comunicate con el soporte.", false)
      );
    }
    return res.json(responses("Cerraste sesion", true));
  });
}
