const express = require("express");
const requests = express.Router();
const {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
} = require("../queries/requestsQueries");

requests.get("/", async (req, res) => {
    try {
        const allRequests = await getAllRequests();
        res.status(200).json(allRequests);
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
});

requests.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const request = await getRequestById(id);
        if (request) {
            res.json(request);
        } else {
            res.status(404).json({ error: "Request not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

requests.post("/", async (req, res) => {
    try {
        const newRequest = await createRequest(req.body);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

requests.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRequest = await updateRequest(id, req.body);
        if (updatedRequest) {
            res.status(200).json(updatedRequest);
        } else {
            res.status(404).json({ error: "Request not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

requests.delete("/:id", async (req, res) => {
    const { id } = req.params;
    // try {
        const deletedRequest = await deleteRequest(id);
        if (deletedRequest) {
            res.status(200).json(deletedRequest);
        } else {
            res.status(404).json({ error: "Request not found" });
        }
    // } catch (error) {
    //     res.status(500).json({ error: "Server error" });
    // }
});

module.exports = requests;