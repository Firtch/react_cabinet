import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
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

export const LastNameChangeCard = ({ children, ...props }) => {
  const styles = useStyles();
  const [lastName, setLastName] = useState(props.lastName);
  const [isEditLastName, setIsEditLastName] = useState(false);
  const [lastNameList, setLastNameList] = useState([]);

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Предыдущая фамилия
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="changeLastName"
            name="changeLastNameNO"
            value={isEditLastName}
            onChange={(e) =>
              e.target.value === "false"
                ? setIsEditLastName(false)
                : setIsEditLastName(true)
            }
          >
            <FormControlLabel value={false} control={<Radio />} label="Нет" />
            <FormControlLabel value={true} control={<Radio />} label="Да" />
          </RadioGroup>
        </FormControl>

        {isEditLastName && (
          <Autocomplete
            id="combo-box-demo"
            noOptionsText="Нет данных"
            options={lastNameList}
            getOptionLabel={(option) => option.data.surname}
            style={{ width: 300 }}
            onChange={(e, v) => {                            
              setLastName(v.value);
              // props.onChangeFio(v.value);
            }}
            renderInput={(params) => (
              <Input
                // {...register("fio")}
                {...params}
                id="lastName"
                type="text"
                label="Фамилия"
                name="lastName"
                onChange={(e) => {                  
                  setLastName(e.target.value);
                  getFio(e.target.value).then(res => setLastNameList(res.filter((res) => res.data.surname !== null)));
                  /*handleFioList(
                    e.target.value
                  );*/ /*props.onChangeFio(e.target.value);*/
                }}
                // error={!!errors.username}
                // helperText={errors?.username?.message}
              />
            )}
          />
        )}        
      </CardContent>
    </Card>
  );
};
