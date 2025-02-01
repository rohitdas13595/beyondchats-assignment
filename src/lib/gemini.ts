import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { settings } from "./settings/settings";

export class GeminiAgentService {
  private model: GenerativeModel;
  constructor() {
    const genAi = new GoogleGenerativeAI(settings.geminiApiKey);
    this.model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  private readonly evaluationPrompt = `
      You are an expert AI searching agent. Fetch the  data from the website url provided.
      
      Job Requirements:
      {websiteUrl}
  
     
      
      Provide evaluation in the following format:
      {
        "websiteUrl": "{websiteUrl}",
        "pages": {
           "url": string;
           "content": string;
        }
      }[]
  
      Return the response in pure  JSON string with the above format.
    `;

  async scrapeWebsite({ websiteUrl }: { websiteUrl: string }): Promise<null> {
    try {
      const prompt = this.evaluationPrompt.replace(
        "{websiteUrl}",
        JSON.stringify(websiteUrl, null, 2)
      );
      const generationConfig = {
        response_mime_type: "application/json", // Request JSON response
      };

      const result = await this.model.generateContent(prompt, {});
      const response = result.response;
      console.log("responseTest", response.text());

      const text = response.text();

      // Parse JSON from response
      const jsonMatch = text.match(/{[\s\S]*}/);
      const parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      console.log("parsedResponse.......", parsedResponse);

      return parsedResponse;
    } catch (error) {
      console.log(
        error,
        "error.................................................................................................."
      );
      return null;
    }
  }
}
