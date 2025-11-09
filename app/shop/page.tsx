'use client';
import { useState, useEffect } from 'react';
import ProductsGrid from '../components/products/ProductsGrid';
import {ProductItem} from '../components/products/ProductsGrid';
import { getAllProducts, ShopifyProduct } from './/../../lib/shopify';

// Map ShopifyProduct[] -> ProductItem[]
function mapShopifyProducts(products: ShopifyProduct[]): ProductItem[] {
  return products.map(p => ({
    id: p.id || p.handle,
    handle: p.handle,
    title: p.title,
    price: parseFloat(p.priceRange?.minVariantPrice.amount || '0'),
    categoryId: p.categoryId || undefined,
    images: p.images?.map(img => ({ url: img.url, altText: img.altText || p.title })) || [],
  }));
}

export default function ProductsGridClient() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const shopifyProducts: ShopifyProduct[] = await getAllProducts();
      setProducts(mapShopifyProducts(shopifyProducts));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
  
  <div>

    <ProductsGrid products={products} />;
  </div>)
}
