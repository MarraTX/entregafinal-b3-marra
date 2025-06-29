import ExpressRouter from "express";
import { middLogg } from "../../config/logger.js";
import upload from "../../config/multer.js";
import { passportCall } from "../../utils/utils.js";

export default class Router {
  router;

  constructor() {
    this.router = ExpressRouter();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCallbacks(callbacks) {
    return async (req, res, next) => {
      try {
        const params = [req, res, next];
        for (const callback of callbacks) {
          await callback.apply(this, params);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    };
  }

  handleRoles = (roles) => {
    return (req, res, next) => {
      if (roles[0] === "PUBLIC") return next();
      if (!req.user) {
        return res.status(401).json({ error: "No autenticado" });
      }
      const userRole = req.user.role;
      if (
        !roles.some((role) => userRole.toUpperCase() === role.toUpperCase())
      ) {
        return res.status(403).json({
          error: "No tienes permisos para acceder a esta ruta",
          requiredRoles: roles,
          userRole: userRole,
        });
      }
      next();
    };
  };

  get(path, roles, ...callbacks) {
    this.router.get(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, roles, ...args) {
    let multerField = null;
    let callbacks = args;
    if (args[0] && typeof args[0] === 'object' && args[0].multer) {
      multerField = args[0].multer;
      callbacks = args.slice(1);
    }
    const middlewares = [
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
    ];
    if (multerField === 'image' || multerField === 'document') {
      middlewares.push(upload.single(multerField));
    }
    middlewares.push(this.applyCallbacks(callbacks));
    this.router.post(path, ...middlewares);
  }

  put(path, roles, ...args) {
    let multerField = null;
    let callbacks = args;
    if (args[0] && typeof args[0] === 'object' && args[0].multer) {
      multerField = args[0].multer;
      callbacks = args.slice(1);
    }
    const middlewares = [
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
    ];
    if (multerField === 'image' || multerField === 'document') {
      middlewares.push(upload.single(multerField));
    }
    middlewares.push(this.applyCallbacks(callbacks));
    this.router.put(path, ...middlewares);
  }

  patch(path, roles, ...args) {
    let multerField = null;
    let callbacks = args;
    if (args[0] && typeof args[0] === 'object' && args[0].multer) {
      multerField = args[0].multer;
      callbacks = args.slice(1);
    }
    const middlewares = [
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
    ];
    if (multerField === 'image' || multerField === 'document') {
      middlewares.push(upload.single(multerField));
    }
    middlewares.push(this.applyCallbacks(callbacks));
    this.router.patch(path, ...middlewares);
  }

  delete(path, roles, ...callbacks) {
    this.router.delete(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }
}
