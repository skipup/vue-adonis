"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  //##  Auth Route
  Route.post("/register", "UserController.register");
  Route.post("/login", "UserController.login");
  //##  Project Route
  Route.get("/project", "ProjectController.index").middleware("auth");
  Route.post("/project", "ProjectController.create").middleware("auth");
  Route.delete("/project/delete/:id", "ProjectController.delete").middleware(
    "auth"
  );
  Route.patch("/project/update/:id", "ProjectController.update").middleware(
    "auth"
  );
  //##  Task Route
  Route.post("/project/:id/task", "TaskController.create").middleware("auth");
  Route.get("/project/:id/task", "TaskController.index").middleware("auth");
  Route.delete("/task/:id", "TaskController.delete").middleware("auth");
  Route.patch("/task/:id", "TaskController.update").middleware("auth");
}).prefix("/api/v0");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
