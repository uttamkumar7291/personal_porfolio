
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full text-left">
      <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-5 py-3.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 shadow-sm dark:shadow-inner"
      />
    </div>
  );
};
