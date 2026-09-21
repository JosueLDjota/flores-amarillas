import React, { useState } from 'react';
import type { FlowerData, BouquetItem, DedicationMessage, SceneStep } from './types';
import { FLOWERS } from './data/flowers';
import { PRESET_MESSAGES } from './data/messages';
import { CanvasBackground } from './components/effects/CanvasBackground';
import { FireworksCanvas } from './components/effects/FireworksCanvas';
import { CustomCursor } from './components/effects/CustomCursor';
import { FilmGrain } from './components/effects/FilmGrain';
import { IntroScene } from './components/intro/IntroScene';
import { FlowerGarden } from './components/garden/FlowerGarden';
import { FlowerCard } from './components/cards/FlowerCard';
import { BouquetBuilder } from './components/bouquet/BouquetBuilder';
import { MessageEditor } from './components/message/MessageEditor';
import { CinematicRevelation } from './components/revelation/CinematicRevelation';
import { FinalScene } from './components/celebration/FinalScene';
import { MusicControl } from './components/ui/MusicControl';
import { RomanticModeToggle } from './components/ui/RomanticModeToggle';
import { soundEngine } from './audio/soundEngine';
import { Sparkles, Flower2, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SceneStep>('intro');
  const [isRomantic, setIsRomantic] = useState<boolean>(false);
  const [bouquet, setBouquet] = useState<BouquetItem[]>([]);
  const [activeTab, setActiveTab] = useState<'garden' | 'builder' | 'message'>('garden');

  const [dedication, setDedication] = useState<DedicationMessage>({
    message: 'Estas flores son para recordarte lo especial que eres.',
    date: '21 de Septiembre',
  });

  // Calculate counts per flower type
  const flowerCounts: Record<string, number> = {};
  bouquet.forEach((item) => {
    flowerCounts[item.flowerId] = (flowerCounts[item.flowerId] || 0) + 1;
  });

  // Start with default bouquet items when building for the first time
  const initializeDefaultBouquet = () => {
    const defaults: BouquetItem[] = [
      { uid: 'b-init-1', flowerId: 'girasol', rotation: -12, scale: 0.95, offsetX: -45, offsetY: -15, zIndex: 3, swayDelay: 0.1 },
      { uid: 'b-init-2', flowerId: 'rosa', rotation: 10, scale: 0.9, offsetX: 40, offsetY: -10, zIndex: 4, swayDelay: 0.5 },
      { uid: 'b-init-3', flowerId: 'margarita', rotation: 0, scale: 1.05, offsetX: 0, offsetY: -35, zIndex: 5, swayDelay: 0.3 },
      { uid: 'b-init-4', flowerId: 'silvestres', rotation: -22, scale: 0.85, offsetX: -70, offsetY: 15, zIndex: 2, swayDelay: 0.7 },
      { uid: 'b-init-5', flowerId: 'campo', rotation: 20, scale: 0.9, offsetX: 65, offsetY: 10, zIndex: 2, swayDelay: 0.9 },
    ];
    setBouquet(defaults);
  };

  const handleAddFlower = (flower: FlowerData) => {
    const count = bouquet.length;
    // Spread flowers naturally like an organic florist arrangement
    const angleRange = 40;
    const angle = (Math.random() - 0.5) * angleRange;
    const offsetX = (Math.random() - 0.5) * 140;
    const offsetY = -Math.random() * 50 - 5;
    const scale = 0.85 + Math.random() * 0.25;

    const newItem: BouquetItem = {
      uid: `flower-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      flowerId: flower.id,
      rotation: angle,
      scale,
      offsetX,
      offsetY,
      zIndex: count + 2,
      swayDelay: Math.random() * 1.5,
    };

    setBouquet((prev) => [...prev, newItem]);
  };

  const handleRemoveLast = () => {
    setBouquet((prev) => prev.slice(0, -1));
  };

  const handleResetBouquet = () => {
    setBouquet([]);
  };

  const handleSurpriseMe = () => {
    soundEngine.playSparkle();
    const count = Math.floor(Math.random() * 3) + 5; // 5 to 7 flowers
    const newItems: BouquetItem[] = [];

    for (let i = 0; i < count; i++) {
      const f = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
      const angle = (i - count / 2) * 12 + (Math.random() * 8 - 4);
      const offsetX = (i - count / 2) * 26 + (Math.random() * 16 - 8);
      const offsetY = -(Math.sin((i / (count - 1)) * Math.PI) * 45) + (Math.random() * 12 - 6);

      newItems.push({
        uid: `surprise-${i}-${Date.now()}`,
        flowerId: f.id,
        rotation: angle,
        scale: 0.88 + Math.random() * 0.2,
        offsetX,
        offsetY,
        zIndex: i + 2,
        swayDelay: Math.random() * 1.2,
      });
    }

    setBouquet(newItems);

    // Also surprise with a romantic quote
    const randomMsg = PRESET_MESSAGES[Math.floor(Math.random() * PRESET_MESSAGES.length)];
    setDedication((prev) => ({ ...prev, message: randomMsg }));
  };

  // Transition from Intro to Garden with cinematic delay
  const handleStartIntro = () => {
    setCurrentStep('transition');
    if (bouquet.length === 0) {
      initializeDefaultBouquet();
    }
    setTimeout(() => {
      setCurrentStep('garden');
    }, 1800);
  };

  // Switch to Revelation
  const handleDeliverFlowers = () => {
    setCurrentStep('revelation');
  };

  // Switch from Revelation to Final Celebration
  const handleRevelationComplete = () => {
    setCurrentStep('celebration');
  };

  // Create another bouquet without resetting entire app
  const handleCreateAnother = () => {
    setBouquet([]);
    setCurrentStep('garden');
    setActiveTab('garden');
  };

  // Complete restart
  const handleRestart = () => {
    setBouquet([]);
    setCurrentStep('intro');
    setActiveTab('garden');
  };

  // Background intensity based on step
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
        {/* Brand / Title Logo */}
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

        {/* Global Controls: Music & Romantic Mode */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <RomanticModeToggle isRomantic={isRomantic} onToggle={setIsRomantic} />
          <MusicControl />
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="relative z-20 flex-1 flex flex-col pt-16 pb-12 w-full">
        {/* 1. INTRO STEP */}
        {currentStep === 'intro' && <IntroScene onStart={handleStartIntro} />}

        {/* 2. CINEMATIC TRANSITION (Sunrise glow illumination) */}
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

        {/* 3. MAIN INTERACTIVE EXPERIENCE (Garden / Builder / Message) */}
        {(currentStep === 'garden' || currentStep === 'selection' || currentStep === 'builder' || currentStep === 'message') && (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col">
            {/* Story Navigation Tabs */}
            <div className="w-full flex justify-center mb-6">
              <div className="inline-flex p-1 rounded-2xl bg-black/50 border border-amber-400/20 backdrop-blur-md shadow-xl">
                <button
                  onClick={() => {
                    soundEngine.playChime(1.0);
                    setActiveTab('garden');
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-serif tracking-wide transition-all flex items-center gap-2 ${
                    activeTab === 'garden'
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>1. El Jardín y Flores</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playChime(1.1);
                    setActiveTab('builder');
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-serif tracking-wide transition-all flex items-center gap-2 ${
                    activeTab === 'builder'
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>2. Tu Ramo ({bouquet.length})</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playChime(1.2);
                    setActiveTab('message');
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-serif tracking-wide transition-all flex items-center gap-2 ${
                    activeTab === 'message'
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>3. Dedicatoria</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Garden + Flower Selection */}
            {activeTab === 'garden' && (
              <div className="space-y-12 animate-fade-in">
                {/* Botanical Garden Preview with parallax & wind */}
                <div className="relative rounded-3xl overflow-hidden glass-panel border border-amber-400/20 shadow-2xl p-2 sm:p-4">
                  <div className="absolute top-4 left-6 z-20 pointer-events-none">
                    <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold block mb-0.5">
                      Jardín Interactivo
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-white font-normal">
                      Mueve el cursor para sentir la brisa 🌾
                    </h2>
                  </div>

                  <FlowerGarden onFlowerClick={(type) => {
                    const flowerObj = FLOWERS.find((f) => f.id === type) || FLOWERS[0];
                    handleAddFlower(flowerObj);
                  }} />

                  <div className="absolute bottom-4 right-6 z-20 pointer-events-none text-right">
                    <p className="text-[11px] text-amber-200/70 font-sans">
                      Haz clic en cualquier flor para sumarla a tu ramo
                    </p>
                  </div>
                </div>

                {/* Flower Catalog Section: "Elige tus flores 🌻" */}
                <section>
                  <div className="text-center max-w-xl mx-auto mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-serif mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Catálogo Botánico</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-2">
                      Elige tus flores 🌻
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Selecciona una o varias flores para armar un ramo lleno de significado y calidez.
                    </p>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FLOWERS.map((flower) => (
                      <FlowerCard
                        key={flower.id}
                        flower={flower}
                        count={flowerCounts[flower.id] || 0}
                        onAdd={handleAddFlower}
                        onRemove={handleRemoveLast}
                      />
                    ))}
                  </div>

                  {/* Bottom Proceed Bar to Builder */}
                  <div className="mt-10 flex items-center justify-center">
                    <button
                      onClick={() => {
                        soundEngine.playBloom();
                        setActiveTab('builder');
                      }}
                      className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-serif font-bold text-sm tracking-wide flex items-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Ver tu ramo armado ({bouquet.length} flores) ✨</span>
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: Bouquet Builder */}
            {activeTab === 'builder' && (
              <div className="animate-fade-in space-y-6">
                <div className="text-center max-w-lg mx-auto mb-2">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1 block">
                    Composición Floral
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                    Construye tu ramo 💐
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Mira cómo florece tu creación en tiempo real con envoltorio de gala y lazo de seda.
                  </p>
                </div>

                <BouquetBuilder
                  items={bouquet}
                  onAddFlower={handleAddFlower}
                  onRemoveLast={handleRemoveLast}
                  onReset={handleResetBouquet}
                  onSurprise={handleSurpriseMe}
                  onProceedToMessage={() => setActiveTab('message')}
                />
              </div>
            )}

            {/* TAB 3: Message & Dedication Editor */}
            {activeTab === 'message' && (
              <div className="animate-fade-in">
                <MessageEditor
                  dedication={dedication}
                  onChange={setDedication}
                  onSubmit={handleDeliverFlowers}
                />
              </div>
            )}
          </div>
        )}

        {/* 4. CINEMATIC REVELATION SEQUENCE */}
        {currentStep === 'revelation' && (
          <CinematicRevelation
            items={bouquet}
            dedication={dedication}
            onComplete={handleRevelationComplete}
          />
        )}

        {/* 5. FINAL CELEBRATION & FIREWORKS */}
        {currentStep === 'celebration' && (
          <FinalScene
            dedication={dedication}
            items={bouquet}
            onCreateAnother={handleCreateAnother}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Discreet Footer */}
      <footer className="relative z-20 py-4 text-center text-[11px] text-neutral-500/80 border-t border-white/[0.05] pointer-events-auto">
        <p>
          21 de Septiembre · Día de las Flores Amarillas · Diseñado con amor y cinematografía 💛
        </p>
      </footer>
    </div>
  );
};

export default App;
