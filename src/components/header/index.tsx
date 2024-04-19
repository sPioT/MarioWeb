import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import "./style.css";
import { Logout } from "@mui/icons-material";
import AuthenticationService from "../../services/AuthenticationService";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
}

const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const { t } = useTranslation();

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: "auto" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <img src="/assets/logo.png" alt="" style={{ width: "2.5em" }} />
        <Typography variant="h1">{t("common.MarioS")}</Typography>

        <Box
          style={{ width: "3.5em", height: "4em" }}
          display={"flex"}
          alignItems={"center"}
        >
          {isAuthenticated && (
            <IconButton
              color="inherit"
              onClick={() => {
                AuthenticationService.logout();
              }}
              title="logout"
            >
              <Logout />
            </IconButton>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
