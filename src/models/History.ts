import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface defining the structure of a History document
 * Extends mongoose Document to provide TypeScript typing
 */

export interface IHistory extends Document {
  command: string;
  result: string;
  createdAt: Date;
}

/**
 * Schema for History model
 * Defines the structure, validation, and default values for History documents
 */

const History = new Schema<IHistory>({
  command: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IHistory>("History", History);
