import { Document, Schema, Model, model } from "mongoose";

export interface ILearningTopic extends Document {
  title: String;
  count: Number;
  url: String;
}

export const learningTopicSchema = new Schema({
  title: String,
  count: Number,
  url: String,
});

export const LearningTopic: Model<ILearningTopic> = model<ILearningTopic>(
  "Learning-Topics",
  learningTopicSchema
);

export const initialData = [
  { title: "Training and Education", count: 300, url: "/" },
  {
    title: "IT Help Desk",
    count: 170,
    url: "/",
  },
  {
    title: "Business Analysis and Strategy",
    count: 750,
    url: "/",
  },
  {
    title: "Finance and Accounting",
    count: 240,
    url: "/",
  },
  {
    title: "Career Development",
    count: 320,
    url: "/",
  },
  {
    title: "Leadership and Management",
    count: 1,
    url: "/",
  },
  {
    title: "Mobile Development",
    count: 370,
    url: "/",
  },
  {
    title: "Marketing",
    count: 690,
    url: "/",
  },
  {
    title: "Cloud Computing",
    count: 560,
    url: "/",
  },
  {
    title: "Project Management",
    count: 340,
    url: "/",
  },
  {
    title: "Visualization and Real-Time",
    count: 800,
    url: "/",
  },
  {
    title: "Animation and Illustration",
    count: 1,
    url: "/",
  },
  {
    title: "Audio and Music",
    count: 390,
    url: "/",
  },
  {
    title: "AEC",
    count: 1,
    url: "/",
  },
  {
    title: "Graphic Design",
    count: 920,
    url: "/",
  },
  {
    title: "Motion Graphics and VFX",
    count: 770,
    url: "/",
  },
  {
    title: "Photography",
    count: 960,
    url: "/",
  },
  {
    title: "Video",
    count: 720,
    url: "/",
  },
  {
    title: "Data Science",
    count: 720,
    url: "/",
  },
  {
    title: "Network and System Administration",
    count: 800,
    url: "/",
  },
  {
    title: "Software Development",
    count: 1,
    url: "/",
  },
  {
    title: "User Experience",
    count: 400,
    url: "/",
  },
  {
    title: "Web Design",
    count: 510,
    url: "/",
  },
  {
    title: "Database Management",
    count: 240,
    url: "/",
  },
  {
    title: "Web Development",
    count: 1,
    url: "/",
  },
  {
    title: "Product and Manufacturing",
    count: 850,
    url: "/",
  },
  {
    title: "Sales",
    count: 230,
    url: "/",
  },
  {
    title: "Human Resources",
    count: 300,
    url: "/",
  },
  {
    title: "DevOps",
    count: 190,
    url: "/",
  },
  {
    title: "Small Business and Entrepreneurship",
    count: 430,
    url: "/",
  },
  {
    title: "Customer Service",
    count: 140,
    url: "/",
  },
  {
    title: "Professional Development",
    count: 1,
    url: "/",
  },
  {
    title: "Business Software and Tools",
    count: 1,
    url: "/",
  },
  {
    title: "Security",
    count: 410,
    url: "/",
  },
];
