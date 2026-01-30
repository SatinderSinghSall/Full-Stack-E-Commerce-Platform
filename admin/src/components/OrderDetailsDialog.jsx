import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { currency } from "@/config";

const OrderDetailsDialog = ({ open, onOpenChange, order }) => {
  if (!order) return null;

  const { address, items, amount, payment, paymentMethod, status, date } =
    order;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {/* CUSTOMER */}
        <div className="space-y-1">
          <h3 className="font-semibold">Customer</h3>
          <p>
            {address.firstName} {address.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{address.phone}</p>
        </div>

        {/* ADDRESS */}
        <div className="space-y-1">
          <h3 className="font-semibold">Shipping Address</h3>
          <p className="text-sm">
            {address.street}, {address.city}, {address.state}, {address.country}{" "}
            - {address.zipcode}
          </p>
        </div>

        {/* ITEMS */}
        <div className="space-y-2">
          <h3 className="font-semibold">Items</h3>

          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 border rounded-lg p-3 items-start"
              >
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm">
                    {currency}
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Badge variant={payment ? "default" : "secondary"}>
            {payment ? "Paid" : "Pending"}
          </Badge>
          <Badge variant="outline">{paymentMethod}</Badge>
          <Badge variant="outline">{status}</Badge>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-semibold pt-4 border-t">
          <span>Total</span>
          <span>
            {currency}
            {amount}
          </span>
        </div>

        {/* DATE */}
        <p className="text-xs text-muted-foreground text-right">
          Ordered on {new Date(date).toLocaleString()}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
