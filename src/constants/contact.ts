import { getBrand } from '../lib/brands';

const brand = getBrand();
const digits = brand.phone.replace(/[^0-9]/g, '');

export const CONTACT = {
  email: brand.email,
  phoneRaw: brand.phone,
  phoneE164: `+1${digits}`,
  phoneHref: `tel:+1${digits}`,
};
