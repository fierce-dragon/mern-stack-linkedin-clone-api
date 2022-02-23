import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { LearningTopicsController } from "../controllers/learningTopicsController";

export class LearningTopicRoutes {
  public router: Router;
  public authController: AuthController = new AuthController();
  public learningTopicController: LearningTopicsController = new LearningTopicsController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.learningTopicController.getLearningTopics);
    this.router.get("/:id", this.learningTopicController.getLearningTopic);
    this.router.post(
      "/",
      this.authController.authenticateJWT,
      this.learningTopicController.createLearningTopic
    );
    this.router.put(
      "/:id",
      this.authController.authenticateJWT,
      this.learningTopicController.updateLearningTopic
    );
    this.router.delete(
      "/:id",
      this.authController.authenticateJWT,
      this.learningTopicController.deleteLearningTopic
    );
  }
}
