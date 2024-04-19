export default class OrderLine {
  pizzaId: number = 0;
  quantity: number = 0;

  constructor(pizzaId: number, quantity: number) {
    this.pizzaId = pizzaId;
    this.quantity = quantity;
  }
}
