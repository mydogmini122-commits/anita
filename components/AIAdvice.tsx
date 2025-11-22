
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip, Legend } from 'recharts';
import { AIAdviceResponse } from '../types';
import { CheckCircle, Info, TrendingUp, ShieldCheck, Target, Briefcase, ArrowRight } from 'lucide-react';

interface AIAdviceProps {
  advice: AIAdviceResponse;
}

const AIAdvice: React.FC<AIAdviceProps> = ({ advice }) => {
  return (
    <div className="space-y-8">
      
      {/* --- SECTION 1: HUMOROUS DIAGNOSIS (The "Kid" Advisor) --- */}
      <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 border border-slate-100 w-full">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center mb-3">
              <ShieldCheck className="w-5 h-5 mr-2 text-slate-900" />
              AI 毒舌財富診斷
          </h3>
          <div className="pl-7">
             <span className="px-4 py-1.5 bg-slate-900 text-white text-base rounded-full font-medium inline-block shadow-md">
                {advice.riskAnalysis}
             </span>
          </div>
        </div>
        
        <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">總體分析</h4>
            <p className="text-slate-700 leading-loose text-lg font-medium border-l-4 border-amber-500 pl-4 italic">
                "{advice.summary}"
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">該怎麼做？</h4>
                <ul className="space-y-3">
                    {advice.actionableSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start group">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0 mt-1 group-hover:text-emerald-500 transition-colors" />
                            <span className="text-slate-700 text-sm font-medium">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                  簡單增加收入的方法
                </h4>
                <ul className="space-y-3">
                    {advice.passiveIncomeSuggestions && advice.passiveIncomeSuggestions.map((step, idx) => (
                        <li key={idx} className="flex items-start group">
                            <TrendingUp className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0 mt-1 group-hover:text-amber-400 transition-colors" />
                            <span className="text-slate-700 text-sm font-medium">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* --- SECTION 2: ASSET ALLOCATION CHART --- */}
      <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 border border-slate-100 w-full">
        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
          <Target className="w-5 h-5 mr-2 text-amber-500" />
          投資組合建議
        </h3>
        <div className="h-[250px] w-full flex justify-center -mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={advice.allocation}
                cx="50%"
                cy="75%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
              >
                {advice.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <PieTooltip 
                 contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#1e293b',
                  color: '#fff',
                  fontSize: '14px'
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '14px', bottom: 0 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- SECTION 3: SIMPLE TABLE --- */}
      <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden border border-slate-100">
        <div className="px-8 py-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <Info className="w-5 h-5 mr-2 text-slate-400" />
            資產配置懶人包 (這是什麼？)
            </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th scope="col" className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">資產名稱</th>
                <th scope="col" className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">比例</th>
                <th scope="col" className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/3">賺多少 (預期)</th>
                <th scope="col" className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/3">危險嗎？ (風險)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {advice.allocation.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">{item.value}%</div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600 leading-relaxed font-medium">
                    {item.expectedReturn}
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600 leading-relaxed font-medium">
                    {item.risk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECTION 4: PROFESSIONAL ADULT VERSION (New) --- */}
      <div className="bg-slate-900 rounded-xl shadow-2xl shadow-slate-900/20 overflow-hidden border border-slate-800 relative">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
        
        <div className="p-8 md:p-10">
            <div className="flex items-center mb-8">
               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg mr-4">
                  <Briefcase className="w-5 h-5 text-white" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">專業財富管理報告</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Professional Wealth Management Report</p>
               </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">財務體質深度分析</h4>
                    <p className="text-slate-300 leading-relaxed text-base font-light text-justify">
                        {advice.professionalAnalysis}
                    </p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                    <h4 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        專業配置建議與行動方針
                    </h4>
                    <ul className="space-y-4">
                        {advice.professionalSuggestions && advice.professionalSuggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-amber-600 font-mono mr-4 text-sm">0{idx + 1}.</span>
                                <span className="text-slate-300 text-sm font-light leading-relaxed">{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                <p className="text-slate-500 text-xs">
                    此報告基於市場現況與財務模型生成，僅供規劃參考，不構成具體投資邀約。
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default AIAdvice;
