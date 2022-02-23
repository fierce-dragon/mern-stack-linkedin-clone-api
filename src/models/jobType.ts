import { Document, Schema, Model, model } from "mongoose";

export interface IJobType extends Document {
  title: String;
}

export const jobTypeSchema = new Schema({
  title: String,
});

export const JobType: Model<IJobType> = model<IJobType>(
  "Job-Type",
  jobTypeSchema
);

export const initialData = [
  { title: "Engineering" },
  { title: "Business Development" },
  { title: "Finance" },
  { title: "Administrative Assistant" },
  { title: "Retail Associate" },
  { title: "Customer Service" },
  { title: "Operations" },
  { title: "Information Technology" },
  { title: "Marketing" },
  { title: "Human Resources" },
  { title: "Healthcare Service" },
  { title: "Sales" },
  { title: "Program and Project Management" },
  { title: "Accounting" },
  { title: "Arts and Design" },
  { title: "Community and Social Services" },
  { title: "Consulting" },
  { title: "Education" },
  { title: "Entrepreneurship" },
  { title: "Legal" },
  { title: "Media and Communications" },
  { title: "Military and Protective Services" },
  { title: "Product Management" },
  { title: "Purchasing" },
  { title: "Quality Assurance" },
  { title: "Real Estate" },
  { title: "Research" },
  { title: "Support" },
  { title: "Administrative" },
];
