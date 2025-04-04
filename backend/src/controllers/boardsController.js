const Board = require("../models/Board");
const User = require("../models/User");

exports.getAllBoards = async (req, res) => {
  try {
    // Populate lists and optionally tasks if needed
    const boards = await Board.find({}).populate("lists");
    res.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ error: "Failed to fetch boards" });
  }
};

exports.createBoard = async (req, res) => {
  try {
    // Assume req.user is set by an authentication middleware
    // and contains at least the user _id.
    const userId = req.user._id;
    const { title, description } = req.body;

    // Create a new board with the owner field set to the signed-in user.
    const newBoard = new Board({
      title,
      description,
      owner: userId,
      // Optionally, add the user as a member by default.
      members: [userId],
      lists: [] // You can optionally add default lists here.
    });

    await newBoard.save();

    // Update the user's document to add a reference to the new board.
    await User.findByIdAndUpdate(userId, { $push: { boards: newBoard._id } });

    res.status(201).json(newBoard);
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Failed to create board" });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    console.error("Error updating board:", error);
    res.status(500).json({ error: "Failed to update board" });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    // Optionally remove the board from the user's boards array here.
    res.json({ message: "Board deleted" });
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ error: "Failed to delete board" });
  }
};
