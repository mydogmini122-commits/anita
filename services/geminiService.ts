
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInputs, CalculationResult, AIAdviceResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const allocationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: "A humorous, simple summary for a 12 year old." },
    allocation: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of asset class" },
          value: { type: Type.NUMBER, description: "Percentage value (0-100)" },
          color: { type: Type.STRING, description: "Hex color code" },
          description: { type: Type.STRING, description: "Very short simple explanation" },
          risk: { type: Type.STRING, description: "Risk explained to a 12 year old" },
          expectedReturn: { type: Type.STRING, description: "Return potential explained simply" }
        },
        required: ["name", "value", "color", "risk", "expectedReturn"]
      }
    },
    actionableSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of simple steps."
    },
    riskAnalysis: { type: Type.STRING, description: "Simple risk level." },
    passiveIncomeSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Simple passive income ideas."
    },
    professionalAnalysis: { 
      type: Type.STRING, 
      description: "A serious, professional analysis of the gap and strategy for a 40+ year old adult. Use financial terminology." 
    },
    professionalSuggestions: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "Concrete, mature actionable steps or investment vehicles (e.g. specific ETF types)." 
    }
  },
  required: ["summary", "allocation", "actionableSteps", "riskAnalysis", "passiveIncomeSuggestions", "professionalAnalysis", "professionalSuggestions"]
};

export const getFinancialAdvice = async (
  inputs: UserInputs,
  results: CalculationResult
): Promise<AIAdviceResponse> => {
  const isGap = results.gap > 0;

  if (!apiKey) {
    console.warn("API Key is missing, returning mock data.");
    return {
      summary: isGap 
        ? "哎呀！錢不夠啦！還在玩？趕快專心上班吧，不然退休只能喝西北風囉！你的缺口有點大，現在開始還來得及！" 
        : "太強了！你的錢多到花不完，可以準備環遊世界，或者去買個小島當島主了！",
      allocation: [
        { 
          name: "股票 (錢滾錢)", 
          value: 60, 
          color: "#1e293b", 
          risk: "心臟要大顆，像坐雲霄飛車。",
          expectedReturn: "運氣好賺大錢，運氣不好住套房。"
        },
        { 
          name: "債券 (收租金)", 
          value: 30, 
          color: "#b45309", 
          risk: "比股票安全，但還是會波動。",
          expectedReturn: "穩定領利息，像乖乖存錢筒。"
        },
        { 
          name: "現金 (保命錢)", 
          value: 10, 
          color: "#94a3b8", 
          risk: "被通膨吃掉，錢會變薄。",
          expectedReturn: "少得可憐，但隨時能用。"
        }
      ],
      actionableSteps: isGap 
        ? ["別再亂買東西了", "多兼一份差吧", "把錢丟進ETF別亂動"]
        : ["去訂機票吧", "考慮做公益", "定期檢查就好"],
      riskAnalysis: "中等風險 (心臟還行)",
      passiveIncomeSuggestions: [
        "買會配息的股票 (當股東)",
        "有空房間就租人 (當房東)",
        "寫部落格賺廣告費 (當網紅)"
      ],
      professionalAnalysis: "根據目前的資產累積速率與通膨調整後的支出需求，您的退休準備金存在顯著缺口。建議立即檢視資產配置效率，提高權益類資產比例以對抗長壽風險，並善用複利效應縮小差距。當前的儲蓄率不足以支撐預期的替代率，需進行結構性調整。",
      professionalSuggestions: [
        "將每月結餘的 70% 投入全市場指數型 ETF (如 VT 或 VTI) 以獲取長期市場報酬。",
        "配置 20% 於投資級公司債或公債 (如 BND) 作為資產避震器。",
        "檢視非必要性支出，將儲蓄率提升至所得的 30% 以上。"
      ]
    };
  }

  const prompt = `
    Role: You are a dual-persona financial advisor.
    
    Part 1: "The Humorous Kid Advisor"
    - Explain the situation to a smart 12-year-old.
    - Be BLUNT, FUNNY, and Simple.
    - If Gap > 0 (Shortfall): Use "Tough Love". Say "還在玩？趕快專心上班吧" or similar.
    - If Gap <= 0 (Surplus): Praise them playfully.
    
    Part 2: "The Professional Wealth Manager"
    - Explain the situation to a 40+ year old adult client.
    - Use professional financial terminology (Inflation-adjusted, Asset Allocation, Compounding, Withdrawal Rate).
    - Provide a serious, concise analysis of their financial health.
    - Give concrete, mature advice.

    User Profile:
    - Age: ${inputs.currentAge}
    - Retirement Age: ${inputs.retirementAge}
    - Gap: $${results.gap} (Positive = Shortfall; Negative = Surplus)
    - Inflation: ${inputs.inflationRate}%
    
    Language: Traditional Chinese (Taiwan).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: allocationSchema,
        temperature: 0.7
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAdviceResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback with empty professional fields if error, ensuring app doesn't crash
    return {
       summary: "AI 連線忙碌中，請稍後再試。",
       allocation: [],
       actionableSteps: [],
       riskAnalysis: "未知",
       passiveIncomeSuggestions: [],
       professionalAnalysis: "暫無法取得專業分析數據。",
       professionalSuggestions: []
    };
  }
};
