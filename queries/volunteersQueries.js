const db = require("../db/db-config.js");

const getAllVolunteers = async () => {
  try {
    const allVolunteers = await db.any("SELECT * FROM volunteers");
    console.log(allVolunteers);
    return allVolunteers;
  } catch (error) {
    throw error;
  }
};

const getVolunteerById = async (id) => {
  try {
    const volunteer = await db.one("SELECT * FROM volunteers WHERE id=$1", id);
    return volunteer;
  } catch (error) {
    throw error;
  }
};

const createVolunteer = async (volunteer) => {
  const { organization_id, name, email, age } = volunteer;

  try {
    const newVolunteer = await db.one(
      "INSERT INTO volunteers (organization_id, name, email, age) VALUES($1, $2, $3, $4) RETURNING *",
      [organization_id, name, email, age]
    );
    return newVolunteer;
  } catch (error) {
    throw error;
  }
};

const deleteVolunteer = async (id) => {
  try {
    const deletedVolunteer = await db.one(
      "DELETE FROM volunteers WHERE id = $1 RETURNING *",
      id
    );
    return deletedVolunteer;
  } catch (error) {
    throw error;
  }
};

const updateVolunteer = async (id, volunteer) => {
  const { organization_id, name, email, age } = volunteer;

  try {
    const updatedVolunteer = await db.one(
      "UPDATE volunteers SET organization_id=$1, name=$2, email=$3, age=$4  WHERE id=$5 RETURNING *",
      [organization_id, name, email, age, id]
    );
    return updatedVolunteer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  deleteVolunteer,
  updateVolunteer,
};
