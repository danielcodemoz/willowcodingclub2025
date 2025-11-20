import { useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { ProductList } from "@/components/ProductList";
import { TotalDisplay } from "@/components/TotalDisplay";
import { Package } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      price,
      quantity,
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const calculateGrandTotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 mb-4 shadow-lg">
            <Package className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Product Manager</h1>
          <p className="text-muted-foreground">Add and manage your inventory with ease</p>
        </header>

        {/* Product Form */}
        <ProductForm onAddProduct={handleAddProduct} />

        {/* Product List */}
        {products.length > 0 ? (
          <>
            <ProductList products={products} onDeleteProduct={handleDeleteProduct} />
            <TotalDisplay total={calculateGrandTotal()} />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products yet</h3>
            <p className="text-muted-foreground">Add your first product to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
