
import React, { useState } from "react";
import { AcademicLevel, Language, ResearchType } from "../types";
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, GraduationCap, ScrollText, Users, TrendingUp, Cpu, Brain, Briefcase, Gavel, Tv, MoreHorizontal, Globe, BarChart3, Search, Languages } from "lucide-react";
import { translations } from "../utils/translations";

interface StepInputProps {
  onSubmit: (title: string, level: AcademicLevel, type: ResearchType, foundation: string) => void;
  onBack: () => void;
  lang: Language;
}

const StepInput: React.FC<StepInputProps> = ({ onSubmit, onBack, lang }) => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState<AcademicLevel>(AcademicLevel.Master);
  const [researchType, setResearchType] = useState<ResearchType>(ResearchType.Quantitative);
  const [foundation, setFoundation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length > 10 && foundation) {
      setIsSubmitting(true);
      onSubmit(title, level, researchType, foundation);
    }
  };

  const levels = [
    { id: AcademicLevel.Bachelor, icon: BookOpen, label: t.levelBachelor, desc: t.levelBachelorDesc },
    { id: AcademicLevel.Master, icon: ScrollText, label: t.levelMaster, desc: t.levelMasterDesc },
    { id: AcademicLevel.PhD, icon: GraduationCap, label: t.levelPhD, desc: t.levelPhDDesc },
  ];

  const researchTypes = [
    { id: ResearchType.Quantitative, icon: BarChart3, label: t.typeQuantitative, desc: t.typeQuantitativeDesc },
    { id: ResearchType.Qualitative, icon: Search, label: t.typeQualitative, desc: t.typeQualitativeDesc },
  ];

  const foundations: { id: string; icon: any; label: string }[] = [
    { id: "Media", icon: Tv, label: t.foundationMedia },
    { id: "Social", icon: Users, label: t.foundationSocial },
    { id: "Economic", icon: TrendingUp, label: t.foundationEconomic },
    { id: "Educational", icon: BookOpen, label: t.foundationEdu },
    { id: "Psychological", icon: Brain, label: t.foundationPsych },
    { id: "Administrative", icon: Briefcase, label: t.foundationAdmin },
    { id: "Technical", icon: Cpu, label: t.foundationTech },
    { id: "Legal", icon: Gavel, label: t.foundationLegal },
    { id: "Humanities", icon: Languages, label: t.foundationHumanities },
    { id: "Other", icon: MoreHorizontal, label: t.foundationOther },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
      <div className="bg-white rounded-[2rem] shadow-card border border-white/50 p-6 md:p-10 animate-in slide-in-from-bottom-4 duration-500 ring-1 ring-slate-100">
        <div className="mb-8 md:mb-10 text-center relative">
          <button 
            onClick={onBack}
            type="button"
            className={`absolute top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} p-3 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-2 font-bold text-xs md:text-sm group`}
          >
            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">{t.backToLangBtn}</span>
          </button>
          
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 md:mb-3 tracking-tight">{t.inputTitle}</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto text-balance">
            {t.inputSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          {/* Academic Level Section */}
          <div className="space-y-4">
            <label className={`flex items-center gap-2 font-extrabold text-slate-900 ${lang === 'ar' ? 'mr-1 border-r-4 pr-3' : 'ml-1 border-l-4 pl-3'} border-indigo-600`}>
              {t.levelLabel}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {levels.map((lvl) => {
                const Icon = lvl.icon;
                const isSelected = level === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setLevel(lvl.id)}
                    className={`relative p-3.5 md:p-4 rounded-2xl transition-all duration-300 flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-3 group border-2 ${
                      isSelected
                        ? "bg-indigo-50/50 border-indigo-600 shadow-glow md:scale-105"
                        : "bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50 md:hover:scale-[1.02]"
                    }`}
                  >
                    <div className={`p-2.5 md:p-3 rounded-xl transition-colors flex-shrink-0 ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50"}`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-left md:text-center flex-grow md:flex-grow-0">
                      <div className={`font-bold text-sm md:text-base ${isSelected ? "text-indigo-900" : "text-slate-600"}`}>
                        {lvl.label}
                      </div>
                      <div className="text-[11px] md:text-sm font-medium text-slate-400 md:mt-1">{lvl.desc}</div>
                    </div>
                    {isSelected && (
                        <div className={`absolute top-2.5 right-2.5 md:top-3 md:right-3 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Research Type Section */}
          <div className="space-y-4">
            <label className={`flex items-center gap-2 font-extrabold text-slate-900 ${lang === 'ar' ? 'mr-1 border-r-4 pr-3' : 'ml-1 border-l-4 pl-3'} border-purple-500`}>
              {t.typeLabel}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {researchTypes.map((rt) => {
                const Icon = rt.icon;
                const isSelected = researchType === rt.id;
                return (
                  <button
                    key={rt.id}
                    type="button"
                    onClick={() => setResearchType(rt.id)}
                    className={`relative p-3.5 md:p-4 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 md:gap-4 group border-2 ${
                      isSelected
                        ? "bg-purple-50/50 border-purple-600 shadow-glow md:scale-105"
                        : "bg-white border-slate-100 hover:border-purple-200 hover:bg-slate-50 md:hover:scale-[1.02]"
                    }`}
                  >
                    <div className={`p-2.5 md:p-3 rounded-xl transition-colors flex-shrink-0 ${isSelected ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-purple-500 group-hover:bg-purple-50"}`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className={`font-bold text-sm md:text-base ${isSelected ? "text-purple-900" : "text-slate-600"}`}>
                        {rt.label}
                      </div>
                      <div className="text-[11px] md:text-sm font-medium text-slate-400 md:mt-1">{rt.desc}</div>
                    </div>
                    {isSelected && (
                        <div className={`absolute top-2.5 right-2.5 md:top-3 md:right-3 w-1.5 h-1.5 bg-purple-600 rounded-full animate-ping`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Research Foundation Section */}
          <div className="space-y-4">
            <label className={`block font-extrabold text-slate-900 ${lang === 'ar' ? 'mr-1 border-r-4 pr-3' : 'ml-1 border-l-4 pl-3'} border-emerald-500`}>
              {t.foundationLabel}
              <span className={`text-xs md:text-sm font-medium text-slate-400 ${lang === 'ar' ? 'mr-2' : 'ml-2'}`}>{t.foundationSubLabel}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {foundations.map((foun) => {
                    const Icon = foun.icon;
                    const isSelected = foundation === foun.id;
                    return (
                        <button
                            key={foun.id}
                            type="button"
                            onClick={() => setFoundation(foun.id)}
                            className={`p-3 md:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 group ${
                                isSelected 
                                ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm md:scale-105" 
                                : "bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-500"
                            }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"}`}>
                              <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className={`font-bold text-xs md:text-sm text-center leading-tight transition-colors ${isSelected ? "text-emerald-900" : ""}`}>
                                {foun.label}
                            </span>
                        </button>
                    )
                })}
            </div>
          </div>

          {/* Research Title Section */}
          <div className="space-y-4">
            <label className={`block font-extrabold text-slate-900 ${lang === 'ar' ? 'mr-1 border-r-4 pr-3' : 'ml-1 border-l-4 pl-3'} border-amber-500`}>
              {t.titleLabel}
            </label>
            <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-xl transition-opacity opacity-0 group-focus-within:opacity-100"></div>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`relative w-full px-4 md:px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all min-h-[140px] md:min-h-[160px] text-sm md:text-base font-medium leading-relaxed md:leading-loose resize-none shadow-inner ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                    placeholder={t.titlePlaceholder}
                    required
                />
                <div className={`absolute bottom-3 ${lang === 'ar' ? 'left-3' : 'right-3'} font-black px-1.5 py-0.5 rounded-lg border transition-all text-[8px] md:text-[9px] uppercase tracking-tighter opacity-80 ${
                  title.length > 10 ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-400 bg-white/80 border-slate-100"
                }`}>
                    {title.length} {t.charCount}
                </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={title.trim().length < 10 || !foundation || isSubmitting}
            className={`w-full py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-3 group transition-all duration-300 relative overflow-hidden
              ${title.trim().length >= 10 && foundation && !isSubmitting
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 md:hover:-translate-y-0.5 active:translate-y-0" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
          >
            <span className="relative z-10 text-sm md:text-base">{isSubmitting ? t.submittingBtn : t.submitBtn}</span>
            {title.trim().length >= 10 && foundation && !isSubmitting ? (
               <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse relative z-10" />
            ) : (
                lang === 'ar' ? <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 relative z-10" /> : <ArrowRight className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StepInput;
