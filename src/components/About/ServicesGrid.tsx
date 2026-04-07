import usImg from "@/assets/US.png";
import canadaImg from "@/assets/Canada.png";
import ukImg from "@/assets/UK.png";
import europeImg from "@/assets/Europe.png";

const services = [
  { img: usImg,     title: "US",     description: "Your content goes here. Edit or remove this text inline or in the module Content settings. You can also style every aspect of this content in the module Design settings and even apply custom CSS to this text in the module Advanced settings." },
  { img: canadaImg, title: "Canada", description: "Distribute your company capital markets content and comply with Canadian market regulators. SEDOL" },
  { img: ukImg,     title: "UK",     description: "Distribute your capital markets content & Comply with UKLA listing Authority. FCA" },
  { img: europeImg, title: "Europe", description: "Distribute company capital markets content and comply with European Transparency Directive and market regulators." },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="fn-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
          {services.map((s, i) => (
            <div key={i} className="flex flex-col items-start">
              <img src={s.img} alt={s.title} className="w-16 h-16 object-contain rounded-full mb-4" />
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: "20px" }}>{s.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
