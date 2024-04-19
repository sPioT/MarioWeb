import {
  Box,
  Button,
  Card,
  InputLabel,
  Popover,
  TextField,
  Typography,
} from "@mui/material";

import "./style.css";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as yup from "yup";
import AuthenticationService from "../../services/AuthenticationService";
import { Link } from "react-router-dom";
import Account from "../../models/security/Account";

const CreateAccount = () => {
  const { t } = useTranslation();

  const [openPopin, setOpenPopin] = useState<boolean>(false);

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .required(t("error.required"))
      .test(
        "2Len",
        t("error.minLen", { field: "2" }),
        (value: string) => value.length >= 2
      ),
    lastname: yup
      .string()
      .required(t("error.required"))
      .test(
        "2Len",
        t("error.minLen", { field: "2" }),
        (value: string) => value.length >= 2
      ),
    password: yup
      .string()
      .required(t("error.required"))
      .test(
        "6Len",
        t("error.minLen", { field: "6" }),
        (value: string) => value.length >= 6
      ),
    repassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        t("createAccount.error.passwordsDifferent")
      ),
    phonenumber: yup
      .string()
      .required(t("error.required"))
      .test(
        "10Len",
        t("error.minLen", { field: "10" }),
        (value: string) => value.length >= 10
      ),
    address: yup.string().required(t("error.required")),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      repassword: "",
      address: "",
      phonenumber: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let newAccount: Account = new Account(
        values.firstname,
        values.lastname,
        values.phonenumber,
        values.address,
        values.password
      );
      AuthenticationService.createAccount(newAccount)
        .then((ok: boolean) => {
          setOpenPopin(ok);
        })
        .catch((reason) => {});
    },
  });

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mt="3.5em"
      p="1em"
    >
      <Typography variant="h2">{t("createAccount.title")}</Typography>
      <Card className="account" elevation={10}>
        <form onSubmit={formik.handleSubmit}>
          <Box className="input">
            <InputLabel htmlFor="iLastname">
              {t("createAccount.lastname")}
            </InputLabel>

            <TextField
              id="iLastname"
              placeholder={t("createAccount.lastname")}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              name="lastname"
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </Box>
          <Box className="input">
            <InputLabel htmlFor="iFirstname">
              {t("createAccount.firstname")}
            </InputLabel>
            <TextField
              id="iFirstname"
              placeholder={t("createAccount.firstname")}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              name="firstname"
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
            />{" "}
          </Box>
          <Box className="input">
            <InputLabel htmlFor="iPassword">
              {t("createAccount.password")}
            </InputLabel>

            <TextField
              id="iPassword"
              placeholder={t("createAccount.password")}
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box className="input">
            <InputLabel htmlFor="iConfirm">
              {t("createAccount.repassword")}
            </InputLabel>

            <TextField
              id="iConfirm"
              placeholder={t("createAccount.repassword")}
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repassword}
              name="repassword"
              error={
                formik.touched.repassword && Boolean(formik.errors.repassword)
              }
              helperText={formik.touched.repassword && formik.errors.repassword}
            />
          </Box>
          <Box className="input">
            <InputLabel htmlFor="iAddress">
              {t("createAccount.address")}
            </InputLabel>

            <TextField
              id="iAddress"
              placeholder={t("createAccount.address")}
              type="text"
              multiline
              rows={3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              name="address"
              maxRows={4}
              variant="standard"
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Box>
          <Box className="input">
            <InputLabel htmlFor="iPhonenumber">
              {t("createAccount.phonenumber")}
            </InputLabel>

            <TextField
              placeholder={t("createAccount.phonenumber")}
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phonenumber}
              name="phonenumber"
              error={
                formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
              }
              helperText={
                formik.touched.phonenumber && formik.errors.phonenumber
              }
            />
          </Box>

          <Button variant="contained" type="submit">
            {t("createAccount.submit")}
          </Button>
        </form>
      </Card>
      <Popover
        open={openPopin}
        className="popin"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography>
          {t("createAccount.congratulation")}
          <br />
          {t("createAccount.readyToOrder")}
        </Typography>
        <br />
        <br />
        <Link to="/" reloadDocument={true}>
          {t("createAccount.toOrder")}
        </Link>
      </Popover>
    </Box>
  );
};

export default CreateAccount;
