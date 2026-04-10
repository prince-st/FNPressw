import { useState, useEffect } from "react";
import { MarketingHero, Footer, Header, MarketingSection } from "@/components";
import pressReleasesImg from "@/assets/Press_Releases.png";
import mediaWebsiteImg from "@/assets/Media_Website.png";
import mediaWebsite2Img from "@/assets/Media__Website.png";
import seoContentImg from "@/assets/SEO_Content_Marketing.png";
import img14 from "@/assets/image 14.png";
import img15 from "@/assets/image 15.png";
import img16 from "@/assets/image 16.png";
import img17 from "@/assets/image 17.png";
import img18 from "@/assets/image 18.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/517?acf_format=standard&_=${Date.now()}`;

const sliderImages = [img14, img15, img16, img17, img18];

const FALLBACK_SECTIONS = [
  { title: "Press Releases", description: "Our network partners across the globe enable your press releases to reach the heart of the newsroom and online media within seconds of dispatch.", image: pressReleasesImg, imagePosition: "left" as const },
  { title: "Media Website", description: "Keep your company media materials centralized for journalists, research analysts, and investors to quickly and easily retrieve the information they want.", image: mediaWebsiteImg, imagePosition: "right" as const },
  { title: "SEO & Content Marketing", description: "Syndicate your SEC or other messaging via our online news network and let us help create a customized content marketing program.", image: seoContentImg, imagePosition: "left" as const },
  { title: "Media Website", description: "Utilize our dedicated team of network agencies to help build your brand. These certified Google and Bing accredited professionals can co-manage your online advertising.", image: mediaWebsite2Img, imagePosition: "right" as const },
];

function ImageSlider({ images }: { images: string[] }) {
  return (
    <section className="py-10" style={{ background: "#F6F6F9" }}>
      <div className="fn-container" style={{ overflow: "hidden" }}>
        <div className="animate-marquee" style={{ display: "flex", alignItems: "center", gap: "60px", width: "max-content" }}>
          {[...images, ...images, ...images].map((img, i) => (
            <img key={i} src={img} alt={`media-${i}`}
              style={{ height: "60px", width: "auto", maxWidth: "140px", objectFit: "contain", flexShrink: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Marketing = () => {
  const [sections, setSections] = useState(FALLBACK_SECTIONS);
  const [sliderImgs, setSliderImgs] = useState<string[]>(sliderImages);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (Array.isArray(acf.services) && acf.services.length > 0) {
          const parsed = acf.services.map((s: any, i: number) => ({
            title: s.title || FALLBACK_SECTIONS[i]?.title || "",
            description: s.description || FALLBACK_SECTIONS[i]?.description || "",
            image: typeof s.image === "string" ? s.image : (s.image?.url || FALLBACK_SECTIONS[i]?.image || pressReleasesImg),
            imagePosition: (s.layout === "right" ? "right" : "left") as "left" | "right",
          }));
          setSections(parsed);
        }

        // Slider images repeater: images[].marketing_image_s
        if (Array.isArray(acf.images) && acf.images.length > 0) {
          const imgs = acf.images
            .map((item: any) => typeof item.marketing_image_s === "string" ? item.marketing_image_s : (item.marketing_image_s?.url || ""))
            .filter(Boolean);
          if (imgs.length > 0) setSliderImgs(imgs);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      <Header />
      <MarketingHero pageId={517} />
      {sections.map((s, i) => (
        <MarketingSection key={i} title={s.title} description={s.description} image={s.image} imagePosition={s.imagePosition} />
      ))}
      <ImageSlider images={sliderImgs} />
      <Footer />
    </main>
  );
};

export default Marketing;
