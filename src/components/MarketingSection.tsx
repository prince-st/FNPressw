
import React from 'react';

interface MarketingSectionProps {
  title: string;
  description: string;
  image: string;
  imagePosition: 'left' | 'right';
}

const MarketingSection: React.FC<MarketingSectionProps> = ({ title, description, image, imagePosition }) => {
  const imageOrder = imagePosition === 'left' ? 'order-1' : 'order-2';
  const textOrder = imagePosition === 'left' ? 'order-2' : 'order-1';

  return (
    <section className="py-20" style={{ background: "#F6F6F9" }}>
      <div className="fn-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`flex justify-center ${imageOrder}`}>
            <img src={image} alt={title} className="rounded-lg shadow-lg" />
          </div>
          <div className={textOrder}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
