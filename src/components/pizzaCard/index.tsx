import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import Pizza from "../../models/Pizza";

import "./style.css";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";

interface props {
  pizza: Pizza;
  orderUpdate: Function;
}

const PizzaCard = ({ pizza, orderUpdate }: props) => {
  const [qty, setQty] = useState<number>(0);

  return (
    <Card sx={{ display: "flex" }} className="pizza" elevation={4}>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={`/assets/${pizza.image}`}
        alt={pizza.name}
        title={pizza.name}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent="space-between"
        width={"100%"}
      >
        <CardContent>
          <Box className="header">
            <Typography variant="h3">{pizza.name}</Typography>
            <Chip
              label={`${pizza.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €`}
              className="price"
            />
          </Box>
          <Typography variant="body1">{pizza.description}</Typography>
        </CardContent>
        <CardActions className="quantity">
          <IconButton
            disabled={qty <= 0}
            onClick={() => {
              setQty(qty - 1);
              orderUpdate(pizza.id, qty - 1);
            }}
          >
            <Remove fontSize="small" />
          </IconButton>
          <Typography variant="body1">{qty}</Typography>
          <IconButton
            disabled={qty >= 10}
            onClick={() => {
              setQty(qty + 1);
              orderUpdate(pizza.id, qty + 1);
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default PizzaCard;
