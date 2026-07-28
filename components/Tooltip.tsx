
import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-slate-800',
  };

  return (
    <div 
      className={`relative inline-flex items-center group ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsVisible(!isVisible);
      }}
    >
      {children || <Info className="w-4 h-4 text-slate-400 hover:text-indigo-500 transition-colors cursor-help" />}
      
      {isVisible && (
        <div className={`absolute z-[9999] w-72 p-4 bg-slate-800 text-white text-[13px] font-bold rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none text-justify leading-relaxed ${positionClasses[position]}`}>
          {content}
          <div className={`absolute w-0 h-0 border-[6px] border-transparent ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
