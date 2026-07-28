
import React from "react";
import { FlaskConical } from "lucide-react";
import { Language } from "../types";
import { getSafeTranslations } from "../utils/translations";

interface HeaderProps {
    lang: Language | null;
}

const Header: React.FC<HeaderProps> = ({ lang }) => {
  const t = getSafeTranslations(lang);

  return (
    <header className="w-full py-2 md:py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 transition-all duration-300 supports-[backdrop-filter]:bg-white/60 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-row items-center justify-between gap-3 md:gap-4 relative ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
          
          {/* Branding */}
          <div className="flex items-center z-10 select-none flex-shrink-0">
             <img 
               src="https://drive.google.com/thumbnail?id=1uEEM3KvDl2vrTEF25p3HBvCOXQF3KsGW&sz=w1000" 
               referrerPolicy="no-referrer"
               alt="Logo" 
               className="h-14 sm:h-20 md:h-32 w-auto min-w-[90px] sm:min-w-[120px] object-contain drop-shadow-sm transition-all"
             />
          </div>

          {/* Title Area */}
          <div className={`w-full pointer-events-none flex-grow flex flex-col justify-center overflow-hidden ${lang === 'en' ? 'items-start text-left' : 'items-end text-right'}`}>
            <h1 className="text-sm sm:text-lg md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight pointer-events-auto drop-shadow-sm bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-snug md:leading-tight py-1 md:py-4 truncate max-w-full">
              {t.appTitle}
            </h1>
            
            {/* Beta Badge */}
            <div className={`pointer-events-auto mt-0.5 md:mt-0 animate-in fade-in duration-700 delay-300 ${lang === 'en' ? 'slide-in-from-left-4' : 'slide-in-from-right-4'}`}>
                <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50 text-amber-600/90 shadow-sm hover:shadow-md transition-all cursor-help select-none">
                    <FlaskConical className="w-2.5 md:w-3 h-2.5 md:h-3" strokeWidth={3} />
                    <span dir="ltr" className="font-mono !text-[8px] md:!text-[10px] font-bold tracking-widest uppercase">{t.beta}</span>
                </span>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;