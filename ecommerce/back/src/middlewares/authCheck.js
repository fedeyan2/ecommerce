import responses from "../utils/responses.js";

export function isNOTAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res
      .status(400)
      .json(responses("Ya tenés una sesión activa.", false));
  }
  return next();
}

export function mustBeAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json(responses("Iniciá sesión para continuar.", false));
  }
  return next();
}
