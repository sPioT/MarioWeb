import { Badge, Box, IconButton, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Pizza from "../../models/Pizza";
import PizzaCard from "../../components/pizzaCard";
import PizzaService from "../../services/PizzaService";
import { useTranslation } from "react-i18next";

import "./style.css";
import { MopedTwoTone, ShoppingCartCheckout } from "@mui/icons-material";
import Order from "../../models/Order";
import OrderLine from "../../models/OrderLine";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const { t } = useTranslation();

  const [order, setOrder] = useState<Order>(new Order());

  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  const [nbrPizza, setNbrPizza] = useState<number>(0);

  const [openPopin, setOpenPopin] = useState<boolean>(false);

  useEffect(() => {
    PizzaService.getAll().then((value) => setPizzas(value));
  }, []);

  const orderUpdate = (id: number, quantity: number) => {
    let newO: Order = new Order();

    // add/remove pizza
    newO.lines = order.lines.filter((item: OrderLine) => item.pizzaId !== id);
    if (quantity > 0) {
      newO.lines.push(new OrderLine(id, quantity));
    }

    // update totalAmount
    let tempTotal: number = 0;
    let tempNbrPizza: number = 0;

    newO.lines.forEach((line: OrderLine) => {
      let piz = pizzas.find((pizza: Pizza) => pizza.id === line.pizzaId);

      if (piz !== undefined) tempTotal += line.quantity * piz.price;

      tempNbrPizza += line.quantity;
    });

    newO.totalAmount = tempTotal;

    setOrder(newO);
    setNbrPizza(tempNbrPizza);
  };

  const saveOrder = () => {
    PizzaService.save(order).then((ok: boolean) => {
      if (ok) {
        setOpenPopin(true);
      }
    });
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="orderHeader"
      >
        <Typography variant="h2">{t("order.choosePizzas")}</Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Typography className="total">
            {t("order.total", {
              total: order.totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            })}
          </Typography>

          <Badge
            badgeContent={nbrPizza}
            color="primary"
            invisible={nbrPizza === 0}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            overlap="circular"
          >
            <IconButton
              disabled={order.totalAmount === 0}
              onClick={() => saveOrder()}
              title={t("order.validate")}
            >
              <ShoppingCartCheckout />
            </IconButton>
          </Badge>
        </Box>
      </Box>
      <Box mt="8.5em">
        {pizzas.map((pizza: Pizza) => (
          <PizzaCard
            pizza={pizza}
            key={`p${pizza.id}`}
            orderUpdate={orderUpdate}
          />
        ))}
      </Box>
      <Popover
        open={openPopin}
        className="popin"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography>
          {t("order.success1")}
          <br />
          {t("order.success2")}
        </Typography>
        <MopedTwoTone fontSize="large" />
        <Link to="" onClick={() => window.location.reload()}>
          {t("order.back")}
        </Link>
      </Popover>
    </>
  );
};

export default OrderPage;
