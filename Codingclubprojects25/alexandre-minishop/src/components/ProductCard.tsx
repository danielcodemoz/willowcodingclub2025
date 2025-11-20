import { Product } from "@/pages/Index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Package } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const total = product.price * product.quantity;

  const handleDelete = () => {
    onDelete(product.id);
    toast.success("Product deleted");
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border animate-in fade-in slide-in-from-bottom-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Price</p>
                <p className="font-semibold text-foreground">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Quantity</p>
                <p className="font-semibold text-foreground">{product.quantity}</p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-border">
              <p className="text-muted-foreground text-sm mb-1">Total Value</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Delete product"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
