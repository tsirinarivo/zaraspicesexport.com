export type Language = 'fr' | 'en';

export interface ProductSpec {
  label: { fr: string; en: string };
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: { fr: string; en: string };
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  price: string;
  priceNote?: { fr: string; en: string };
  category: 'vanilla' | 'spices' | 'derivatives';
  featured: boolean;
  specs: ProductSpec[];
  gradient: string;
  accentColor: string;
  emoji: string;
}

export interface Value {
  id: string;
  icon: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
}

export interface Service {
  id: string;
  icon: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'vanille-tk',
    name: { fr: 'Vanille TK', en: 'TK Vanilla Beans' },
    tagline: { fr: 'Transformation & industrie', en: 'Processing & industrial use' },
    description: {
      fr: 'Vanille destinée à la transformation et aux usages industriels. Un arôme puissant pour des applications en extraction, transformation et agroalimentaire.',
      en: 'Vanilla beans intended for processing and industrial use. A powerful aroma for extraction, processing and food industry applications.',
    },
    price: '86€/kg',
    priceNote: { fr: 'à partir de', en: 'from' },
    category: 'vanilla',
    featured: true,
    gradient: 'from-amber-950 via-amber-900 to-stone-900',
    accentColor: '#C8A96E',
    emoji: '🌿',
    specs: [
      { label: { fr: 'Longueur', en: 'Length' }, value: '16–20 cm' },
      { label: { fr: "Taux d'humidité", en: 'Moisture content' }, value: '20–30%' },
      { label: { fr: 'Taux de vanilline', en: 'Vanillin content' }, value: '>1.8' },
      { label: { fr: 'Arôme', en: 'Aroma' }, value: 'Puissant / Strong' },
      { label: { fr: 'Origine', en: 'Origin' }, value: 'Madagascar' },
      { label: { fr: 'Conditionnement', en: 'Packaging' }, value: 'Sous vide / Vacuum packed' },
    ],
  },
  {
    id: '2',
    slug: 'vanille-gourmet',
    name: { fr: 'Vanille Gourmet', en: 'Gourmet Vanilla Beans' },
    tagline: { fr: 'Marchés haut de gamme', en: 'High-end markets' },
    description: {
      fr: 'Gousses charnues, souples et brillantes, destinées aux marchés haut de gamme. Un arôme intense, rond et naturellement sucré.',
      en: 'Plump, flexible, and glossy beans intended for high-end markets. An intense, well-rounded, naturally sweet aroma.',
    },
    price: '96€/kg',
    priceNote: { fr: 'à partir de', en: 'from' },
    category: 'vanilla',
    featured: true,
    gradient: 'from-yellow-950 via-amber-900 to-amber-950',
    accentColor: '#E8C97A',
    emoji: '✨',
    specs: [
      { label: { fr: 'Longueur', en: 'Length' }, value: '16–20 cm' },
      { label: { fr: "Taux d'humidité", en: 'Moisture content' }, value: '30–35%' },
      { label: { fr: 'Taux de vanilline', en: 'Vanillin content' }, value: '>1.8' },
      { label: { fr: 'Arôme', en: 'Aroma' }, value: 'Intense, rond, sucré / Intense, well-rounded, sweet' },
      { label: { fr: 'Aspect', en: 'Appearance' }, value: 'Noir à brun foncé / Dark brown to black' },
      { label: { fr: 'Conditionnement', en: 'Packaging' }, value: 'Sous vide / Vacuum packed' },
    ],
  },
  {
    id: '3',
    slug: 'vanille-pompona',
    name: { fr: 'Vanille Pompona', en: 'Pompona Vanilla' },
    tagline: { fr: 'Variété rare du Mexique', en: 'Rare variety from Mexico' },
    description: {
      fr: 'Variété rare au profil aromatique distinctif. Gousses épaisses et larges aux notes florales et douces, pour les marchés de niche.',
      en: 'A rare variety with a distinctive aromatic profile. Thick and wide beans with floral, mild notes for specialty markets.',
    },
    price: '96€/kg',
    priceNote: { fr: 'à partir de', en: 'from' },
    category: 'vanilla',
    featured: true,
    gradient: 'from-rose-950 via-amber-950 to-stone-900',
    accentColor: '#D4A5A5',
    emoji: '🌸',
    specs: [
      { label: { fr: 'Longueur', en: 'Length' }, value: '18–27 cm' },
      { label: { fr: "Taux d'humidité", en: 'Moisture content' }, value: '30–35%' },
      { label: { fr: 'Taux de vanilline', en: 'Vanillin content' }, value: '>1.8' },
      { label: { fr: 'Arôme', en: 'Aroma' }, value: 'Floral, doux / Floral, mild' },
      { label: { fr: 'Positionnement', en: 'Positioning' }, value: 'Niche / Specialty markets' },
      { label: { fr: 'Conditionnement', en: 'Packaging' }, value: 'Sous vide / Vacuum packed' },
    ],
  },
  {
    id: '4',
    slug: 'caviar-vanille',
    name: { fr: 'Caviar de Vanille', en: 'Vanilla Caviar' },
    tagline: { fr: 'L\'essence pure', en: 'Pure essence' },
    description: {
      fr: 'Graines extraites de gousses mûres, concentrant l\'essence aromatique de la vanille. Pour la gastronomie et les desserts premium.',
      en: 'Seeds extracted from ripe pods, concentrating the aromatic essence of vanilla. For gastronomy and premium desserts.',
    },
    price: '240€/kg',
    category: 'derivatives',
    featured: true,
    gradient: 'from-stone-950 via-zinc-900 to-stone-950',
    accentColor: '#F5F0E8',
    emoji: '⚫',
    specs: [
      { label: { fr: 'Composition', en: 'Composition' }, value: 'Graines naturelles / Natural seeds' },
      { label: { fr: 'Texture', en: 'Texture' }, value: 'Fine, légèrement humide / Fine, slightly moist' },
      { label: { fr: "Taux d'humidité", en: 'Moisture content' }, value: '30–35%' },
      { label: { fr: 'Taux de vanilline', en: 'Vanillin content' }, value: '>1.9' },
      { label: { fr: 'Couleur', en: 'Color' }, value: 'Noir intense / Deep black' },
      { label: { fr: 'Arôme', en: 'Aroma' }, value: 'Très puissant, pur / Very strong and pure' },
    ],
  },
  {
    id: '5',
    slug: 'poudre-vanille',
    name: { fr: 'Poudre de Vanille', en: 'Natural Vanilla Powder' },
    tagline: { fr: 'Naturelle & pure', en: 'Natural & pure' },
    description: {
      fr: 'Poudre de vanille naturelle obtenue à partir de gousses séchées et finement broyées, sans aucun additif. 100% pure.',
      en: 'Natural vanilla powder obtained from dried and finely ground pods, with no additives. 100% pure.',
    },
    price: '75€/kg',
    priceNote: { fr: 'à partir de', en: 'from' },
    category: 'derivatives',
    featured: false,
    gradient: 'from-amber-950 via-stone-900 to-amber-950',
    accentColor: '#D4B896',
    emoji: '🟤',
    specs: [
      { label: { fr: 'Composition', en: 'Composition' }, value: '100% vanille pure / 100% pure vanilla' },
      { label: { fr: 'Granulométrie', en: 'Particle size' }, value: 'Fine' },
      { label: { fr: "Taux d'humidité", en: 'Moisture content' }, value: '≤ 8%' },
      { label: { fr: 'Taux de vanilline', en: 'Vanillin content' }, value: '>1.8' },
      { label: { fr: 'Couleur', en: 'Color' }, value: 'Brun foncé naturel / Natural dark brown' },
      { label: { fr: 'Conditionnement', en: 'Packaging' }, value: 'Sous vide / Vacuum packed' },
    ],
  },
];

