"use strict";

const Project = use("App/Models/Project");
const Task = use("App/Models/Task");
class TaskController {
  async create({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const { description } = request.all();
    const project = await Project.find(id);
    const task = new Task();
    task.fill({ description });
    await project.tasks().save(task);
    return task;
  }

  async index({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);
    const task = await project.tasks().fetch();
    return task;
  }

  async delete({ auth, request, params }) {
    const { id } = params;
    const task = await Task.find(id);
    await task.delete();
    return task;
  }

  async update({ auth, request, params }) {
    const { id } = params;
    const task = await Task.find(id);
    const { description } = request.all();
    task.merge({ description });
    await task.save();
    return task;
  }
}

module.exports = TaskController;
