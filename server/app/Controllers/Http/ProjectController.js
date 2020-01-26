"use strict";
const Project = use("App/Models/Project");
const Authorization = use("App/Services/Authorization");
class ProjectController {
  async index({ auth }) {
    const authUser = await auth.getUser();
    return await authUser.projects().fetch();
  }

  async create({ request, auth }) {
    const user = await auth.getUser();

    const { title } = request.all();
    const project = new Project();
    project.user_id = user.id;
    project.title = title;
    await project.save();
    return project;
  }

  async delete({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);
    Authorization.verifyPermission(project, user);
    // if (project.user_id !== user.id) {
    //   return {
    //     message: "fail",
    //     status: 403
    //   };
    // }
    await project.delete();
    return project;
  }
}

module.exports = ProjectController;
