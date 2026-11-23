/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT YOUR DOCUMENTATION HERE
 * ─────────────────────────────────────────────────────────────
 *  name     → title shown on the card
 *  field    → category / field of work (e.g. "Troubleshooting")
 *  link     → URL opened when the card is clicked
 *  summary  → optional one-line description
 *  featured → optional, set true to pin a doc to the home page
 *
 *  The home page shows up to 3 featured docs. If none are marked,
 *  it falls back to the first 3 entries in this array.
 * ─────────────────────────────────────────────────────────────
 */

export type Doc = {
  id: string;
  name: string;
  field: string;
  link: string;
  summary?: string;
  featured?: boolean;
};

export const docs: Doc[] = [
  {
    id: "s3-static-website",
    name: 'Host a Website on Amazon S3',
    field: "Cloud",
    link: "https://nextwork.ai/sahil/docs/70e2d059-31ab-5f67-8c58-f5edbd451140",
    summary:
      "In this project I am going to host a Static Website with Amazon S3",
    featured: true,
  },
  {
    id: "aws-account-setup",
    name: 'Set Up An AWS Account',
    field: "Cloud",
    link: "https://nextwork.ai/sahil/docs/90e42921-e1f4-5c44-8a1f-394b21d79093",
    summary:
      "AWS powers over 30% of the world's cloud infrastructure - and I set up my own account to start building on it.",
    featured: true,
  },
]
