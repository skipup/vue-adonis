class Authorization {
  verifyPermission(resource, user) {
    if (resource.user_id !== user.id) {
      throw new Error("Dont Have Permission"); //todo user permission deny
    }
  }
}

module.exports = new Authorization();
