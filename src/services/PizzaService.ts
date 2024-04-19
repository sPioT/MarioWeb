import Order from "../models/Order";
import Pizza from "../models/Pizza";
import AuthenticationService from "./AuthenticationService";

class PizzaService {
  static async getAll(): Promise<Pizza[]> {
    return fetch("http://localhost:8080/pizza/", {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((pizzas) => pizzas.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static async save(order: Order): Promise<boolean> {
    return fetch("http://localhost:8080/pizza/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: AuthenticationService.getJwt(),
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.ok)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default PizzaService;
