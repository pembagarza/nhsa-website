import { useState } from 'react';

interface CourseImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** Object-position tuning, e.g. 'object-[72%_35%]' */
  position?: string;
  overlayLabel?: string;
}

/**
 * Course imagery with graceful fallback: tries the given image URL (local
 * public/images/... path or external URL) and falls back to the branded
 * navy-teal gradient frame if it fails to load or is missing.
 */
export default function CourseImage({
  src,
  alt,
  className = '',
  position = 'object-center',
  overlayLabel,
}: CourseImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className={`course-photo relative overflow-hidden ${className}`}>
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${position}`}
        />
      )}
      {(!showImage || overlayLabel) && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-navy/45 ${
            showImage ? 'opacity-0 transition-opacity hover:opacity-100' : ''
          }`}
        >
          {overlayLabel && (
            <p className="px-6 text-center font-heading text-sm font-bold text-white/95">
              {overlayLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
