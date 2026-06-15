import Breadcrumb from './Breadcrumb';
import { getPoles, getProducts, getServices, getBoutiqueCategories, getNewsPosts } from '../../lib/db';

export default async function BreadcrumbServer() {
  const [poles, products, services, boutiqueCategories, newsPosts] = await Promise.all([
    getPoles(),
    getProducts(),
    getServices(),
    getBoutiqueCategories(),
    getNewsPosts(),
  ]);

  return (
    <Breadcrumb
      poles={poles}
      products={products}
      services={services}
      boutiqueCategories={boutiqueCategories}
      newsPosts={newsPosts}
    />
  );
}
