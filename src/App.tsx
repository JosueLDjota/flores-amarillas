import React, { useState } from 'react';
import type { BouquetItem, SceneStep } from './types';
import { CanvasBackground } from './components/effects/CanvasBackground';
import { FireworksCanvas } from './components/effects/FireworksCanvas';
import { CustomCursor } from './components/effects/CustomCursor';
import { FilmGrain } from './components/effects/FilmGrain';
import { IntroScene } from './components/intro/IntroScene';
import { FlowerIllustration } from './components/flowers/FlowerIllustrations';
import { LuxuryLetter } from './components/message/LuxuryLetter';
import { CinematicRevelation } from './components/revelation/CinematicRevelation';
import { FinalScene } from './components/celebration/FinalScene';
import { MusicControl } from './components/ui/MusicControl';
import { RomanticModeToggle } from './components/ui/RomanticModeToggle';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SceneStep>('intro');
  const [isRomantic, setIsRomantic] = useState<boolean>(true);

  // Majestic default bouquet
  const defaultBouquet: BouquetItem[] = [
    { uid: 'b-1', flowerId: 'girasol', rotation: -12, scale: 0.95, offsetX: -45, offsetY: -15, zIndex: 3, swayDelay: 0.1 },
    { uid: 'b-2', flowerId: 'rosa', rotation: 10, scale: 0.9, offsetX: 40, offsetY: -10, zIndex: 4, swayDelay: 0.5 },
    { uid: 'b-3', flowerId: 'margarita', rotation: 0, scale: 1.05, offsetX: 0, offsetY: -35, zIndex: 5, swayDelay: 0.3 },
    { uid: 'b-4', flowerId: 'silvestres', rotation: -22, scale: 0.85, offsetX: -70, offsetY: 15, zIndex: 2, swayDelay: 0.7 },
    { uid: 'b-5', flowerId: 'campo', rotation: 20, scale: 0.9, offsetX: 65, offsetY: 10, zIndex: 2, swayDelay: 0.9 },
  ];

  const handleStartIntro = () => {
    setCurrentStep('transition');
    setTimeout(() => {
      setCurrentStep('garden');
    }, 1800);
  };

  const handleDeliverFlowers = () => {
    setCurrentStep('revelation');
  };

  const handleRevelationComplete = () => {
    setCurrentStep('celebration');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
  };

  const backgroundIntensity =
    currentStep === 'intro' ? 0.35 : currentStep === 'transition' ? 0.75 : 0.95;

  return (
    <div className="relative min-h-screen w-full bg-[#07090e] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Visual background layers */}
      <CanvasBackground isRomantic={isRomantic} intensity={backgroundIntensity} />
      <FireworksCanvas
        active={currentStep === 'celebration' || currentStep === 'final'}
        soundEnabled={true}
      />
      <FilmGrain showVolumetricGlow={currentStep !== 'intro'} />
      <CustomCursor />

      {/* Top Floating Header & Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between pointer-events-none">
        <div
          onClick={() => {
            if (currentStep !== 'intro') setCurrentStep('garden');
          }}
          className="pointer-events-auto cursor-pointer flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-all shadow-md group"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🌻</span>
          <span className="font-serif text-xs sm:text-sm font-medium tracking-wider text-amber-200">
            21 de Septiembre
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2.5">
          <RomanticModeToggle isRomantic={isRomantic} onToggle={setIsRomantic} />
          <MusicControl />
        </div>
      </header>

      {/* Main Experience Stream */}
      <main className="relative z-20 flex-1 flex flex-col pt-16 pb-12 w-full">
        {/* 1. INTRO STEP */}
        {currentStep === 'intro' && <IntroScene onStart={handleStartIntro} />}

        {/* 2. CINEMATIC TRANSITION (Sunrise glow) */}
        {currentStep === 'transition' && (
          <div className="fixed inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000">
            <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-t from-amber-500/30 via-yellow-400/20 to-transparent blur-3xl animate-pulse" />
            <div className="text-center z-10 space-y-3">
              <span className="text-5xl animate-bounce block">🌻</span>
              <p className="font-serif text-2xl text-amber-200 tracking-widest font-light italic">
                Amaneciendo en un campo de luz...
              </p>
            </div>
          </div>
        )}

        {/* 3. BOUQUET & LUXURY LETTER SCENE */}
        {currentStep === 'garden' && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center animate-fade-in space-y-8">
            {/* Visual Bouquet Centerpiece */}
            <div className="relative w-72 md:w-84 h-72 flex items-end justify-center select-none transform-gpu my-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

              <div className="relative w-full h-full flex items-end justify-center">
                {defaultBouquet.map((item, idx) => (
                  <div
                    key={item.uid}
                    className="absolute bottom-10 origin-bottom animate-sway"
                    style={{
                      transform: `translate(${item.offsetX * 0.85}px, ${item.offsetY * 0.85}px) rotate(${item.rotation}deg) scale(${item.scale * 0.9})`,
                      zIndex: item.zIndex,
                      animationDelay: `${idx * 0.3}s`,
                    }}
                  >
                    <FlowerIllustration type={item.flowerId} size={170} glow={true} />
                  </div>
                ))}

                {/* Kraft wrapper */}
                <div className="absolute bottom-0 z-20 w-40 h-36 flex justify-center">
                  <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    <path d="M 20 10 L 80 150 L 120 150 L 180 10 C 140 35 60 35 20 10 Z" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
                    <circle cx="100" cy="115" r="9" fill="#f59e0b" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Interactive Luxury Letter */}
            <LuxuryLetter onDeliver={handleDeliverFlowers} />
          </div>
        )}

        {/* 4. CINEMATIC REVELATION */}
        {currentStep === 'revelation' && (
          <CinematicRevelation
            items={defaultBouquet}
            onComplete={handleRevelationComplete}
          />
        )}

        {/* 5. CELEBRATION WITH SPECTACULAR FIREWORKS */}
        {currentStep === 'celebration' && (
          <FinalScene
            items={defaultBouquet}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 text-center text-[11px] text-neutral-500/80 border-t border-white/[0.05] pointer-events-auto">
        <p>
          21 de Septiembre · Día de las Flores Amarillas · Diseñado con amor 💛
        </p>
      </footer>
    </div>
  );
};

export default App;
