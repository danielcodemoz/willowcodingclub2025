import { Product } from "@/pages/Index";
import { ProductCard } from "@/components/ProductCard";

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
}

export const ProductList = ({ products, onDeleteProduct }: ProductListProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};
