import { contact as seedContact } from '@/lib/data';

/**
 * Editable site text. Mirrors the original hardcoded copy so the site is
 * unchanged until edited from /admin/content. Bilingual fields use { fr, en }.
 */

export interface Bilingual {
  fr: string;
  en: string;
}

export interface HeroContent {
  badge: Bilingual;
  titleLine1a: Bilingual; // "Épices"
  titleLine1b: Bilingual; // "Malagasy" (accent)
  titleLine2: Bilingual; // "D'Excellence"
  subtitle: Bilingual;
  ctaPrimary: Bilingual;
  ctaSecondary: Bilingual;
}

export interface ContactContent {
  email: string;
  phone1: string;
  phone2: string;
  facebook: string;
}

export interface SiteContent {
  hero: HeroContent;
  contact: ContactContent;
}

export const defaultContent: SiteContent = {
  hero: {
    badge: { fr: 'Depuis 2017', en: 'Since 2017' },
    titleLine1a: { fr: 'Épices', en: 'Spices' },
    titleLine1b: { fr: 'Malagasy', en: 'Malagasy' },
    titleLine2: { fr: "D'Excellence", en: 'Of Excellence' },
    subtitle: {
      fr: 'De la source au monde — Vanille, cacao, girofle et épices rares de Madagascar, sélectionnés avec exigence.',
      en: 'From the source to the world — Vanilla, cocoa, cloves and rare spices from Madagascar, selected with rigour.',
    },
    ctaPrimary: { fr: 'Découvrir', en: 'Discover' },
    ctaSecondary: { fr: 'Nous Contacter', en: 'Contact Us' },
  },
  contact: {
    email: seedContact.email,
    phone1: seedContact.phones[0] ?? '',
    phone2: seedContact.phones[1] ?? '',
    facebook: seedContact.facebook,
  },
};
