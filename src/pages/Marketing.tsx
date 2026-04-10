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

const sliderImages = [img14, img15, img16, img17, img18];

function ImageSlider() {
  return (
    <section className="py-10" style={{ background: "#F6F6F9" }}>
      <div className="fn-container" style={{ overflow: "hidden" }}>
        <div
          className="animate-marquee"
          style={{ display: "flex", alignItems: "center", gap: "60px", width: "max-content" }}
        >
          {[...sliderImages, ...sliderImages, ...sliderImages].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`media-${i}`}
              style={{ height: "60px", width: "auto", maxWidth: "140px", objectFit: "contain", flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Marketing = () => {
  return (
    <main>
      <Header />
      {/* <AboutHero
        title="Global Media & Marketing Solutions"
        subtitle="From instant worldwide press release distribution to centralized media hubs, digital advertising, and SEO-driven content marketing — our integrated solutions ensure your brand reaches the right audience, at the right time, across the globe."
        showButton={true}
        buttonText="Contact Us Now"
      /> */}

<MarketingHero pageId={517} />
   

      <MarketingSection
        title="Press Releases"
        description="Our network partners across the globe enable your press releases to reach the heart of the newsroom and online media within seconds of dispatch."
        image={pressReleasesImg}
        imagePosition="left"
      />
      <MarketingSection
        title="Media Website"
        description="Keep your company media materials centralized for journalists, research analysts, and investors to quickly and easily retrieve the information they want."
        image={mediaWebsiteImg}
        imagePosition="right"
      />
      <MarketingSection
        title="SEO & Content Marketing"
        description="Syndicate your SEC or other messaging via our online news network and let us help create a customized content marketing program. Publish your news content globally online and optimize your company SEO strategy."
        image={seoContentImg}
        imagePosition="left"
      />
      <MarketingSection
        title="Media Website"
        description="Utilize our dedicated team of network agencies to help build your brand. These certified Google and Bing accredited professionals can co-manage your online advertising, so you can focus on what you do best."
        image={mediaWebsite2Img}
        imagePosition="right"
      />
      
      {/* Image slider */}
      <ImageSlider />

      <Footer />
    </main>
  );
};

export default Marketing;
