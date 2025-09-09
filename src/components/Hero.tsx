export const Hero = () => {
  return (
    <section className="mb-6 bg-gradient-to-br from-[#FABF03] via-[#FFD700] to-[#FABF03] rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3131]/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="h-32 md:h-40 w-auto flex items-center justify-center bg-white/20 rounded-2xl px-8 shadow-lg">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#FF3131] mb-2">🍔</div>
              <div className="text-xl md:text-2xl font-black text-[#FF3131]">LANCHONETE</div>
              <div className="text-lg md:text-xl font-bold text-[#FF3131]">SANTA CASA</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-800 font-medium text-center">
            Escolha seus lanches favoritos e finalize pelo WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
};