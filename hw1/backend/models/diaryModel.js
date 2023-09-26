import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    date : {
      type: String,
      required: true, // default是系統自行抓現在時間的日期
    },
    tag: {
      type: String,
      required: true,
    },
    feeling: {
      type:String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    // This option is to make sure that when a new document is created,
    // the timestamps will be added automatically.
    // You can comment this out to see the difference.
    timestamps: true,
  },
);

const DiaryModel = mongoose.model("Diary", diarySchema);

export default DiaryModel;