import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface TotalDisplayProps {
  total: number;
}

export const TotalDisplay = ({ total }: TotalDisplayProps) => {
  return (
    <Card className="bg-gradient-to-br from-accent to-accent/90 border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-success-foreground/20">
              <DollarSign className="w-7 h-7 text-success-foreground" />
            </div>
            <div>
              <p className="text-success-foreground/90 font-medium mb-1">Grand Total</p>
              <p className="text-4xl font-bold text-success-foreground">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
