const express = require("express");
const router = express.Router();
const {
  getParticipants,
  postParticipants,
} = require("../controllers/participantsController");

router.get("/", getParticipants).post("/", postParticipants);

// router.delete("/:id", delEntries);

module.exports = router;
