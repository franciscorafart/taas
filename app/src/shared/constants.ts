import { z } from 'zod';

export enum TierIds {
  HOBBY = 'hobby-tier',
  PRO = 'pro-tier',
  ENTERPRISE = 'enterprise-tier',
}

export const DOCS_URL = 'https://docs.opensaas.sh';
export const BLOG_URL = 'https://docs.opensaas.sh/blog';

const isDevEnv = process.env.NODE_ENV !== 'production';
const customerPortalTestUrl = ''; // TODO: find your test url at https://dashboard.stripe.com/test/settings/billing/portal
const customerPortalProdUrl = ''; // TODO: add before deploying to production

export const STRIPE_CUSTOMER_PORTAL_LINK = isDevEnv ? customerPortalTestUrl : customerPortalProdUrl;

checkStripePortalLinksExist({ customerPortalTestUrl, customerPortalProdUrl });

type StripePortalUrls = {
  customerPortalTestUrl: string | undefined;
  customerPortalProdUrl: string | undefined;
};

function checkStripePortalLinksExist(links: StripePortalUrls) {
  const schema = z.string().url();
  const testResult = schema.safeParse(links.customerPortalTestUrl);
  const prodResult = schema.safeParse(links.customerPortalProdUrl);
  let consoleMsg = {
    color: '\x1b[33m%s\x1b[0m',
    msg: '',
  };

  if (testResult.success && prodResult.success) {
    consoleMsg.color = '\x1b[32m%s\x1b[0m';
    consoleMsg.msg = '✅ Both STRIPE_CUSTOMER_PORTAL_LINK links defined';
  } else if (!testResult.success && !prodResult.success) {
    consoleMsg.msg = '⛔️ STRIPE_CUSTOMER_PORTAL_LINK is not defined';
  } else if (!testResult.success) {
    consoleMsg.msg = '⛔️ STRIPE_CUSTOMER_PORTAL_LINK is not defined for test env';
  } else {
    consoleMsg.msg = '⛔️ STRIPE_CUSTOMER_PORTAL_LINK is not defined for prod env';
  }
  console.log(consoleMsg.color, consoleMsg.msg);
}

export const TAROT_DECK = [
  // Major Arcana
  { value: 'fool', label: 'The Fool' },
  { value: 'magician', label: 'The Magician' },
  { value: 'high_priestess', label: 'The High Priestess' },
  { value: 'emperess', label: 'The Empress' },
  { value: 'emperor', label: 'The Emperor' },
  { value: 'hierophant', label: 'The Hierophant' },
  { value: 'lovers', label: 'The Lovers' },
  { value: 'chariot', label: 'The Chariot' },
  { value: 'strength', label: 'Strength' },
  { value: 'hermit', label: 'The Hermit' },
  { value: 'wheel_of_fortune', label: 'Wheel of Fortune' },
  { value: 'justice', label: 'Justice' },
  { value: 'hanged_man', label: 'The Hanged Man' },
  { value: 'death', label: 'XIII Arcane' },
  { value: 'temperance', label: 'Temperance' },
  { value: 'devil', label: 'The Devil' },
  { value: 'tower', label: 'The Tower' },
  { value: 'star', label: 'The Star' },
  { value: 'moon', label: 'The Moon' },
  { value: 'sun', label: 'The Sun' },
  { value: 'judgement', label: 'Judgement' },
  { value: 'world', label: 'The World' },
  // Minor Arcana
  ...['Cups', 'Pentacles', 'Swords', 'Wands'].flatMap((suit, i) => 
      Array.from({ length: 14 }, (_, j) => {
          let cardName;
          switch (j) {
              case 0:
                  cardName = 'Ace';
                  break;
              case 10:
                  cardName = 'Page';
                  break;
              case 11:
                  cardName = 'Knight';
                  break;
              case 12:
                  cardName = 'Queen';
                  break;
              case 13:
                  cardName = 'King';
                  break;
              default:
                  cardName = (j + 1).toString();
          }
          return { value: `${cardName.toLowerCase()}_of_${suit.toLowerCase()}`, label: `${cardName} of ${suit}` }
      })
  )
];