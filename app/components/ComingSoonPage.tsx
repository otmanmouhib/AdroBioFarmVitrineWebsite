import Link from 'next/link';

type FeatureItem = {
  title: string;
  description: string;
};

type ComingSoonPageProps = {
  pageLabel: string;
  title: string;
  intro: string;
  badges: string[];
  panelLabel: string;
  panelHeading: string;
  panelText: string;
  panelItems: string[];
  features: FeatureItem[];
  footerLabel: string;
  footerHeading: string;
  footerText: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

export default function ComingSoonPage({
  pageLabel,
  title,
  intro,
  badges,
  panelLabel,
  panelHeading,
  panelText,
  panelItems,
  features,
  footerLabel,
  footerHeading,
  footerText,
  primaryCta,
  secondaryCta,
}: ComingSoonPageProps) {
  return (
    <main>
      <section className="section hero heroComingSoon">
        <div className="container heroContent">
          <div className="heroIntro">
            <p className="eyebrow">{pageLabel}</p>
            <h1>{title}</h1>
            <p className="intro">{intro}</p>
            <div className="heroBadges">
              {badges.map((badge) => (
                <span key={badge} className="heroBadge">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <aside className="heroPanel">
            <p className="eyebrow">{panelLabel}</p>
            <h2>{panelHeading}</h2>
            <p className="heroPanelText">{panelText}</p>
            <ul className="heroPanelList">
              {panelItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {features.length > 0 && (
        <section className="section featureHighlights">
          <div className="container">
            <div className="sectionIntro">
              <h2>Ce qui arrive bientôt</h2>
              <p className="sectionLead">Nous concevons une page claire, utile et alignée sur l’identité d’ADRO BIO FARM.</p>
            </div>
            <div className="featureCardGrid">
              {features.map((feature) => (
                <article key={feature.title} className="featureCard">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section highlight referenceFooterCard">
        <div className="container referenceFooterContent">
          <div>
            <p className="eyebrow">{footerLabel}</p>
            <h2>{footerHeading}</h2>
            <p className="sectionLead">{footerText}</p>
          </div>

          <div className="referenceFooterActions">
            <Link href={primaryCta.href} className="button">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="button secondary">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
