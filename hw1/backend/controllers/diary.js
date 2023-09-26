import text from "body-parser/lib/types/text.js";
import DiaryModel from "../models/diaryModel.js";
import { Model } from "mongoose";

// Get all diaries
export const getDiaries = async (req, res) => {
  try{
    const diaries = await DiaryModel.find({});
    // Return todos
    return res.status(200).json(diaries);
  } catch (error) {
        // If there is an error, return 500 and the error message
        // You can read more about HTTP status codes here:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        // Or this meme:
        // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
        return res.status(500).json({ message: error.message });
      }
};

export const getDiaryById = async (req, res) => {
  const {id} = req.params;
  try {
    const target_diary = await DiaryModel.findById(id);
    return res.status(200).json(target_diary);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Or this meme:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};

//Create a diary
export const createDiary = async (req, res) => {
    const {date, tag, feeling, content} = req.body;

    // Check date, content, tag, and feeling 
    if (!tag || !feeling || !content) {
      return res
        .status(400)
        .json({ message: "Tag, feeling, and content are required!" });
    }
  
    // Create a new diary
    try {
      const newDiary = await DiaryModel.create({
        date,
        tag,
        feeling,
        content,
      });
      return res.status(201).json(newDiary);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

// Update a diary
export const updateDiary = async (req, res) => {
    const { id } = req.params;
    const {date, tag, feeling, content} = req.body;
  
    try {
      // Check if the id is valid
      const existedDiary = await DiaryModel.findById(id);
      if (!existedDiary) {
        return res.status(404).json({ message: "Diary not found!" });
      }

      // Update the diary
      
      if (date !== undefined) existedDiary.date = date;
      if (tag !== undefined) existedDiary.tag = tag;
      if (feeling !== undefined) existedDiary.feeling = feeling;
      if (content !== undefined) existedDiary.content = content;
  
      // Save the updated todo
      await existedDiary.save();
  
      // Rename _id to id
      existedDiary.id = existedDiary._id;
      delete existedDiary._id;
  
      return res.status(200).json(existedDiary);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

// Delete a diary
export const deleteDiary = async (req, res) => {
    const { id } = req.params;
    try {
      // Check if the id is valid
      const existedDiary = await DiaryModel.findById(id);
      if (!existedDiary) {
        return res.status(404).json({ message: "Diary not found!" });
      }
      // Delete the diary
      await DiaryModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Diary deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
