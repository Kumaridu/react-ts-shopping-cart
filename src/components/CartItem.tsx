import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import storeItems from "../data/item.json";
import { formatCurrency } from "../utilities/formatCurrency";

type cartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: cartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imageUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          <div>
            {item.name}{" "}
            {quantity > 0 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x {quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
