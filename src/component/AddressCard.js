import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  FormLabel,
} from "@material-ui/core";
import { Input } from "./Input";
import { Edit, CheckCircle } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAddress, getFio } from "../Data/DaDataService";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const AddressCard = ({ children, ...props }) => {
  const styles = useStyles();
  const [regAddress, setRegAddress] = useState(props.regAddress);
  const [liveAddress, setLiveAddress] = useState(props.liveAddress);
  const [isEditRegAddress, setEditRegAddress] = useState(false);
  const [isEditLiveAddress, setEditLiveAddress] = useState(false);
  const [addressList, setAddressList] = useState([]);

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Адресс
        </Typography>
        {!isEditRegAddress && <FormLabel>Адресс проживания: {regAddress}</FormLabel>}

        {isEditRegAddress && (
          <Autocomplete
            id="combo-box-demo"
            noOptionsText="Нет данных"            
            options={addressList}
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}            
            onChange={(e, v) => {
              // console.log(v);
              setRegAddress(v.value);
              // props.onChangeFio(v.value);
            }}
            renderInput={(params) => (
              <Input
                // {...register("fio")}
                {...params}
                id="regAddress"
                type="text"
                label="Адресс регистрации"
                name="regAddress"
                text={regAddress}
                onChange={(e) => { setRegAddress(e.target.value); getAddress(e.target.value).then((res) => setAddressList(res));}}
                // error={!!errors.username}
                // helperText={errors?.username?.message}
              />
            )}
          />
        )}
        {!isEditRegAddress && (
          <IconButton
            onClick={() => {
              setEditRegAddress(true);
            }}
          >
            <Edit />
          </IconButton>
        )}
        {isEditRegAddress && (
          <IconButton
            onClick={() => {
              // setFio()
              setEditRegAddress(false);
            }}
          >
            <CheckCircle />
          </IconButton>
        )}

        <br />

{!isEditLiveAddress && <FormLabel>Адресс регистрации: {liveAddress}</FormLabel>}

        {isEditLiveAddress && (
          <Autocomplete
            id="combo-box-demo"
            noOptionsText="Нет данных"            
            options={addressList}
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}            
            onChange={(e, v) => {
              // console.log(v);
              setLiveAddress(v.value);
              // props.onChangeFio(v.value);
            }}
            renderInput={(params) => (
              <Input
                // {...register("fio")}
                {...params}
                id="liveAddress"
                type="text"
                label="Адресс Проживания"
                name="liveAddress"
                text={regAddress}
                onChange={(e) => { setLiveAddress(e.target.value); getAddress(e.target.value).then((res) => setAddressList(res));}}
                // error={!!errors.username}
                // helperText={errors?.username?.message}
              />
            )}
          />
        )}
        {!isEditLiveAddress && (
          <IconButton
            onClick={() => {
              setEditLiveAddress(true);
            }}
          >
            <Edit />
          </IconButton>
        )}
        {isEditLiveAddress && (
          <IconButton
            onClick={() => {
              // setFio()
              setEditLiveAddress(false);
            }}
          >
            <CheckCircle />
          </IconButton>
        )}

      </CardContent>
    </Card>
  );
};
