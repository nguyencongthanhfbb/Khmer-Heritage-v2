import React, { useState, useEffect } from 'react';
import { getAuthenticFallbackImage } from '../utils/imageUtils';
import { Landmark, ShieldCheck } from 'lucide-react';

interface MuseumImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  title?: string;
  category?: string;
  period?: string;
  className?: string;
  aspectRatio?: string;
}

export const MuseumImage: React.FC<MuseumImageProps> = ({
  src,
  alt,
  title,
  category,
  period,
  className = '',
  aspectRatio,
  ...rest
}) => {
  const fallbackUrl = getAuthenticFallbackImage(title || alt, category, period);
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackUrl);
  const [hasError, setHasError] = useState<boolean>(false);
  const [allFailed, setAllFailed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setHasError(false);
      setAllFailed(false);
      setIsLoaded(false);
    } else {
      setCurrentSrc(fallbackUrl);
    }
  }, [src, fallbackUrl]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackUrl) {
      setHasError(true);
      setCurrentSrc(fallbackUrl);
    } else {
      setAllFailed(true);
    }
  };

  if (allFailed) {
    return (
      <div className={`relative overflow-hidden bg-stone-900 border border-stone-800 flex flex-col items-center justify-center p-4 text-center ${aspectRatio ? aspectRatio : ''} ${className}`}>
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
          <Landmark className="w-6 h-6" />
        </div>
        <div className="text-xs font-serif font-bold text-stone-200 line-clamp-2 mb-1">
          {title || alt || 'Hiện vật Khảo cổ Khmer'}
        </div>
        <div className="text-[10px] text-stone-400 font-mono">
          {period || 'Angkor'} • {category || 'Điêu khắc'}
        </div>
        <div className="mt-2 flex items-center space-x-1 text-[9px] text-amber-500/80 font-mono">
          <ShieldCheck className="w-3 h-3" />
          <span>The Met Archive CC0</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-950 ${aspectRatio ? aspectRatio : ''} ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500/80 animate-spin" />
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt || title || 'Khmer Heritage Museum Artifact'}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
