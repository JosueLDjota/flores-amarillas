import React, { useState } from 'react';
import type { DedicationMessage } from '../../types';
import { PRESET_MESSAGES } from '../../data/messages';
import { soundEngine } from '../../audio/soundEngine';
import { Send, Edit3, Check } from 'lucide-react';

interface MessageEditorProps {
  dedication: DedicationMessage;
  onChange: (dedication: DedicationMessage) => void;
  onSubmit: () => void;
}

export const MessageEditor: React.FC<MessageEditorProps> = ({
  dedication,
  onChange,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEnvelope = () => {
    soundEngine.playSparkle();
    setIsOpen(true);
  };

  const handleSelectPreset = (msg: string) => {
    soundEngine.playChime(1.1);
    onChange({ ...dedication, message: msg });
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6 px-4">
      {/* Interactive Envelope / Letter Container */}
      <div className="relative flex flex-col items-center">
        {/* If envelope is closed */}
        {!isOpen ? (
          <div
            onClick={handleOpenEnvelope}
            className="cursor-pointer group relative w-full max-w-md h-72 rounded-3xl bg-gradient-to-br from-[#1e1a15] via-[#15120e] to-[#0c0a08] border border-amber-500/30 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:border-amber-400/60"
          >
            {/* Envelope flap lines */}
            <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-amber-500/20 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-amber-500/[0.04]" />

            {/* Glowing Wax Seal */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 border-2 border-amber-200/60 shadow-[0_0_25px_rgba(217,119,6,0.6)] flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-3xl">🌻</span>
            </div>

            <p className="font-serif text-lg text-amber-200 mt-6 font-medium tracking-wide">
              Tienes una carta sin abrir
            </p>
            <p className="text-xs text-neutral-400 mt-1">Haz clic para romper el sello y leer ✨</p>
          </div>
        ) : (
          /* Opened Professional Luxury Letter */
          <div className="w-full relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#1a1612] via-[#13100d] to-[#0b0907] border border-amber-500/40 shadow-[0_30px_70px_rgba(0,0,0,0.9)] animate-fade-in">
            {/* Luxury Double Filigree Border */}
            <div className="absolute inset-3 border border-amber-500/25 rounded-2xl pointer-events-none" />
            <div className="absolute inset-4 sm:inset-5 border border-amber-500/10 rounded-xl pointer-events-none" />

            {/* Corner Star Filigrees */}
            <div className="absolute top-6 left-6 text-amber-400/40 text-xs">✦</div>
            <div className="absolute top-6 right-6 text-amber-400/40 text-xs">✦</div>
            <div className="absolute bottom-6 left-6 text-amber-400/40 text-xs">✦</div>
            <div className="absolute bottom-6 right-6 text-amber-400/40 text-xs">✦</div>

            {/* Top Wax Seal Emblem */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-200/50">
                <span className="text-2xl">🌻</span>
              </div>
            </div>

            {/* Letter Header */}
            <div className="text-center mb-6">
              <p className="font-serif italic text-xs tracking-[0.25em] text-amber-300/80 uppercase">
                21 de Septiembre · Día de las Flores Amarillas
              </p>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-2" />
            </div>

            {/* Letter Message Body */}
            <div className="my-6 min-h-[120px] px-2 sm:px-6">
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    rows={4}
                    value={dedication.message}
                    onChange={(e) => onChange({ ...dedication, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-black/60 border border-amber-400/40 text-amber-100 font-serif text-lg leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-amber-400 shadow-inner"
                    placeholder="Escribe el mensaje de la carta..."
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-semibold text-xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Listo</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center relative group">
                  <p className="font-serif text-xl sm:text-2xl text-neutral-100 leading-relaxed italic font-light">
                    "{dedication.message || 'Estas flores son para recordarte lo especial que eres.'}"
                  </p>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-amber-400/20 text-neutral-400 hover:text-amber-200 text-xs transition-all border border-white/10"
                    title="Editar texto"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Personalizar texto</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Inspiration Options */}
            <div className="pt-6 border-t border-amber-500/15">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/70 font-semibold block text-center mb-3">
                Otras dedicatorias que puedes elegir:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_MESSAGES.slice(0, 4).map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPreset(msg)}
                    className={`p-2.5 rounded-xl border text-xs text-left leading-relaxed transition-all ${
                      dedication.message === msg
                        ? 'bg-amber-400/20 border-amber-400/60 text-amber-200'
                        : 'bg-black/30 border-white/5 hover:border-amber-400/30 text-neutral-300 hover:text-white'
                    }`}
                  >
                    "{msg}"
                  </button>
                ))}
              </div>
            </div>

            {/* Action Deliver Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playBloom();
                  onSubmit();
                }}
                className="w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-serif font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Entregar flores ✨</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
