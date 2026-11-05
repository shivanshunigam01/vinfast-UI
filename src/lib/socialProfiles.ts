/** Official profiles for footer links and JSON-LD sameAs (client-approved). */
export const OFFICIAL_SOCIAL = {
  instagram: "https://www.instagram.com/vinfastpatliputra/",
  linkedIn: "https://www.linkedin.com/company/patliputra-groups/",
  /** Google Maps listing / GBP (public maps URL; share links are not used in schema). */
  googleBusiness: "https://www.google.com/maps/search/Near+Deedarganj+Check+Post+NH-30+Patna+800009/@25.580227,85.248147,16z?hl=en-GB&entry=ttu",
} as const;

export const SOCIAL_SAME_AS: string[] = [
  OFFICIAL_SOCIAL.instagram,
  OFFICIAL_SOCIAL.linkedIn,
  OFFICIAL_SOCIAL.googleBusiness,
];
