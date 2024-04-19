import OrderLine from "./OrderLine";

export default class Order {
  totalAmount: number = 0;
  lines: OrderLine[] = [];
}
