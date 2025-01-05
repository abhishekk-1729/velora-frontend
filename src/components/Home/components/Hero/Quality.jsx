const qualityExamples = [
    { label: "Fast Delivery", hoverColor: "#3FBA50", href: "#delivery" },
    { label: "Precise Design", hoverColor: "#32B4AE", href: "#design" },
    { label: "Great Performance", hoverColor: "#F778BB", href: "#performance" },
    { label: "Custom Code", hoverColor: "#FFD33D", href: "#no_no_code" },
    { label: "Top-Notch Service", hoverColor: "#DD594F", href: "#service" },
  ];
  
  const HeroQualityExamples = () => (
    <div className="text-[#9198A1] text-[22px] font-normal leading-[32px] hero_quality_examples grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {qualityExamples.map((example) => (
        <a
          key={example.label}
          href={example.href}
          className="group inline-block"
        >
          <h2
            className="text-inherit inline relative"
            style={{ textDecorationColor: example.hoverColor }}
          >
            {example.label}
          </h2>
        </a>
      ))}
    </div>
  );
  
  export default HeroQualityExamples;
  
  