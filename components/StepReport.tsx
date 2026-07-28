
import React, { useState } from "react";
import { Report, Theory, AcademicLevel, Language, ComparisonResult } from "../types";
import { RefreshCw, FileText, Layers, Calendar, Lightbulb, GraduationCap, AlertTriangle, Scale, Zap, Target, Link, BookOpen, Quote, ArrowLeft, ArrowRight, Copy, CheckCircle } from "lucide-react";
import { translations } from "../utils/translations";
import Mermaid from "./Mermaid";

const safeText = (content: any): string => {
  if (typeof content === 'string') return content;
  if (!content) return '';
  if (Array.isArray(content)) return content.join(', ');
  if (typeof content === 'object') {
    // Flatten objects to a simple comma-separated string of values for clean reading
    return Object.values(content)
      .filter(v => typeof v !== 'object')
      .join(', ');
  }
  return String(content);
};

interface StepReportProps {
  report: Report;
  theories: Theory[];
  theoriesHypotheses: Record<string, string[]>;
  selectedHypotheses: string[];
  title: string;
  level: AcademicLevel;
  comparisonResult: ComparisonResult | null;
  onReset: () => void;
  onBack: () => void;
  lang: Language;
}

const StepReport: React.FC<StepReportProps> = ({ 
    report, theories, theoriesHypotheses, selectedHypotheses, title, level, comparisonResult, onReset, onBack, lang 
}) => {
  const t = translations[lang];
  const [copying, setCopying] = useState(false);

  const levelLabels: Record<string, string> = {
    [AcademicLevel.Bachelor]: t.levelBachelor,
    [AcademicLevel.Master]: t.levelMaster,
    [AcademicLevel.PhD]: t.levelPhD,
  };

  const currentLevelLabel = levelLabels[level] || level;

  const handleCopyReport = async () => {
    setCopying(true);
    const content = `
${t.reportTitle}
---------------------------
${t.studyTitle} ${title}
${t.levelLabel}: ${currentLevelLabel}

${t.adoptedTheoryLabel}
${theories.map(th => `- ${th.name}`).join('\n')}

${t.ivLabel}: ${report.independent_variable}
${t.dvLabel}: ${report.dependent_variable}

${t.justificationTitle}:
${report.theory_integration}

${t.studyHypotheses}:
${report.study_hypotheses.map((h, i) => `${i + 1}. ${h.text}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(content);
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      setCopying(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-700 pb-10 px-2 sm:px-0">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3 md:gap-4 bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100 z-30 relative no-print">
        <h2 className="font-black text-slate-900 flex items-center gap-2 md:gap-3 text-sm md:text-xl flex-shrink-0">
            <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg text-white shadow-md">
                <FileText className="w-4 h-4 md:w-5 md:h-5"/>
            </div>
            <span className="truncate max-w-[150px] sm:max-w-none">{t.reportTitle}</span>
        </h2>
        
        <div className="flex flex-row items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar justify-start md:justify-end">
          <button onClick={onBack} className="flex-shrink-0 px-3 md:px-4 py-2.5 md:py-3 text-slate-600 hover:text-indigo-600 rounded-xl flex items-center gap-1.5 font-bold transition-all text-xs md:text-sm border border-slate-100 bg-white hover:bg-slate-50">
            {lang === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            {t.backToHypBtn}
          </button>
          
          <div className="h-6 w-px bg-slate-200 mx-1 flex-shrink-0"></div>

          <button 
            onClick={handleCopyReport}
            className="flex-shrink-0 px-3 md:px-4 py-2.5 md:py-3 text-slate-600 hover:text-indigo-600 rounded-xl flex items-center gap-1.5 font-bold transition-all text-xs md:text-sm border border-slate-100 bg-white hover:bg-slate-50"
          >
            {copying ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copying ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ النص' : 'Copy Text')}</span>
          </button>

          <button onClick={onReset} className="flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 bg-indigo-600 text-white border border-indigo-700 rounded-xl flex items-center gap-1.5 font-bold shadow-md transition-all hover:bg-indigo-700 active:scale-95 text-xs md:text-sm">
            <RefreshCw className="w-3.5 h-3.5" />
            {t.newSearch}
          </button>
        </div>
      </div>

      <div className="rounded-3xl md:rounded-[2.5rem] shadow-xl border border-slate-100 bg-white relative overflow-hidden">
         <div id="report-content" className="p-6 md:p-16 relative bg-white">
            <div className="absolute top-0 left-0 w-full h-2 md:h-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 no-print"></div>
            
            <div className="relative z-10 mb-8 md:mb-12 border-b-2 border-slate-50 md:border-slate-100 pb-8 md:pb-10">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                   <span className="px-3 md:px-4 py-1.5 rounded-full font-black bg-slate-900 text-white shadow-sm text-[10px] md:text-xs uppercase tracking-wider">{currentLevelLabel}</span>
                   <div className="flex items-center gap-1.5 md:gap-2 text-slate-400 font-bold bg-slate-50 px-2.5 py-1 rounded-lg text-[10px] md:text-xs">
                     <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                     <span>{new Date().toLocaleDateString(lang === 'ar' ? 'ar-BH' : 'en-US')}</span>
                   </div>
                </div>
                <h1 className="font-black text-slate-900 mb-6 md:mb-8 leading-tight text-lg md:text-3xl">{title}</h1>
                
                <div className="space-y-2.5 md:space-y-3">
                   <div className="flex items-center gap-2 text-indigo-600 font-extrabold uppercase tracking-wider mb-1 md:mb-2 text-[10px] md:text-xs">
                       <Layers className="w-3 h-3 md:w-4 md:h-4" />
                       {t.adoptedTheoryLabel}
                   </div>
                   <div className="flex flex-wrap gap-2 md:gap-3">
                       {theories.map((theory, i) => (
                           <div key={i} className="bg-indigo-50 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl border border-indigo-100 text-indigo-700 font-black shadow-sm text-xs md:text-base tag">
                               {theory.name}
                           </div>
                       ))}
                   </div>
                </div>
            </div>

            {/* Visual Conceptual Framework Section */}
            {report.mermaid_diagram && (
               <div className="relative z-10 mb-12 md:mb-16 border-b-2 border-slate-50 md:border-slate-100 pb-12 md:pb-16">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-10">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-1.5 h-6 md:h-8 bg-blue-500 rounded-full"></div>
                      <div>
                        <h3 className="font-black text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl">
                          {t.conceptualFramework}
                        </h3>
                        <p className="text-slate-500 font-bold text-[10px] md:text-xs mt-1">{t.conceptualFrameworkDesc}</p>
                      </div>
                    </div>
                  </div>
                  <Mermaid chart={report.mermaid_diagram} />
               </div>
            )}

            {comparisonResult && (
               <div className="relative z-10 mb-10 md:mb-14 border-b-2 border-slate-50 md:border-slate-100 pb-10 md:pb-14">
                  <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                      <div className="w-1.5 h-6 md:h-8 bg-indigo-600 rounded-full"></div>
                      <h3 className="font-black text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl"><Scale className="w-5 h-5 md:w-7 md:h-7 text-indigo-600" />{t.compareModalTitle}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-6 md:mb-8">
                      <div className="bg-emerald-50/40 p-5 md:p-6 rounded-2xl border border-emerald-100 flex flex-col section-box">
                          <h4 className="font-black text-emerald-800 mb-2.5 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                            <Zap className="w-4 md:w-5 h-4 md:h-5" />
                            {t.commonGround}
                          </h4>
                          <p className="text-slate-700 font-bold text-justify leading-relaxed flex-grow text-xs md:text-sm">{safeText(comparisonResult.common_ground)}</p>
                      </div>
                      <div className="bg-blue-50/40 p-5 md:p-6 rounded-2xl border border-blue-100 flex flex-col section-box">
                          <h4 className="font-black text-blue-800 mb-2.5 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                            <Target className="w-4 md:w-5 h-4 md:h-5" />
                            {t.keyDifferences}
                          </h4>
                          <p className="text-slate-700 font-bold text-justify leading-relaxed flex-grow text-xs md:text-sm">{safeText(comparisonResult.key_differences)}</p>
                      </div>
                  </div>
               </div>
            )}

            <div className="relative z-10 mb-10 md:mb-14">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                    <div className="w-1.5 h-6 md:h-8 bg-indigo-500 rounded-full"></div>
                    <h3 className="font-black text-slate-900 text-base md:text-xl">{t.justificationTitle}</h3>
                </div>
                <div className="text-slate-700 leading-relaxed md:leading-loose text-justify font-bold bg-slate-50/50 p-5 md:p-8 rounded-2xl border border-slate-100/60 section-box text-xs md:text-base">
                    {safeText(report.theory_integration).split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-5 md:mt-8" : ""}>{paragraph}</p>
                    ))}
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-14">
                <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm variable-box iv-box">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <h4 className="text-emerald-800 font-extrabold uppercase tracking-wider text-[10px] md:text-xs">{t.ivLabel}</h4>
                    </div>
                    <p className="text-emerald-950 font-bold leading-relaxed text-xs md:text-base">{safeText(report.independent_variable)}</p>
                </div>
                <div className="bg-rose-50/80 border border-rose-100 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm variable-box dv-box">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <h4 className="text-rose-800 font-extrabold uppercase tracking-wider text-[10px] md:text-xs">{t.dvLabel}</h4>
                    </div>
                    <p className="text-rose-950 font-bold leading-relaxed text-xs md:text-base">{safeText(report.dependent_variable)}</p>
                </div>
            </div>

            <div className="relative z-10 space-y-12 md:space-y-16">
                <div>
                     <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                        <div className="w-1.5 h-6 md:h-8 bg-amber-500 rounded-full"></div>
                        <h3 className="font-black text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl">
                            <Lightbulb className="w-5 md:w-6 h-5 md:h-6 text-amber-500" />
                            {t.theoryHypotheses}
                        </h3>
                    </div>
                    
                    <div className="space-y-8 md:space-y-10">
                        {theories.map((theory, tIdx) => {
                            const theoryKey = Object.keys(theoriesHypotheses).find(k => k.toLowerCase().includes(theory.name.toLowerCase()) || theory.name.toLowerCase().includes(k.toLowerCase()));
                            const allHyps = (theoryKey ? theoriesHypotheses[theoryKey] : theoriesHypotheses[theory.name]) || [];
                            const theorySelected = allHyps.filter(h => selectedHypotheses.includes(h));
                            
                            if (theorySelected.length === 0) return null;

                            return (
                                <div key={tIdx} className="space-y-4 md:space-y-5">
                                    <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-2.5 border-b border-slate-50">
                                        <BookOpen className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-black text-indigo-900 text-xs md:text-base">
                                              {t.theoryAxiomsLabel} {theory.name}
                                          </h4>
                                        </div>
                                    </div>
                                    <div className="grid gap-3 md:gap-4">
                                        {theorySelected.map((hypothesis, idx) => (
                                            <div key={idx} className="flex gap-3 md:gap-4 items-start bg-slate-50/30 p-4 md:p-5 rounded-xl md:rounded-2xl border border-slate-100/50 section-box">
                                                <div className="w-2 md:w-2.5 h-2 md:h-2.5 mt-1.5 md:mt-2.5 rounded-full bg-amber-400 flex-shrink-0 shadow-sm shadow-amber-200"></div>
                                                <span className="leading-relaxed font-bold text-slate-700 text-xs md:text-sm">{safeText(hypothesis)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="relative">
                     <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-6 md:mb-8 no-print">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 h-6 md:h-8 bg-indigo-500 rounded-full"></div>
                            <h3 className="font-black text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl">
                                <GraduationCap className="w-5 md:w-6 h-5 md:h-6 text-indigo-500" />
                                {t.studyHypotheses}
                            </h3>
                        </div>
                        <div className="bg-indigo-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-indigo-600 font-black italic text-[10px] md:text-xs">
                            <Link className="w-3 h-3" />
                            {lang === 'ar' ? 'مشتقة من الركائز النظرية المختارة' : 'Derived from selected core axioms'}
                        </div>
                    </div>
                    <ul className="space-y-5 md:space-y-6">
                        {report.study_hypotheses.map((hypothesis, idx) => (
                            <li key={idx} className="flex gap-4 md:gap-5 bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm items-start md:hover:shadow-md transition-shadow relative overflow-hidden group">
                                <span className="w-10 md:w-12 h-10 md:h-12 bg-indigo-600 text-white font-black rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 relative z-10 text-xs md:text-base">
                                    {idx + 1}
                                </span>
                                <div className="space-y-3 flex-grow relative z-10">
                                    <p className="text-slate-800 font-bold leading-relaxed pt-1 text-sm md:text-lg">{safeText(hypothesis.text)}</p>
                                    
                                    {hypothesis.derived_from && hypothesis.derived_from.length > 0 && (
                                        <div className="pt-3 border-t border-indigo-50">
                                            <div className="flex items-center gap-2 text-indigo-500 text-[10px] md:text-[11px] font-black mb-2 uppercase tracking-widest">
                                                <Quote className="w-3 h-3" />
                                                {lang === 'ar' ? 'الارتباط النظري بالفرضيات الأساسية:' : 'Theoretical Derivation:'}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {hypothesis.derived_from.map((derivation, dIdx) => (
                                                    <div key={dIdx} className="text-slate-500 text-[10px] md:text-xs italic font-medium bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100 derivation-tag">
                                                        {derivation}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/20 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform no-print"></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-50 text-center relative z-10 disclaimer">
                 <div className="bg-slate-50/50 rounded-xl p-4 md:p-5 border border-slate-200/40 max-w-2xl mx-auto shadow-inner">
                    <div className="flex items-center justify-center gap-2 mb-1.5 text-amber-600/70 font-bold uppercase text-[10px] md:text-xs">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{t.disclaimerTitle}</span>
                    </div>
                    <p className="text-slate-400 font-medium leading-relaxed text-[10px] md:text-[11px]">{t.disclaimerText}</p>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StepReport;
