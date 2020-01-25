"use strict";
const Project = use("App/Models/Project");
class ProjectController {
  async index({ auth }) {
    const authUser = await auth.getUser();
    return await authUser.projects().fetch();
  }

  async create({ request, auth }) {
    const user = auth.getUser();
    const { title } = request.all();
    const project = new Project();
    project.user_id = user.id;
    project.title = title;
    await project.save();
    return project;
  }
}

module.exports = ProjectController;
