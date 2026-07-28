
import React, { useState } from "react";
import { Theory, ComparisonResult, Language } from "../types";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb, 
  Sparkle, 
  Scale, 
  X, 
  Loader2, 
  PlusCircle, 
  BookOpen, 
  AlertTriangle, 
  Zap, 
  Target, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  Info,
  Hash,
  Activity,
  Award,
  BookMarked,
  Quote,
  Check
} from "lucide-react";
import { compareTheories } from "../services/gemini";
import { translations } from "../utils/translations";

const safeText = (content: any): string => {
  if (typeof content === 'string') return content;
  if (!content) return '';
  if (Array.isArray(content)) return content.join(', ');
  if (typeof content === 'object') {
    return Object.entries(content)
      .map(([key, val]) => `${key}: ${typeof val === 'object' ? JSON.stringify(val) : val}`)
      .join(' | ');
  }
  return String(content);
};

interface StepTheoriesProps {
  theories: Theory[];
  selectedTheories: Theory[];
  onToggleSelection: (theory: Theory) => void;
  onProceed: () => void;
  onBack: () => void;
  onLoadMore: () => void;
  onCompareResult?: (result: ComparisonResult) => void;
  title?: string;
  lang: Language;
}

const StepTheories: React.FC<StepTheoriesProps> = ({ 
    theories, selectedTheories, onToggleSelection, onProceed, onBack, onLoadMore, onCompareResult, title = "", lang 
}) => {
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetailTheory, setSelectedDetailTheory] = useState<Theory | null>(null);
  const t = translations[lang];

  const handleCompare = async () => {
    if (selectedTheories.length < 2) return;
    setIsComparing(true);
    setComparisonError(null);
    setShowModal(true);
    try {
        const result = await compareTheories(title, selectedTheories, lang);
        setComparisonResult(result);
        if (onCompareResult) onCompareResult(result);
    } catch (error: any) {
        setComparisonError(error.message || "Error");
    } finally {
        setIsComparing(false);
    }
  };

  return (
    <div className="w-full space-y-6 md:space-y-8 relative px-2 sm:px-0">
      <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-slate-200 pb-5 md:pb-6 gap-4 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600 flex-shrink-0">
                <Sparkle className="w-4 h-4 md:w-5 md:h-5" />
             </div>
             <h2 className="font-black text-slate-900 text-lg md:text-2xl">{t.theoriesTitle}</h2>
          </div>

          {title && (
             <div className="mt-3 md:mt-4 mb-3 md:mb-4 p-3 md:p-4 bg-white border border-indigo-100 rounded-2xl shadow-sm ring-1 ring-indigo-50">
                <div className="flex items-start gap-3">
                    <div className="bg-indigo-50 p-2 rounded-lg mt-0.5 md:mt-1 flex-shrink-0">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                    </div>
                    <div className="overflow-hidden">
                        <span className="text-[10px] md:text-xs font-bold text-indigo-500 block mb-0.5 md:mb-1 uppercase">{t.studyTitle}</span>
                        <p className="text-slate-900 font-bold leading-relaxed text-xs md:text-base">{title}</p>
                    </div>
                </div>
             </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2 self-stretch md:self-center flex-shrink-0">
            <button 
                onClick={onBack}
                className="text-slate-500 hover:text-indigo-600 hover:bg-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border border-slate-100 hover:border-indigo-100 whitespace-nowrap text-sm"
            >
                {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {t.editTitleBtn}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {theories.map((theory, idx) => {
          const isAdopted = !!selectedTheories.find(t => t.name === theory.name);
          return (
            <div
                key={idx}
                style={{ animationDelay: `${idx * 150}ms` }}
                className={`rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 shadow-card hover:shadow-card-hover border transition-all duration-500 flex flex-col group h-full opacity-0 animate-fade-in-up relative overflow-hidden
                ${isAdopted 
                    ? "bg-indigo-50/40 border-indigo-600 ring-4 ring-indigo-100/50 scale-[1.02] z-10" 
                    : "bg-white border-slate-100"}`}
            >
                {/* Selection Badge (Icon Only) */}
                {isAdopted && (
                    <div className={`absolute top-0 ${lang === 'ar' ? 'left-0 rounded-br-2xl' : 'right-0 rounded-bl-2xl'} bg-indigo-600 text-white p-2.5 md:p-3 flex items-center justify-center shadow-lg animate-in slide-in-from-top-2 duration-300 z-20`}>
                        <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={4} />
                    </div>
                )}

                <div className="p-4 md:p-6 flex flex-col h-full relative z-10">
                    <div className="flex items-start gap-3 md:gap-4 mb-4 pr-1">
                        <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl flex-shrink-0 transition-all duration-300 ${isAdopted ? 'bg-indigo-600 text-white scale-110 shadow-glow' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                            <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className={`font-bold text-sm md:text-base leading-tight pt-0.5 md:pt-1 flex-grow transition-colors ${isAdopted ? 'text-indigo-900' : 'text-slate-900'}`}>{theory.name}</h3>
                    </div>

                    <div className={`p-4 md:p-5 rounded-xl md:rounded-2xl mb-4 md:mb-6 flex-grow border transition-all ${isAdopted ? 'bg-white/80 border-indigo-100 shadow-inner' : 'bg-slate-50/80 border-slate-100/50'}`}>
                        <p className={`text-xs md:sm leading-relaxed font-medium text-justify whitespace-pre-wrap line-clamp-[6] md:line-clamp-none transition-colors ${isAdopted ? 'text-indigo-800' : 'text-slate-600'}`}>
                            {safeText(theory.match_reason)}
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-2.5 md:gap-3 mt-auto">
                      <button
                          onClick={() => setSelectedDetailTheory(theory)}
                          className={`w-full py-2.5 md:py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 border-2 active:scale-[0.98] text-xs md:text-sm ${
                              isAdopted
                              ? "bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                              : "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50 shadow-sm"
                          }`}
                      >
                          <Info className="w-4 h-4" />
                          <span>{t.viewDetailsBtn}</span>
                      </button>

                      <button
                          onClick={() => onToggleSelection(theory)}
                          className={`w-full py-3 md:py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 border-2 text-xs md:text-sm ${
                              isAdopted 
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200" 
                              : "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50"
                          }`}
                      >
                          {isAdopted ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />}
                          <span>{isAdopted ? t.unadoptTheoryBtn : t.adoptTheoryBtn}</span>
                      </button>
                    </div>
                </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pb-20 pt-8">
        <button
          onClick={onLoadMore}
          className="w-full sm:w-auto bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 hover:border-indigo-300 px-6 py-3.5 md:py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md group min-w-[180px] justify-center text-sm"
        >
          <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>{t.loadMoreBtn}</span>
        </button>

        {selectedTheories.length >= 2 && (
            <button 
              onClick={handleCompare}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 md:py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold border border-slate-700 md:hover:-translate-y-1 transition-all min-w-[180px] justify-center animate-in zoom-in-95 text-sm"
            >
                <Scale className="w-5 h-5" />
                <span>{t.compareBtn} ({selectedTheories.length})</span>
            </button>
        )}

        {selectedTheories.length > 0 && (
            <button
                onClick={onProceed}
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3.5 md:py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center gap-3 hover:bg-indigo-700 md:hover:-translate-y-1 active:translate-y-0 transition-all animate-in zoom-in-95 min-w-[180px] justify-center text-sm md:text-base"
            >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                <span>{t.proceedToHypotheses} ({selectedTheories.length})</span>
            </button>
        )}
      </div>

      {/* Theory Detail Modal */}
      {selectedDetailTheory && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[60] flex items-center justify-center p-0 md:p-4">
              <div className="bg-white md:rounded-[2.5rem] w-full max-w-5xl shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200 relative overflow-hidden flex flex-col h-full md:h-[92vh]">
                   {/* Header Section */}
                   <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 md:p-10 text-white relative flex-shrink-0">
                        <button 
                            onClick={() => setSelectedDetailTheory(null)} 
                            className={`absolute top-4 md:top-8 ${lang === 'ar' ? 'left-4 md:left-8' : 'right-4 md:right-8'} bg-white/20 p-2 md:p-2.5 rounded-full text-white hover:bg-white/30 transition-all z-20 hover:rotate-90`}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4 relative z-10">
                             <div className="bg-white/20 p-2 md:p-3 rounded-xl md:rounded-2xl backdrop-blur-sm">
                                <Award className="w-6 h-6 md:w-8 md:h-8" />
                             </div>
                             <span className="text-indigo-100 font-black uppercase tracking-widest text-[10px] md:text-sm">{t.viewDetailsBtn}</span>
                        </div>
                        <h2 className="text-lg md:text-3xl font-black leading-tight relative z-10 drop-shadow-sm pr-12 md:pr-0">{selectedDetailTheory.name}</h2>
                   </div>
                   
                   {/* Scrollable Content Area */}
                   <div className="p-5 md:p-14 space-y-8 md:space-y-16 overflow-y-auto flex-grow bg-white custom-scrollbar-v2">
                        
                        {/* 1. Academic Background */}
                        <section className="space-y-4 md:space-y-8 animate-in slide-in-from-bottom-4 duration-400">
                            <div className="flex items-center gap-3 md:gap-4 text-indigo-700">
                                <BookMarked className="w-6 h-6 md:w-8 md:h-8" />
                                <h3 className="font-black border-b-2 md:border-b-4 border-indigo-100 pb-1.5 md:pb-2 text-base md:text-xl">{t.theoryBackgroundLabel}</h3>
                            </div>
                            <div className="text-slate-800 leading-relaxed md:leading-[2.1] font-bold text-justify bg-slate-50/50 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-slate-100/80 shadow-inner space-y-4 md:space-y-8 text-sm md:text-base">
                                {safeText(selectedDetailTheory.background).split('\n').filter(p => p.trim()).map((para, i) => (
                                    <p key={i} className="animate-in fade-in duration-700" style={{ transitionDelay: `${i * 100}ms` }}>{para.trim()}</p>
                                ))}
                            </div>
                        </section>

                        {/* 2. Professional Justification */}
                        <section className="space-y-4 md:space-y-8 animate-in slide-in-from-bottom-6 duration-500">
                            <div className="flex items-center gap-3 md:gap-4 text-blue-700">
                                <Target className="w-6 h-6 md:w-8 md:h-8" />
                                <h3 className="font-black border-b-2 md:border-b-4 border-blue-100 pb-1.5 md:pb-2 text-base md:text-xl">{lang === 'ar' ? 'مبررات الاستخدام الأكاديمية' : 'Academic Justification'}</h3>
                            </div>
                            <div className="bg-blue-50/30 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-blue-100/40 relative group">
                                <Quote className={`absolute top-4 md:top-6 ${lang === 'ar' ? 'left-4 md:left-6' : 'right-4 md:right-6'} w-8 h-8 md:w-12 md:h-12 text-blue-200/50 -rotate-12 hidden md:block`} />
                                <div className="text-slate-800 leading-relaxed md:leading-[2.1] font-bold text-justify relative z-10 space-y-4 md:space-y-8 text-sm md:text-base">
                                    {safeText(selectedDetailTheory.match_reason).split('\n').filter(p => p.trim()).map((para, i) => (
                                        <p key={i}>{para.trim()}</p>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                            {/* 3. Principles */}
                            <section className="space-y-4 md:space-y-8 animate-in slide-in-from-bottom-8 duration-600">
                                <div className="flex items-center gap-3 md:gap-4 text-indigo-500">
                                    <Activity className="w-6 h-6 md:w-8 md:h-8" />
                                    <h3 className="font-black border-b-2 md:border-b-4 border-indigo-50 pb-1.5 md:pb-2 text-base md:text-xl">{t.theoryPrinciplesLabel}</h3>
                                </div>
                                <div className="grid gap-3 md:gap-5">
                                    {selectedDetailTheory.principles?.map((principle, pIdx) => (
                                        <div key={pIdx} className="flex gap-4 md:gap-5 items-start bg-white p-4 md:p-6 rounded-xl md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all sm:hover:-translate-y-1">
                                            <div className="w-2.5 h-2.5 mt-2 rounded-full bg-indigo-500 flex-shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
                                            <p className="text-slate-700 font-bold leading-relaxed text-xs md:text-sm">{principle}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 4. Key Concepts */}
                            <section className="space-y-4 md:space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                                <div className="flex items-center gap-3 md:gap-4 text-amber-600">
                                    <Hash className="w-6 h-6 md:w-8 md:h-8" />
                                    <h3 className="font-black border-b-2 md:border-b-4 border-amber-50 pb-1.5 md:pb-2 text-base md:text-xl">{t.theoryConceptsLabel}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 md:gap-4">
                                    {selectedDetailTheory.key_concepts?.map((concept, cIdx) => (
                                        <span key={cIdx} className="bg-amber-50 text-amber-900 px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-[2rem] font-black border border-amber-100/50 shadow-sm hover:bg-amber-100 transition-colors text-xs md:text-sm cursor-default select-none">
                                            {concept}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                   </div>
                   
                   {/* Modal Footer */}
                   <div className="p-4 md:p-8 border-t border-slate-100 bg-slate-50 flex justify-center md:justify-end flex-shrink-0">
                        <button 
                            onClick={() => setSelectedDetailTheory(null)}
                            className="w-full md:w-auto bg-indigo-600 text-white px-10 md:px-16 py-3.5 md:py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 transform active:scale-95 text-sm"
                        >
                            {lang === 'ar' ? 'فهمت، العودة للاختيار' : 'Got it, back to selection'}
                        </button>
                   </div>
              </div>
          </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-0 md:p-4">
            <div className="bg-white md:rounded-3xl w-full max-w-6xl h-full md:max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200 relative flex flex-col">
                <button 
                    onClick={() => setShowModal(false)} 
                    className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-rose-100 hover:text-rose-600 z-50 transition-colors shadow-sm`}
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="p-5 md:p-10 flex-grow overflow-y-auto">
                    <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-slate-100 pb-5 md:pb-6 pr-12 md:pr-0">
                        <div className="bg-indigo-600 p-2.5 md:p-3 rounded-xl text-white shadow-lg flex-shrink-0">
                            <Scale className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h2 className="font-black text-slate-900 leading-tight text-lg md:text-2xl">{t.compareModalTitle}</h2>
                            <p className="text-slate-500 font-bold text-xs md:text-sm">{t.compareModalSubtitle}</p>
                        </div>
                    </div>

                    {isComparing ? (
                        <div className="flex flex-col items-center justify-center py-20 md:py-24 text-center">
                            <div className="relative mb-6 md:mb-8">
                                <Loader2 className="w-16 h-16 md:w-20 md:h-20 text-indigo-600 animate-spin" />
                                <div className="absolute inset-0 bg-indigo-500/10 blur-xl animate-pulse rounded-full"></div>
                            </div>
                            <h3 className="font-black text-slate-800 mb-1 md:mb-2 text-base md:text-xl">{t.comparingMsg}</h3>
                            <p className="text-slate-500 font-bold text-sm md:text-base">{t.comparingSubMsg}</p>
                        </div>
                    ) : comparisonError ? (
                        <div className="text-center p-10 md:p-12 bg-rose-50 rounded-2xl md:rounded-3xl border border-rose-100 max-w-lg mx-auto my-10">
                             <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-rose-600 mx-auto mb-5 md:mb-6" />
                             <h3 className="font-black text-rose-900 mb-1 md:mb-2 text-lg md:text-xl">{t.compareErrorTitle}</h3>
                             <p className="text-rose-700 mb-6 font-medium text-sm md:text-base">{comparisonError}</p>
                             <button onClick={handleCompare} className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-3.5 rounded-2xl font-black shadow-lg transition-all text-sm">{t.retryBtn}</button>
                        </div>
                    ) : comparisonResult ? (
                        <div className="space-y-12 md:space-y-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                                <div className="bg-emerald-50/30 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-emerald-100/50 shadow-sm relative overflow-hidden flex flex-col">
                                    <h4 className="font-black text-emerald-800 mb-4 flex items-center gap-3 relative z-10 text-sm md:text-base">
                                        <Zap className="w-5 h-5" />
                                        <div className="flex items-center gap-2">
                                          {t.commonGround}
                                        </div>
                                    </h4>
                                    <div className="h-1.5 w-full bg-emerald-100 rounded-full mb-6 overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-full animate-in slide-in-from-left duration-1000"></div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed md:leading-loose font-bold text-justify relative z-10 flex-grow text-xs md:text-sm">
                                        {safeText(comparisonResult.common_ground)}
                                    </p>
                                </div>

                                <div className="bg-blue-50/30 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-blue-100/50 shadow-sm relative overflow-hidden flex flex-col">
                                    <h4 className="font-black text-blue-800 mb-4 flex items-center gap-3 relative z-10 text-sm md:text-base">
                                        <Target className="w-5 h-5" />
                                        <div className="flex items-center gap-2">
                                          {t.keyDifferences}
                                        </div>
                                    </h4>
                                    <div className="h-1.5 w-full bg-blue-100 rounded-full mb-6 overflow-hidden">
                                        <div className="h-full bg-blue-500 w-full animate-in slide-in-from-left duration-1000"></div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed md:leading-loose font-bold text-justify relative z-10 flex-grow text-xs md:text-sm">
                                        {safeText(comparisonResult.key_differences)}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-10 md:space-y-12">
                                {comparisonResult.analysis.map((item, idx) => (
                                    <div key={idx} className="border-b border-slate-100 pb-10 md:pb-12 last:border-0">
                                        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                            <div className="w-1.5 h-6 md:h-10 bg-indigo-600 rounded-full"></div>
                                            <h5 className="font-black text-slate-900 tracking-tight text-sm md:text-lg">
                                                {item.theory_name}
                                            </h5>
                                        </div>

                                        <div className="space-y-6 md:space-y-8 max-w-5xl">
                                            <div className="space-y-2 md:space-y-3">
                                                <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-wider text-[10px] md:text-xs">
                                                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6"/> 
                                                    {t.pros}
                                                </div>
                                                <p className="text-slate-700 font-bold leading-relaxed text-justify opacity-90 text-xs md:text-sm">
                                                    {safeText(item.pros)}
                                                </p>
                                            </div>

                                            <div className="space-y-2 md:space-y-3">
                                                <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-wider text-[10px] md:text-xs">
                                                    <TrendingDown className="w-4 h-4 md:w-6 md:h-6"/> 
                                                    {t.cons}
                                                </div>
                                                <p className="text-slate-700 font-bold leading-relaxed text-justify opacity-90 text-xs md:text-sm">
                                                    {safeText(item.cons)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-indigo-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -mr-16 -mt-16 md:-mr-20 md:-mt-20 blur-2xl md:blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                                
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-white/20 backdrop-blur-md mb-6 md:mb-8 border border-white/20 text-indigo-50 font-black tracking-widest uppercase text-[10px] md:text-xs">
                                        <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
                                        {t.recommendation}
                                    </div>
                                    <h3 className="font-black mb-4 md:mb-6 leading-tight text-base md:text-2xl">
                                        {lang === 'ar' ? 'الرؤية المنهجية الختامية' : 'Final Methodological Insight'}
                                    </h3>
                                    <div className="max-w-4xl">
                                        <p className="leading-relaxed md:leading-loose font-bold text-indigo-50 text-justify text-xs md:text-base opacity-95">
                                            {safeText(comparisonResult.recommendation)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default StepTheories;
