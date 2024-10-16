const express = require("express");
const volunteers = express.Router();
const {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
} = require("../queries/volunteersQueries");

// INDEX
volunteers.get("/", async (req, res) => {
  try {
    const allVolunteers = await getAllVolunteers();
    res.status(200).json(allVolunteers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// SHOW
volunteers.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const volunteer = await getVolunteerById(id);
    if (volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE
volunteers.post("/", async (req, res) => {
  try {
    const newVolunteer = await createVolunteer(req.body);
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE
volunteers.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVolunteer = await updateVolunteer(id, req.body);
    if (updatedVolunteer) {
      res.status(200).json(updatedVolunteer);
    } else {
      res.status(404).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
volunteers.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVolunteer = await deleteVolunteer(id);
    if (deletedVolunteer) {
      res.status(200).json(deletedVolunteer);
    } else {
      res.status(404).json({ error: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = volunteers;
