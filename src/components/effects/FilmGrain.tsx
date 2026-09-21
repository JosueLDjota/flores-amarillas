import React from 'react';

interface FilmGrainProps {
  showVolumetricGlow?: boolean;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ showVolumetricGlow = false }) => {
  return (
    <>
      {/* Pure CSS cinematic vignette without heavy SVG filters */}
      <div className="fixed inset-0 pointer-events-none z-30 vignette-overlay opacity-75" />

      {/* Volumetric warmth / subtle ambient sunflare */}
      {showVolumetricGlow && (
        <div className="fixed -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none z-5" />
      )}
    </>
  );
};
