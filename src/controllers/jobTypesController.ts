import { Request, Response } from "express";
import { IJobType, JobType, initialData } from "../models/jobType";
import { Msg } from "../enums/message";

export class JobTypesController {
  constructor() {
    JobType.find().then((data) => !data.length && JobType.create(initialData));
  }

  public async getJobTypes(req: Request, res: Response): Promise<void> {
    try {
      const jobTypes = await JobType.find();
      res.status(200).json(jobTypes);
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_READ_ERROR });
    }
  }

  public async getJobType(req: Request, res: Response): Promise<void> {
    try {
      const jobType = await JobType.findById(req.params.id);
      if (jobType === null) {
        res.status(404).json({ message: Msg.MSG_NOT_FOUND });
      } else {
        res.status(200).json(jobType);
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_READ_ERROR });
    }
  }

  public async createJobType(req: Request, res: Response): Promise<void> {
    const newJobType: IJobType = new JobType(req.body);
    try {
      const result = await newJobType.save();
      if (result === null) {
        res.status(500).json({ message: Msg.MSG_CREATE_ERROR });
      } else {
        res.status(201).json(result);
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_CREATE_ERROR });
    }
  }

  public async updateJobType(req: Request, res: Response): Promise<void> {
    try {
      const jobType = await JobType.findByIdAndUpdate(req.params.id, req.body);
      if (jobType === null) {
        res.status(404).json({ message: Msg.MSG_NOT_FOUND });
      } else {
        res.status(201).json({ ...req.body });
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_UPDATE_ERROR });
    }
  }

  public async deleteJobType(req: Request, res: Response): Promise<void> {
    try {
      const jobType = await JobType.findByIdAndDelete(req.params.id);
      if (jobType === null) {
        res.status(404).json({ message: Msg.MSG_NOT_FOUND });
      } else {
        res.status(200).json({ message: Msg.MSG_DELETE_SUCCESS });
      }
    } catch (e) {
      res.status(500).json({ message: Msg.MSG_DELETE_ERROR });
    }
  }
}
