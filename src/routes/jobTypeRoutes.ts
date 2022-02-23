import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { JobTypesController } from "../controllers/jobTypesController";

export class JobTypeRoutes {
  public router: Router;
  public authController: AuthController = new AuthController();
  public jobTypeController: JobTypesController = new JobTypesController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.jobTypeController.getJobTypes);
    this.router.get("/:id", this.jobTypeController.getJobType);
    this.router.post(
      "/",
      this.authController.authenticateJWT,
      this.jobTypeController.createJobType
    );
    this.router.put(
      "/:id",
      this.authController.authenticateJWT,
      this.jobTypeController.updateJobType
    );
    this.router.delete(
      "/:id",
      this.authController.authenticateJWT,
      this.jobTypeController.deleteJobType
    );
  }
}
