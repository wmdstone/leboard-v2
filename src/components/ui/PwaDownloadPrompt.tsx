import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X } from 'lucide-react';
import { Button } from './button';

export function PwaDownloadPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandaloneMode, setIsStandaloneMode] = useState(false);

  useEffect(() => {
    // A. Standalone Mode Detection
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
    if (isStandalone) {
      setIsStandaloneMode(true);
      return;
    }

    // C. Initialization Check: Installed flag
    const isInstalled = localStorage.getItem('isPwaInstalled');
    if (isInstalled === 'true') {
      return;
    }

    const checkDismissal = () => {
      const dismissedStr = localStorage.getItem('pwaPrompDismissedAt');
      if (dismissedStr) {
        const dismissedAt = parseInt(dismissedStr, 10);
        const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        if (daysSince < 7) {
          return false;
        }
      }
      return true;
    };

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (checkDismissal()) {
        setShowPrompt(true);
      }
    };

    // B. The appinstalled Event Listener
    const handleAppInstalled = () => {
      setShowPrompt(false);
      localStorage.setItem('isPwaInstalled', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Development/Preview Fallback: show prompt after 3s if not installed and not dismissed
    let timer: any;
    if (checkDismissal()) {
      timer = setTimeout(() => {
        if (!deferredPrompt) {
          setShowPrompt(true);
        }
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (timer) clearTimeout(timer);
    };
  }, [deferredPrompt]);

  if (isStandaloneMode) {
    return null;
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Pemasangan aplikasi ditangani secara otomatis oleh browser. Jika Anda tidak melihat prompt, coba gunakan opsi 'Tambahkan ke Layar Utama' atau 'Instal Aplikasi' di browser Anda.");
      setShowPrompt(false);
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      if (outcome === 'accepted') {
         localStorage.setItem('isPwaInstalled', 'true');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (e) {
      console.error("Prompt failed", e);
    }
  };

  const handleLaterClick = () => {
    localStorage.setItem('pwaPrompDismissedAt', Date.now().toString());
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center"
        >
          <div className="bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 md:p-5 w-full max-w-lg pointer-events-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 text-center sm:text-left relative">
              <h3 className="font-semibold text-foreground text-sm md:text-base">Unduh Aplikasi PPMH untuk akses lebih cepat dan mode offline!</h3>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none text-xs h-9 font-medium" onClick={handleLaterClick}>
                Nanti Saja
              </Button>
              <Button onClick={handleInstallClick} className="flex-1 sm:flex-none text-xs h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-1.5 flex items-center">
                <Download className="w-3.5 h-3.5" /> Unduh Aplikasi
              </Button>
            </div>
            <button 
              onClick={handleLaterClick}
              className="absolute top-2 right-2 p-1 text-muted-foreground hover:bg-secondary rounded-full sm:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
