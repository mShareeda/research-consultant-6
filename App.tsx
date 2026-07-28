
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StepInput from "./components/StepInput";
import StepTheories from "./components/StepTheories";
import StepHypothesesPicking from "./components/StepHypothesesPicking";
import StepReport from "./components/StepReport";
import Loading from "./components/Loading";
import { AppState, AcademicLevel, Theory, Language, ResearchType } from "./types";
import { getTheorySuggestions, getFinalReport, getTheoriesHypotheses } from "./services/gemini";
import { getSafeTranslations } from "./utils/translations";

const initialState: AppState = {
  language: null,
  step: 0,
  academicLevel: AcademicLevel.Master,
  researchType: ResearchType.Quantitative,
  researchFoundation: "",
  researchTitle: "",
  suggestedTheories: [],
  selectedTheories: [],
  theoriesHypotheses: {},
  userSelectedHypotheses: [],
  comparisonResult: null,
  finalReport: null,
  isLoading: false,
  error: null,
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.step]);

  useEffect(() => {
      const dir = state.language === 'en' ? 'ltr' : 'rtl';
      document.documentElement.dir = dir;
      document.documentElement.lang = state.language || 'ar';
  }, [state.language]);

  const selectLanguage = (lang: Language) => {
      setState(prev => ({ ...prev, language: lang, step: 1 }));
  };

  const handleInputSubmit = async (title: string, level: AcademicLevel, type: ResearchType, foundation: string) => {
    if (!state.language) return;
    setState((prev) => ({ 
      ...prev, 
      isLoading: true, 
      error: null, 
      researchTitle: title, 
      academicLevel: level, 
      researchType: type,
      researchFoundation: foundation 
    }));
    try {
      const theories = await getTheorySuggestions(title, level, type, foundation, state.language);
      setState((prev) => ({ ...prev, isLoading: false, suggestedTheories: theories, step: 2 }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
    }
  };

  const handleToggleTheory = (theory: Theory) => {
      setState(prev => {
          const exists = prev.selectedTheories.find(t => t.name === theory.name);
          if (exists) return { ...prev, selectedTheories: prev.selectedTheories.filter(t => t.name !== theory.name) };
          return { ...prev, selectedTheories: [...prev.selectedTheories, theory] };
      });
  };

  const handleProceedToHypotheses = async () => {
      if (!state.language || state.selectedTheories.length === 0) return;
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
          const hyps = await getTheoriesHypotheses(state.selectedTheories, state.language, state.researchType);
          setState(prev => ({ ...prev, isLoading: false, theoriesHypotheses: hyps, step: 3 }));
      } catch (error: any) {
          setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      }
  };

  const handleToggleHypothesis = (hyp: string) => {
      setState(prev => {
          const exists = prev.userSelectedHypotheses.includes(hyp);
          if (exists) return { ...prev, userSelectedHypotheses: prev.userSelectedHypotheses.filter(h => h !== hyp) };
          return { ...prev, userSelectedHypotheses: [...prev.userSelectedHypotheses, hyp] };
      });
  };

  const handleToggleBatchHypotheses = (hyps: string[], select: boolean) => {
    setState(prev => {
      let nextSelected = [...prev.userSelectedHypotheses];
      if (select) {
        const toAdd = hyps.filter(h => !nextSelected.includes(h));
        nextSelected = [...nextSelected, ...toAdd];
      } else {
        nextSelected = nextSelected.filter(h => !hyps.includes(h));
      }
      return { ...prev, userSelectedHypotheses: nextSelected };
    });
  };

  const handleGenerateReport = async () => {
      if (!state.language) return;
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
          const report = await getFinalReport(
              state.researchTitle, 
              state.academicLevel, 
              state.researchType,
              state.selectedTheories, 
              state.userSelectedHypotheses, 
              state.language
          );
          setState(prev => ({ ...prev, isLoading: false, finalReport: report, step: 4 }));
      } catch (error: any) {
          setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      }
  };

  const handleLoadMoreTheories = async () => {
    if (!state.language) return;
    setIsLoadingMore(true);
    try {
        const existingNames = state.suggestedTheories.map(t => t.name);
        const newTheories = await getTheorySuggestions(state.researchTitle, state.academicLevel, state.researchType, state.researchFoundation, state.language, existingNames);
        setState(prev => ({ ...prev, suggestedTheories: [...prev.suggestedTheories, ...newTheories] }));
    } catch (error: any) {
         setState((prev) => ({ ...prev, error: error.message }));
    } finally {
        setIsLoadingMore(false);
    }
  };

  const resetApp = () => setState({ ...initialState, language: state.language, step: 1 });

  const currentTranslations = getSafeTranslations(state.language);

  return (
    <div className={`min-h-screen w-full pb-0 flex flex-col bg-slate-50/50 ${state.language === 'ar' ? 'font-sans' : ''}`}>
      {state.step !== 0 && <Header lang={state.language} />}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full mt-8">
        <main className="relative">
            {state.error && (
                <div className="bg-rose-50 text-rose-900 p-6 rounded-2xl mb-8 text-center border border-rose-200 shadow-sm font-bold flex flex-col items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    <span>{state.error}</span>
                </div>
            )}

            {state.step === 0 && (
                <div className="min-h-[90vh] w-full flex flex-col items-center justify-center p-4">
                     {/* Outside Branding Section */}
                     <div className="text-center mb-10 space-y-8 animate-in fade-in slide-in-from-top-6 duration-1000">
                         {/* Logo First */}
                         <div className="relative">
                            <img 
                              src="https://drive.google.com/thumbnail?id=1uEEM3KvDl2vrTEF25p3HBvCOXQF3KsGW&sz=w1000" 
                              alt="Logo" 
                              className="h-32 md:h-44 mx-auto object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500"
                            />
                         </div>

                         {/* Titles Second with increased spacing */}
                         <div className="space-y-6">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent drop-shadow-sm leading-tight">
                                نظام مواءمة النظرية الذكي
                            </h1>
                            <h2 className="text-lg md:text-2xl font-bold text-slate-500 tracking-[0.2em] uppercase pt-2">
                                Smart Theory Alignment System
                            </h2>
                         </div>
                     </div>

                     {/* Language Selection Container */}
                     <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-xl w-full text-center space-y-10 animate-in zoom-in duration-700 delay-300">
                         {/* Reordered descriptive text: English Left, Arabic Right */}
                         <div className="text-slate-500 font-bold text-sm md:text-base italic flex items-center justify-center gap-2 flex-wrap" dir="ltr">
                            <span>Choose Interface Language</span>
                            <span className="text-slate-300">/</span>
                            <span dir="rtl">اختر لغة الواجهة</span>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-6">
                             <button 
                                onClick={() => selectLanguage('ar')}
                                className="group relative overflow-hidden bg-white border-2 border-slate-100 hover:border-indigo-500 p-6 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col items-center justify-center active:scale-95"
                             >
                                 <span className="font-black text-2xl md:text-3xl text-slate-800 group-hover:text-indigo-600 transition-colors">العربية</span>
                                 <div className="h-1 w-0 group-hover:w-full bg-indigo-600 transition-all duration-300 mt-2 rounded-full"></div>
                             </button>

                             <button 
                                onClick={() => selectLanguage('en')}
                                className="group relative overflow-hidden bg-white border-2 border-slate-100 hover:border-indigo-500 p-6 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col items-center justify-center active:scale-95"
                             >
                                 <span className="font-black text-2xl md:text-3xl text-slate-800 group-hover:text-indigo-600 transition-colors">English</span>
                                 <div className="h-1 w-0 group-hover:w-full bg-indigo-600 transition-all duration-300 mt-2 rounded-full"></div>
                             </button>
                         </div>
                     </div>
                </div>
            )}

            {state.step === 1 && <StepInput onSubmit={handleInputSubmit} onBack={() => setState(prev => ({ ...prev, step: 0 }))} lang={state.language!} />}

            {state.step === 2 && (
                <StepTheories 
                    theories={state.suggestedTheories} 
                    selectedTheories={state.selectedTheories}
                    onToggleSelection={handleToggleTheory}
                    onProceed={handleProceedToHypotheses}
                    onBack={() => setState(p => ({ ...p, step: 1 }))}
                    onLoadMore={handleLoadMoreTheories}
                    onCompareResult={(res) => setState(p => ({ ...p, comparisonResult: res }))}
                    title={state.researchTitle}
                    lang={state.language!}
                />
            )}

            {state.step === 3 && (
                <StepHypothesesPicking 
                    theories={state.selectedTheories}
                    theoriesHypotheses={state.theoriesHypotheses}
                    selectedHypotheses={state.userSelectedHypotheses}
                    onToggle={handleToggleHypothesis}
                    onToggleBatch={handleToggleBatchHypotheses}
                    onSubmit={handleGenerateReport}
                    onBack={() => setState(p => ({ ...p, step: 2 }))}
                    lang={state.language!}
                />
            )}

            {state.step === 4 && state.finalReport && (
                <StepReport 
                    report={state.finalReport}
                    theories={state.selectedTheories} 
                    theoriesHypotheses={state.theoriesHypotheses}
                    selectedHypotheses={state.userSelectedHypotheses}
                    title={state.researchTitle}
                    level={state.academicLevel}
                    comparisonResult={state.comparisonResult}
                    onReset={resetApp}
                    onBack={() => setState(p => ({ ...p, step: 3 }))}
                    lang={state.language!}
                />
            )}
        </main>
      </div>

      {state.step !== 0 && (
          <footer className="w-full py-10 text-center mt-20 border-t border-slate-200 bg-white/50">
              <p className="text-slate-700 font-black text-sm">{currentTranslations.footerRights}</p>
              <p className="text-slate-400 text-xs font-bold mt-2 font-mono tracking-widest opacity-60" dir="ltr">@mShareeda 2025</p>
          </footer>
      )}
      
      {(state.isLoading || isLoadingMore) && <Loading lang={state.language} />}
    </div>
  );
};

export default App;
