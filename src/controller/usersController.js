import { usersModel } from "../model/usersModel.js";

export async function usersController(req, res) {
  try {
    const result = await usersModel();
    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in usersController:", error);
    return res.status(500).json({ message: error.message });
  }
}
