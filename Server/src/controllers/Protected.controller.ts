import express, { Request, Response } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { NewsService } from "../services/news.service";
export class ProtectedController {
  public path = "/protected";
  public router = express.Router();
  private AuthMiddleWare: any;
  constructor() {
    this.AuthMiddleWare = new AuthMiddleware();
    this.initRoutes();
  }
  private initRoutes() {
    this.router.use(this.AuthMiddleWare.verfiyToken);
    this.router.get("/articles", this.news);
    this.router.get("/summarize",this.summarize)
  }
  async news(req: any, res: Response) {
    const { q, page, searchIn } = req.query;
    const articles = await new NewsService(q, page, searchIn).articles();
    res.status(200).send(articles);
  }
  async summarize(req: any, res: Response) {
    const { url } = req.query;
    const articles = await new NewsService().summarize(url);
    res.status(200).send(articles);
  }
}
