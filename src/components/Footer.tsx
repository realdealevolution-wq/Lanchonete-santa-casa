export const Footer = () => {
  return (
    <footer className="mt-12 p-6 bg-gradient-to-r from-[#FABF03] to-[#FFD700] rounded-2xl text-center shadow-xl">
   
      <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
        <div className="text-[#FF3131] font-black text-lg mb-2">
          🍔 LANCHONETE SANTA CASA
        </div>
        <div className="text-[#FF3131] font-bold text-sm space-y-1">
          <p>⏰ Horário: SEGUNDA, TREÇA, QUINTA E SEXTA DAS 06:00 ÁS 22:00 QUARTA E SÁBADO DAS 06:00 ÁS 18:00</p>
          <p>
            📱 Siga: <a 
              href="https://www.instagram.com/lanchonetesantacasa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#FF3131] hover:text-[#FF3131]/80 transition-colors underline font-black"
            >
              @lanchonetesantacasa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};