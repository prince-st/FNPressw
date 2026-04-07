import heroImage from "@/assets/hero-image.png";
import shape1 from "@/assets/Shape_1.png";

export default function Hero() {
  return (
    // <section className="relative bg-white pt-20 pb-0 overflow-hidden">
   <section className="relative bg-[#F6F6F9] pt-20 pb-0 overflow-hidden"> 
      <div className="fn-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-left max-w-xl pb-16 lg:pb-24">
            <h1 className="font-extrabold text-[#1a1a1a] leading-[1.1] mb-3"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Communication made <br />
              <span className="text-[#3366FF]">easier.</span>
            </h1>
            <h2 className="font-bold text-[#1a1a1a] mb-5"
              style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>
              Customer happiness made better.
            </h2>
            <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              Transform how brands distribute news, pitch the media, and manage
              public relations with our industry-leading communication platforms.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                className="flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-md transition-all"
                style={{ background: "#3366FF", color: "#fff", border: "none" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.color = "#3366FF";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#3366FF";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
              >
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="flex items-center gap-2 font-semibold text-sm rounded-md px-4 py-3 transition-all"
                style={{ background: "transparent", color: "#1a1a1a", border: "none" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.color = "#3366FF";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a";
                }}
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="#3366FF">
                    <path d="M9 6L1 11V1L9 6Z" />
                  </svg>
                </div>
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                Trusted by 10,000+ brands
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                99.9% uptime guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                Enterprise-grade security
              </span>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Person using laptop"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Wave transition into blue Platforms section */}
      {/* <div className="w-full leading-[0] mt-4">
        <img src={shape1} alt="" className="w-full block" />
      </div> */}

      <div className="w-full leading-none mt-4 bg-[#0030F0]">
  <img src={shape1} alt="" className="w-full block" />
</div>
    </section>
  );
}
