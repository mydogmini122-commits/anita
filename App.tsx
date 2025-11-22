
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultCharts from './components/ResultCharts';
import AIAdvice from './components/AIAdvice';
import { calculateRetirement } from './utils/calculations';
import { getFinancialAdvice } from './services/geminiService';
import { UserInputs, CalculationResult, AIAdviceResponse } from './types';
import { TrendingUp, AlertCircle, CheckCircle2, Headphones, Wallet } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Default inputs
  const [inputs, setInputs] = useState<UserInputs>({
    currentAge: 30,
    retirementAge: 60,
    currentSavings: 1000000,
    monthlySavings: 10000,
    monthlyExpensesCurrent: 40000,
    inflationRate: 2.5,
    investmentReturnRate: 6.0,
    postRetirementReturnRate: 4.0,
    lifeExpectancy: 85
  });

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [aiAdvice, setAiAdvice] = useState<AIAdviceResponse | null>(null);

  const handleCalculate = async () => {
    setIsLoading(true);
    setResults(null);
    setAiAdvice(null);

    // 1. Perform Mathematics
    const calcResults = calculateRetirement(inputs);
    setResults(calcResults);

    // 2. Fetch AI Advice (only if math is done)
    try {
      const advice = await getFinancialAdvice(inputs, calcResults);
      setAiAdvice(advice);
    } catch (error) {
      console.error("AI Advice Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      {/* Header - Recreated '1968 Retirement Countdown' Visual Identity */}
      <header className="bg-black shadow-2xl sticky top-0 z-50 border-b border-slate-800 overflow-hidden h-32 flex items-center">
          
          {/* Background Tech Deco Lines (Absolute) */}
          <div className="absolute inset-0 pointer-events-none">
             {/* Top Left Corner Cross */}
             <div className="absolute top-4 left-4 text-amber-500 text-xl opacity-80 font-mono">+</div>
             {/* Top Right Corner Cross */}
             <div className="absolute top-4 right-4 text-white text-xl opacity-80 font-mono">+</div>
             {/* Bottom Left Corner Cross */}
             <div className="absolute bottom-4 left-4 text-white text-xl opacity-80 font-mono">+</div>
             {/* Bottom Right Corner Cross */}
             <div className="absolute bottom-4 right-4 text-amber-500 text-xl opacity-80 font-mono">+</div>
             
             {/* Horizontal thin lines */}
             <div className="absolute top-1/2 left-0 w-12 h-[1px] bg-slate-700 hidden lg:block"></div>
             <div className="absolute top-1/2 right-0 w-12 h-[1px] bg-slate-700 hidden lg:block"></div>
          </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between relative">
          
          {/* Logo Area Container - Full Width Flex */}
          <div className="flex items-center w-full justify-between md:justify-start">
            
            {/* --- GRAPHIC 1: Left Striped Square + Yellow Cross --- */}
            <div className="relative mr-8 hidden md:block flex-shrink-0 group">
               {/* The Striped Square */}
               <div className="w-16 h-16 bg-white relative overflow-hidden shadow-lg">
                   {/* CSS Pattern for stripes (Black stripes on White) */}
                   <div className="absolute inset-0" style={{
                       backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 2px, transparent 2px, transparent 6px)'
                   }}></div>
               </div>
               {/* The Yellow Cross (Overlapping) */}
               <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 translate-x-2 z-10">
                  <div className="relative w-10 h-10">
                     <div className="absolute left-1/2 top-0 bottom-0 w-2.5 bg-amber-500 -translate-x-1/2 shadow-md"></div>
                     <div className="absolute top-1/2 left-0 right-0 h-2.5 bg-amber-500 -translate-y-1/2 shadow-md"></div>
                  </div>
               </div>
               {/* Decorative small white plus */}
               <div className="absolute -top-6 -left-2 text-white/50 text-2xl font-light">+</div>
            </div>

            {/* --- GRAPHIC 2: Center Text Group --- */}
            <div className="flex flex-col z-10">
                <div className="flex items-baseline gap-x-4">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter font-mono leading-none">
                        1968
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-white tracking-[0.2em] leading-none">
                        退休倒計時
                    </span>
                </div>
                
                {/* Yellow Bar Badge & Tech Lines */}
                <div className="relative mt-2 flex items-center">
                    {/* The Yellow Bar */}
                    <div className="bg-amber-500 text-black text-sm sm:text-base font-black px-8 py-1.5 inline-block transform -skew-x-12 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                        ARE YOU READY
                    </div>
                    
                    {/* "++" Decoration */}
                    <div className="ml-6 text-amber-500 text-2xl font-mono font-bold tracking-widest hidden sm:block">
                        ++
                    </div>
                    
                    {/* Connecting Line */}
                    <div className="h-[1px] bg-slate-800 w-24 ml-4 hidden xl:block opacity-50"></div>
                </div>
            </div>

            {/* --- GRAPHIC 3: Right Graphics (Circle & Big Plus) --- */}
            {/* Pushed to the right with margin-auto or flex justify */}
            <div className="flex items-center gap-10 ml-auto hidden lg:flex">
                 {/* Yellow Circle */}
                 <div className="w-20 h-20 bg-amber-500 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:scale-105 transition-transform duration-300"></div>
                 
                 {/* Big White Plus */}
                 <div className="relative w-16 h-16 flex items-center justify-center opacity-90">
                      <div className="absolute w-full h-3 bg-white shadow-sm"></div>
                      <div className="absolute h-full w-3 bg-white shadow-sm"></div>
                 </div>
            </div>

          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">Financial Future</span>
            </h2>
            <p className="text-lg text-slate-600 font-light">
              結合 Gemini AI 智慧分析，以專業視角規劃您的財富自由藍圖。
              <br className="hidden sm:block"/>精準計算缺口，提供機構級的資產配置建議。
            </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="xl:col-span-4">
            <InputForm 
              inputs={inputs} 
              setInputs={setInputs} 
              onCalculate={handleCalculate} 
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Results */}
          <div className="xl:col-span-8 space-y-8">
            {results && (
              <div className="space-y-8">
                {/* Result Summary Cards */}
                <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 border border-slate-100">
                  {/* Status Header */}
                  <div className={`mb-8 pb-6 border-b border-slate-100 flex items-center ${results.isAchievable ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {results.isAchievable ? (
                        <>
                          <CheckCircle2 className="w-8 h-8 mr-4 text-emerald-500" />
                          <div>
                             <h3 className="font-bold text-xl text-slate-900">財務自由目標：可達成</h3>
                             <p className="text-slate-500 text-sm mt-1">恭喜！您的資產累積速度足以支撐退休生活。</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-8 h-8 mr-4 text-amber-500" />
                          <div className="w-full">
                             <h3 className="font-bold text-xl text-slate-900">財務自由目標：需調整</h3>
                             <p className="text-slate-500 text-sm mt-1">建議增加儲蓄投入或調整退休年齡以彌補缺口。</p>
                             <div className="mt-3 bg-slate-50 border border-amber-100 rounded-lg p-3 flex items-start sm:items-center">
                                <Headphones className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
                                <p className="text-amber-700 text-sm font-medium">
                                  建議收聽《1968退休倒計時》陪你打造退休好體質
                                </p>
                             </div>
                          </div>
                        </>
                      )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="group">
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">退休所需總資金</p>
                          <p className="text-3xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                            {formatCurrency(results.totalNeeded)}
                          </p>
                      </div>
                      <div className="group">
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">預期累積資產</p>
                          <p className="text-3xl font-bold text-indigo-900 group-hover:text-indigo-800 transition-colors">
                            {formatCurrency(results.savingsAtRetirement)}
                          </p>
                          <p className="text-xs text-slate-400 mt-2 font-light">
                            含每月投入 {formatCurrency(inputs.monthlySavings)}
                          </p>
                      </div>
                      <div className="group">
                          <p className={`text-xs uppercase tracking-widest font-semibold mb-2 ${results.isAchievable ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {results.isAchievable ? '預估結餘 (Surplus)' : '資金缺口 (Gap)'}
                          </p>
                          <p className={`text-3xl font-bold ${results.isAchievable ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {formatCurrency(Math.abs(results.gap))}
                          </p>
                          {!results.isAchievable && (
                             <div className="mt-2 flex items-center text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded text-xs font-medium">
                                   <TrendingUp className="w-3 h-3 mr-1" />
                                   需月增儲蓄: {formatCurrency(results.additionalMonthlySavingsNeeded)}
                             </div>
                          )}
                      </div>
                  </div>
                </div>
                
                <ResultCharts data={results} />
                
                {/* AI Advice Section - Always visible now */}
                {aiAdvice && (
                  <AIAdvice advice={aiAdvice} />
                )}
              </div>
            )}

            {!results && (
                <div className="h-96 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm">
                    <div className="bg-slate-100 p-4 rounded-full mb-4">
                       <Wallet className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-light">請在左側輸入您的財務資料</p>
                    <p className="text-slate-400 text-sm mt-2">AI 將為您生成專業報告</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
