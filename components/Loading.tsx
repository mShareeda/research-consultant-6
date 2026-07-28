
import React from "react";
import { Loader2 } from "lucide-react";
import { Language } from "../types";
import { getSafeTranslations } from "../utils/translations";

interface LoadingProps {
  message?: string;
  lang: Language | null;
}

const Loading: React.FC<LoadingProps> = ({ message, lang }) => {
  const t = getSafeTranslations(lang);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-8 animate-in zoom-in duration-300 max-w-md w-full text-center border border-white/20 ring-1 ring-black/5">
        
        <div className="relative">
            <div className="bg-indigo-50 p-6 rounded-full relative z-10">
                <Loader2 className="w-14 h-14 text-indigo-600 animate-spin" />
            </div>
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="space-y-4 w-full">
            <h3 className="text-2xl font-black text-slate-900">{t.loadingProcessing}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {message || t.loadingWait}
            </p>
        </div>

        <div className="flex items-center gap-2 text-indigo-400 font-bold animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 delay-150"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
