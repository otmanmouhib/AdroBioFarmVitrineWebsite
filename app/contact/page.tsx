import { getEnterpriseInfo } from '../../lib/db';
import ContactClient from './ContactClient';

export default async function ContactPage() {
  const enterpriseInfo = await getEnterpriseInfo();

  return <ContactClient enterpriseInfo={enterpriseInfo} />;
}
