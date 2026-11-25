import { useEffect, useState } from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

export default function Logo({
  variant = 'dark',
  compact = false,
  className = '',
}: LogoProps) {
  const primarySrc =
    variant === 'light' ? '/images/nhcsa-logo-white.png' : '/images/nhcsa-logo.png';

  const [imgSrc, setImgSrc] = useState(primarySrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(primarySrc);
    setFailed(false);
  }, [primarySrc]);

  const handleError = () => {
    if (imgSrc !== '/images/nhcsa-logo.png') {
      setImgSrc('/images/nhcsa-logo.png');
    } else {
      setFailed(true);
    }
  };

  // At ~3.34:1 aspect ratio, h-12 (48px) ≈ 160px wide, h-14 (56px) ≈ 187px wide, h-16 (64px) ≈ 214px wide
  const sizeClass = compact ? 'h-9 sm:h-10' : 'h-11 sm:h-12';

  if (failed) {
    return (
      <span
        className={`inline-flex ${sizeClass} items-center justify-center rounded-lg px-4 font-heading text-sm font-extrabold tracking-wide ${
          variant === 'light'
            ? 'bg-white text-[#052d5a]'
            : 'bg-[#052d5a] text-white'
        } ${className}`}
      >
        NHCSA
      </span>
    );
  }

  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
     <img
  src={imgSrc}
  alt="Nepal HealthCare Skills Academy"
  onError={handleError}
  className={`${sizeClass} w-auto max-w-[180px] object-contain ${
    variant === 'light' && imgSrc === '/images/nhcsa-logo.png'
      ? 'brightness-0 invert'
      : ''
  }`}
/>
    </span>
  );
}