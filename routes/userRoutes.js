const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { verifyToken } = require('../middleware/authmiddleware');

const {
  createUser,
  findAllUser,
  updateByUserId,
  deleteByUserID,
  loginCheck,
} = require("../controller/userController");

router.post("/register", createUser);

router.get("/", findAllUser);

router.post("/login", loginCheck);

router.patch("/:id",verifyToken, updateByUserId);

router.delete("/:id",verifyToken, deleteByUserID);

module.exports = router;