export const values: Value[] = [
  {
    id: 'quality',
    icon: '◈',
    title: { fr: 'Engagement Qualité', en: 'Quality Commitment' },
    description: {
      fr: 'Préparés selon les traditions locales, nos produits allient authenticité et qualité, conformes aux exigences des marchés locaux et internationaux.',
      en: 'Crafted following local traditions, our products combine authenticity and quality in accordance with local and international market requirements.',
    },
  },
  {
    id: 'ethics',
    icon: '◉',
    title: { fr: 'Engagement Humain & Éthique', en: 'Human & Ethical Commitment' },
    description: {
      fr: 'Nous travaillons en étroite collaboration avec les acteurs locaux afin de valoriser le savoir-faire et soutenir une filière durable.',
      en: 'We work closely with local stakeholders to promote know-how and support a sustainable supply chain.',
    },
  },
  {
    id: 'authenticity',
    icon: '◎',
    title: { fr: 'Authenticité', en: 'Authenticity' },
    description: {
      fr: 'Nous respectons l\'origine, la nature et l\'identité de chaque produit.',
      en: 'We respect the origin, nature, and identity of each product.',
    },
  },
  {
    id: 'excellence',
    icon: '◇',
    title: { fr: 'Exigence', en: 'Excellence' },
    description: {
      fr: 'Nous plaçons la qualité et la rigueur au cœur de chacune de nos actions.',
      en: 'We place quality and rigor at the heart of everything we do.',
    },
  },
  {
    id: 'responsibility',
    icon: '◈',
    title: { fr: 'Responsabilité', en: 'Responsibility' },
    description: {
      fr: 'Nous privilégions des relations durables et responsables avec les acteurs locaux.',
      en: 'We prioritize sustainable and responsible relationships with local stakeholders.',
    },
  },
];

export const services: Service[] = [
  {
    id: 'local',
    icon: '→',
    title: { fr: 'Livraison Locale', en: 'Local Delivery' },
    description: {
      fr: 'Nous livrons nos produits directement à nos clients à Tananarive et dans les autres régions de Madagascar.',
      en: 'We deliver our products directly to our customers in Antananarivo and other regions of Madagascar.',
    },
  },
  {
    id: 'international',
    icon: '↗',
    title: { fr: 'Expédition Internationale', en: 'International Shipping' },
    description: {
      fr: 'Nous assurons l\'envoi de nos produits vers nos clients et partenaires à l\'international, avec un suivi complet et sécurisé.',
      en: 'We ensure the secure and fully tracked shipment of our products to customers and partners worldwide.',
    },
  },
  {
    id: 'pricing',
    icon: '◈',
    title: { fr: 'Tarification Adaptée', en: 'Flexible Pricing' },
    description: {
      fr: 'Nos prix et modalités d\'expédition s\'ajustent selon la quantité commandée et les conditions du marché.',
      en: 'Our prices and shipping terms are adjusted based on order quantity and market conditions.',
    },
  },
];

export const certifications = [
  "Certificat d'agrément d'exportateur",
  'Certification REX (Registered Exporter)',
  'Certificat de consommabilité',
  "Résultat d'analyse récente",
];

export const contact = {
  email: 'zaraspicesexport@gmail.com',
  phones: ['+261 37 59 306 17', '+261 34 72 862 35'],
  facebook: 'ZARA Spices Export',
  regions: {
    fr: ['Région SAVA', 'Mananara (Analanjirofo)'],
    en: ['SAVA Region', 'Mananara (Analanjirofo)'],
  },
};
