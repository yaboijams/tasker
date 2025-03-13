const List = require("../models/List");

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find({});
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Failed to fetch lists" });
  }
};

exports.createList = async (req, res) => {
  try {
    const newList = new List(req.body);
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ error: "Failed to create list" });
  }
};

exports.updateList = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json(list);
  } catch (error) {
    console.error("Error updating list:", error);
    res.status(500).json({ error: "Failed to update list" });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json({ message: "List deleted" });
  } catch (error) {
    console.error("Error deleting list:", error);
    res.status(500).json({ error: "Failed to delete list" });
  }
};
