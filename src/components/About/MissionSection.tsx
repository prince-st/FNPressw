import ourMissionImg from "@/assets/Our_Mission.png";
import aboveBeyondImg from "@/assets/Above_Beyond.png";

export default function MissionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="fn-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Our Mission */}
          <div className="flex flex-col items-start">
            <div className="mb-5">
              <img src={ourMissionImg} alt="Our Mission" className="w-14 h-14 object-contain" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3" style={{ fontSize: "20px" }}>Our Mission</h3>
            <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>
              Our mission is simple yet impactful: to connect your message with the world through comprehensive, reliable, and timely press release services.
            </p>
          </div>

          {/* Above & Beyond */}
          <div className="flex flex-col items-start">
            <div className="mb-5">
              <img src={aboveBeyondImg} alt="Above & Beyond" className="w-14 h-14 object-contain" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3" style={{ fontSize: "20px" }}>Above & Beyond</h3>
            <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>
              At FN Presswire, we go beyond mere distribution; we are committed to being a trusted partner in your growth journey. With a blend of cutting-edge technology, industry expertise, and exceptional customer support, we make sure your voice is heard loud and clear in the global arena.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
