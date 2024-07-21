import { GoogleGenerativeAI } from "@google/generative-ai";
import NewsApi from "newsapi";
import { Article } from "../Models/article";
export class NewsService {
  private query: string = "";
  private page: number = 1;
  private searchIn: string = "title";
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  private newsapi = new NewsApi(process.env.NEWS_API_KEY);
  constructor(q: string = "", page: number = 1, searchIn: string = "title") {
    this.query = q;
    this.page = page;
    this.searchIn = searchIn;
  }
  async articles() {
    return this.newsapi.v2
      .everything({
        q: this.query,
        language: "en",
        page: this.page,
        searchIn: this.searchIn,
      })
      .then((response: Response) => {
        return response;
      })
      .catch((e: Error) => console.log(e));
  }
  async summarize(url) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(url)
    const prompt = `Please summarize the key points of the news article found at ${url}. Focus on the main events, any important figures involved, and the overall impact of the story.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
}
