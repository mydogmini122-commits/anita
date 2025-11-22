
import React from 'react';
import { UserInputs } from '../types';
import { DollarSign, Activity, PiggyBank } from 'lucide-react';

interface InputFormProps {
  inputs: UserInputs;
  setInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
  onCalculate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, setInputs, onCalculate, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-slate-100 sticky top-24">
      <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center border-b border-slate-100 pb-4">
        <Activity className="w-5 h-5 mr-3 text-slate-900" />
        財務參數設定
      </h2>
      
      <div className="space-y-8">
        {/* Basic Info */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">基本資料</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">目前年齡</label>
              <div className="relative">
                <input
                  type="number"
                  name="currentAge"
                  value={inputs.currentAge}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">預計退休</label>
              <div className="relative">
                <input
                  type="number"
                  name="retirementAge"
                  value={inputs.retirementAge}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none font-medium"
                />
              </div>
            </div>
          </div>
          
           <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">預期壽命</label>
            <input
              type="number"
              name="lifeExpectancy"
              value={inputs.lifeExpectancy}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none font-medium"
            />
          </div>
        </div>

        {/* Financial Info */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">資產配置</h3>
          
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">目前總資產 (TWD)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                name="currentSavings"
                value={inputs.currentSavings}
                onChange={handleChange}
                step="10000"
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">每月儲蓄目標</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PiggyBank className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                name="monthlySavings"
                value={inputs.monthlySavings}
                onChange={handleChange}
                step="1000"
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                退休後月開銷 (現值)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                name="monthlyExpensesCurrent"
                value={inputs.monthlyExpensesCurrent}
                onChange={handleChange}
                step="1000"
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none font-medium"
              />
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400 text-right">
                年開銷約 {new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(inputs.monthlyExpensesCurrent * 12)}
            </p>
          </div>
        </div>

        {/* Rates */}
        <div className="space-y-5 pt-4 border-t border-slate-100">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">市場假設 (%)</h3>
           <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">通膨率</label>
                <input
                    type="number"
                    name="inflationRate"
                    value={inputs.inflationRate}
                    onChange={handleChange}
                    step="0.1"
                    className="block w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent text-center font-medium"
                  />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">退休前投報</label>
                <input
                    type="number"
                    name="investmentReturnRate"
                    value={inputs.investmentReturnRate}
                    onChange={handleChange}
                    step="0.1"
                    className="block w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent text-center font-medium"
                  />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">退休後投報</label>
                <input
                    type="number"
                    name="postRetirementReturnRate"
                    value={inputs.postRetirementReturnRate}
                    onChange={handleChange}
                    step="0.1"
                    className="block w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent text-center font-medium"
                  />
              </div>
           </div>
        </div>

      </div>

      <div className="mt-8">
        <button
          onClick={onCalculate}
          disabled={isLoading}
          className={`w-full flex justify-center items-center px-6 py-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-lg text-white transition-all duration-300 ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-slate-900/20'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              計算與生成報告
            </>
          ) : (
            '開始試算與分析'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
