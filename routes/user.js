(() => {
  const express = require("express");
  const router = express.Router();
  const {
    getUsers,
    getUser,

    createUser,
    updateUser,
    deleteUser,
  } = require("../controllers/user");

  router.route("/").get(getUsers).post(createUser);

  router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

  module.exports = router;
})();
