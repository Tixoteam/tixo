import React, { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaGithub, FaPhoneAlt, FaEnvelope, FaClock, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = "https://cdn.tioxy.xyz/file/file-1747250255834.webm";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <div className="w-full bg-dark-900/70 backdrop-blur-md p-4 rounded-xl border border-primary/10 mb-8 shadow-lg">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        loop
      />

      <div className="flex items-center space-x-4">
        <button 
          className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-primary transition-colors"
          onClick={togglePlay}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="flex-1">
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary/80 to-secondary/80"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button className="text-primary hover:text-primary/80 transition-colors" onClick={toggleMute}>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <div className="w-24">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-primary"
          />
        </div>

        <div className="text-xs text-dark-100 opacity-70">
          Sound DJ kang..
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });

  return (
    <footer className="bg-dark-800/90 backdrop-blur-sm py-12 px-6 md:px-12 border-t border-dark-700" id="contact">
      <div className="container mx-auto">
        <AudioPlayer />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-800/40 backdrop-blur-md rounded-xl p-6 border border-primary/10 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-primary text-2xl"><FaWhatsapp /></span>
              <span className="font-inter font-bold text-xl">Tixo Bot</span>
            </div>
            <p className="text-dark-100 mb-6">
            Selamat datang di Tixo Bot WhatsApp!
Asisten cerdas yang siap membantu Anda 24/7 — dari info produk, layanan pelanggan, hingga otomatisasi chat. Mulai obrolan sekarang dan rasakan kemudahanndiv.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/tulisan.ku.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-100 hover:text-primary transition-colors cursor-pointer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/6282285357346"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-100 hover:text-primary transition-colors cursor-pointer"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://github.com/X-Tio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-100 hover:text-primary transition-colors cursor-pointer"
              >
                <FaGithub />
              </a>
              </div>
          </div>

          <div className="bg-dark-800/40 backdrop-blur-md rounded-xl p-6 border border-primary/10 shadow-lg">
            <h3 className="font-inter font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhoneAlt className="text-primary mr-3" />
                <span className="text-dark-100">+62 822-8535-7346</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <span className="text-dark-100">satriopambudi866@gmail.com</span>
              </li>
              <li className="flex items-center">
                <FaClock className="text-primary mr-3" />
                <span className="text-dark-100">Time: {formattedTime}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8 text-center">
          <p className="text-dark-100 text-sm">
            © {currentYear} Tixo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;