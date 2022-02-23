import { Request, Response } from "express";
import {
  ILearningTopic,
  LearningTopic,
  initialData,
} from "../models/learningTopic";
import { Msg } from "../enums/message";

export class LearningTopicsController {
  constructor() {
    LearningTopic.find().then(
      (data) => !data.length && LearningTopic.create(initialData)
    );
  }

  public async getLearningTopics(req: Request, res: Response): Promise<void> {
    try {
      const learningTopics = await LearningTopic.find();
      res.status(200).json(learningTopics);
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_READ_ERROR });
    }
  }

  public async getLearningTopic(req: Request, res: Response): Promise<void> {
    try {
      const learningTopic = await LearningTopic.findById(req.params.id);
      if (learningTopic === null) {
        res.status(404).json({ message: Msg.MSG_NOT_FOUND });
      } else {
        res.status(200).json(learningTopic);
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_READ_ERROR });
    }
  }

  public async createLearningTopic(req: Request, res: Response): Promise<void> {
    const newLearningTopic: ILearningTopic = new LearningTopic(req.body);
    try {
      const result = await newLearningTopic.save();
      if (result === null) {
        res.status(500).json({ message: Msg.MSG_CREATE_ERROR });
      } else {
        res.status(201).json(result);
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_CREATE_ERROR });
    }
  }

  public async updateLearningTopic(req: Request, res: Response): Promise<void> {
    try {
      const learningTopic = await LearningTopic.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (learningTopic === null) {
        res.status(404).json({ message: Msg.MSG_NOT_FOUND });
      } else {
        res.status(201).json({ ...req.body });
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_UPDATE_ERROR });
    }
  }

  public async deleteLearningTopic(req: Request, res: Response): Promise<void> {
    try {
      const learningTopic = await LearningTopic.findByIdAndDelete(
        req.params.id
      );
      if (learningTopic === null) {
        res.status(404).json({ message: Msg.MSG_NOT_FOUND });
      } else {
        res.status(200).json({ message: Msg.MSG_DELETE_SUCCESS });
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_DELETE_ERROR });
    }
  }
}
