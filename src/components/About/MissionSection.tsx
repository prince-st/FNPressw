import { useState, useEffect } from "react";
import ourMissionImg from "@/assets/Our_Mission.png";
import aboveBeyondImg from "@/assets/Above_Beyond.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/328?acf_format=standard&_=${Date.now()}`;

export default function MissionSection() {
  const [missionIcon, setMissionIcon] = useState(ourMissionImg);
  const [missionTitle, setMissionTitle] = useState("Our Mission");
  const [missionDesc, setMissionDesc] = useState("Our mission is simple yet impactful: to connect your message with the world through comprehensive, reliable, and timely press release services.");

  const [aboveIcon, setAboveIcon] = useState(aboveBeyondImg);
  const [aboveTitle, setAboveTitle] = useState("Above & Beyond");
  const [aboveDesc, setAboveDesc] = useState("At FN Presswire, we go beyond mere distribution; we are committed to being a trusted partner in your growth journey. With a blend of cutting-edge technology, industry expertise, and exceptional customer support, we make sure your voice is heard loud and clear in the global arena.");

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.mission_icon) setMissionIcon(typeof acf.mission_icon === "string" ? acf.mission_icon : (acf.mission_icon?.url || ourMissionImg));
        if (acf.mission_title) setMissionTitle(acf.mission_title);
        if (acf.mission_description) setMissionDesc(acf.mission_description);
        if (acf.above_icon) setAboveIcon(typeof acf.above_icon === "string" ? acf.above_icon : (acf.above_icon?.url || aboveBeyondImg));
        if (acf.above_title) setAboveTitle(acf.above_title);
        if (acf.above_description) setAboveDesc(acf.above_description);
      })
      .catch(err => console.error("MissionSection fetch error:", err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="fn-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Our Mission */}
          <div className="flex flex-col items-start">
            <div className="mb-5">
              <img src={missionIcon} alt={missionTitle} className="w-14 h-14 object-contain" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3" style={{ fontSize: "20px" }}>{missionTitle}</h3>
            <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{missionDesc}</p>
          </div>

          {/* Above & Beyond */}
          <div className="flex flex-col items-start">
            <div className="mb-5">
              <img src={aboveIcon} alt={aboveTitle} className="w-14 h-14 object-contain" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3" style={{ fontSize: "20px" }}>{aboveTitle}</h3>
            <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{aboveDesc}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
