import bloombergImg from "@/assets/Bloomberg.png";
import reutersImg from "@/assets/Reutrs.png";
import dowJonesImg from "@/assets/Dow_Jones.png";
import marketWatchImg from "@/assets/Market_Watch.png";
import tmxImg from "@/assets/TMX_Money.png";

const logos = [
  { name: "Bloomberg",   img: bloombergImg },
  { name: "Reuters",     img: reutersImg },
  { name: "Dow Jones",   img: dowJonesImg },
  { name: "MarketWatch", img: marketWatchImg },
  { name: "TMX Money",   img: tmxImg },
];

export default function PremiumNews() {
  return (
    <section className="py-16 bg-[#F6F6F9]">
      <div className="fn-container">
        <div className="text-center mb-8">
          <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Premium News Networks
          </h2>
          <p style={{ color: "#626D84", fontSize: "16px" }}>Distribute & Publish to....</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
              <img
                src={logo.img}
                alt={logo.name}
                className="object-contain"
                style={{ maxHeight: "50px", maxWidth: "150px", width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
