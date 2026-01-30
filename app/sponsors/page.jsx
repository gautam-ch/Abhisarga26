const sponsorCards = [
  {
    name: "Starcourt Mall",
    alt: "Neon retro logo of Starcourt Mall",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuG8O0oHdw7jigryT_YcPxLol3iD0AUEuVa-DProGOk1gKT1t-qMtBwiALz_Ch_P741eYWXG-r89Txy5TkbSCrr32EjQfJngiUr3EdeC4rtH4m0pinjrrNgPbKHU2QR6UL-NIv9f2Z1CAaBWQ4VRKn-qxsb4hsnK4G1HLy_RfdrUFQ3BkTv_GnHD2Fv0nxQFqzwKhnCkrYB8lc-07ydD7O010KTKntWjuhBmI5Oj2BdIqXeT9R9cQDuxasMRPJe53-8RGY2daQ_C-T",
    tiltClass: "rotate-[-2deg]",
  },
  {
    name: "Surfer Boy Pizza",
    alt: "Cartoon pizza van logo for Surfer Boy Pizza",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkZiOO95si8EqeDABUMIEje6M4DwSMXHCA_OPMBtQWvT-HxCK8DBOuG-eXtltG70083-mK5prVCv56qMBucSweu97Skl0n1FfIhJ5bZDW3ocyyO_uJTbqdE-KKO7QsIxArcbAPf-bx_fsPnVK_ZTXRVQKcDWfA_BttcHRMBC2FKUlmPzUMxhDTq3s6SEsCsnKw0lUHlBwWlYpFRBmgpHMO9DcdW1tc7PN5HyNG8O9jOdE7XDRZBfP8c1eg7p_1MqZdidlYTV3voyOa",
    tiltClass: "rotate-[3deg]",
  },
  {
    name: "Palace Arcade",
    alt: "Retro arcade machine pixel art logo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAo9vmh_9EcJGOAWshiGxDjYGXhFAXZPTKH_o83JXzSBqnJipRUATUE9ahrSOm8_Dk-AtVfCF1DKPypSX6_jJiGdWTjwf0dgUT2VA52qWT5P1uxVjuAx5mJ_f31iRWQvIOWa5Go1Wse4uKobWujJWrHoRpDsrKDSuFBgoZL50erRnmcU9l3V-_FtSuM3JqkL1SHYry8gNPjR-h5Wm2B0PuVPMOvkF_qjzjNZWhcvx1YZVAjNeTdY1iz7L_AlMH8dXQNVrJp3HzyVv7s",
    tiltClass: "rotate-[-1deg]",
  },
  {
    name: "Melvald's Store",
    alt: "General store vintage signage",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmSErmNq9ma2-1Yij9t-2tYJ6OIG_o_weLPmqBYN5-6qmRQIQat_YZDNDHvshNNSkJsWHs5RMaHffs4l9Mx7UZL1FKWbVD7obAumwpi5GAo5AMi6Rx76YFzZEGiEFZVgnxBdC30kkzZYeypbHOiDiWbrNpoPVhb-RYi0G9JF_yG5GhiAMorU1Pn6GIXKwmnIou-wNxiDV_GgllXjG70YtQPBCIgiIdgbfQFu48HdAQnxiD_qf0Z-TOKI8okYZ3ohxHUHZ0D7EUz4oG",
    tiltClass: "rotate-[4deg]",
  },
  {
    name: "Scoops Ahoy",
    alt: "Nautical themed ice cream shop logo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS1U3IIdJh5n39g9Lsjh9mlf9DVSyPDWaq7jIwoVKWNhvNVC06gEsr4qrKZJYUwUatozcilOXbxH8-hem7D9CBtnuEnS82coq2YRpOwp79Qq4L8x5aHpZIwDTgeGq3DH84eKLLJJSWMuK7oX1d-Pa9IP_vASvjewCE12KKAfeGKE2owdVNpQtRE4zSqMURevD4KgKbv_eh8KJmguRcydMuaY7p0Za0gRXbuZ6-yqmKj4xakdhm0uSGO4bzqfQvWOGDp-9uI7yBcvBD",
    tiltClass: "rotate-[-3deg]",
  },
  {
    name: "Hellfire Club",
    alt: "Demon head logo for a D&D club",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1xCsFqjZbNfZzhS0811-I5DhASdH7VCPAZCnSwCGy0spbpbDJ3uEiXJ-zkq5uSdsKNNi8DYJUT_QsaMPHcgjxqjztNRZjk0IvQZ4u-RQOqUYEpjwDDKoEWwL-heAWiK7fWrPYuHN-ltVt-aYmFJPCfxOH8pipGN6Id4qssJmAZCE8FSUg2xzvl8UMJM-49iv4lE3egxmsBoE2uWP7iBCPEkpZF3Unhss60ZFW6NgqN3Jnl8Gcv3w7wcMBvOYrpIGym8BsLWErjQtd",
    tiltClass: "rotate-[1deg]",
  },
]

export default function SponsorsPage() {
  return (
    <main className="bg-wood min-h-screen px-4 py-12 text-white selection:bg-primary selection:text-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center mt-20">
          <div className="relative inline-block">
            <h2 className="neon-text-red mb-2 text-4xl font-black uppercase tracking-tighter text-white md:text-6xl lg:text-7xl">
              The Party
            </h2>
            <div className="absolute -right-8 -top-8 rotate-12 opacity-80">
              <span
                className="material-symbols-outlined text-yellow-500"
                style={{ fontSize: 64, textShadow: "0 0 20px rgba(234, 179, 8, 0.5)" }}
              >
                star
              </span>
            </div>
          </div>
          <p className="mt-4 font-terminal text-lg font-medium uppercase tracking-widest text-gray-300">
            Level 1 Adventurers &amp; Local Allies
          </p>
        </header>

        <div className="grid gap-8">
          <div className="relative rounded-xl border-[12px] border-[#2e1a10] bg-cork p-8 shadow-[inset_0_0_60px_rgba(0,0,0,0.8),0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 rotate-1 bg-[#ffeb3b] px-6 py-3 shadow-md">
              <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-red-600 shadow-sm"></div>
              <p className="font-display text-xl font-bold text-black">Supporters of Hawkins</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sponsorCards.map((card) => (
                <div
                  key={card.name}
                  className={`group relative ${card.tiltClass} transform transition-all duration-300 hover:z-20 hover:rotate-0 hover:scale-110`}
                >
                  <div className="pin"></div>
                  <div className="polaroid-shadow bg-white p-3 pb-12 transition-colors">
                    <div className="aspect-square w-full overflow-hidden bg-gray-900 grayscale transition-all duration-500 group-hover:grayscale-0">
                      <div
                        className="h-full w-full bg-cover bg-center"
                        role="img"
                        aria-label={card.alt}
                        style={{ backgroundImage: `url('${card.image}')` }}
                      ></div>
                    </div>
                    <div className="absolute bottom-2 left-0 w-full text-center">
                      <p className="font-display text-lg font-bold text-gray-800">{card.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
