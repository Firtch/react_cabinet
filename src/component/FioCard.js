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
import { getFio } from "../Data/DaDataService";

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

export const FioCard = ({ children, ...props }) => {
  const styles = useStyles();
  const [fio, setFio] = useState(props.fio);
  const [isEditFio, setIsEditFio] = useState(false);
  const [fioList, setFioList] = useState([]);

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Фамилия Имя Отчество
        </Typography>
        {!isEditFio && <FormLabel>{fio}</FormLabel>}

        {isEditFio && (
          <Autocomplete
            id="combo-box-demo"
            noOptionsText="Нет данных"            
            options={fioList}
            getOptionLabel={(option) => option.value}
            style={{ width: 300 }}            
            onChange={(e, v) => {
              // console.log(v);
              setFio(v.value);
              props.onChangeFio(v.value);
            }}
            renderInput={(params) => (
              <Input
                // {...register("fio")}
                {...params}
                id="fio"
                type="text"
                label="Ф. И. О."
                name="fio"
                text={fio}
                onChange={(e) => { setFio(e.target.value); /*setFioList(getFio(e.target.value));*/ getFio(e.target.value).then((res) => setFioList(res)); /*props.onChangeFio(e.target.value);*/}}
                // error={!!errors.username}
                // helperText={errors?.username?.message}
              />
            )}
          />
        )}
        {!isEditFio && (
          <IconButton
            onClick={() => {
              setIsEditFio(true);
            }}
          >
            <Edit />
          </IconButton>
        )}
        {isEditFio && (
          <IconButton
            onClick={() => {
              // setFio()
              setIsEditFio(false);
            }}
          >
            <CheckCircle />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};
