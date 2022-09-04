import {
  Datagrid,
  DateField,
  EditButton,
  ImageField,
  List,
  NumberField,
  TextField,
  WrapperField,
} from "react-admin";

import styles from "./UserList.module.css";

export const UserList = () => (
  <List filterDefaultValues={{ role: "user" }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <WrapperField label="Username" cellClassName={styles["container"]}>
        <ImageField
          sx={{
            "& img": {
              maxWidth: 50,
              maxHeight: 50,
              objectFit: "contain",
              borderRadius: "100%",
            },
          }}
          source="picture"
        />
        <TextField source="username" />
      </WrapperField>
      <TextField source="phoneNumber" />
      <DateField source="createdAt" showTime />
      <TextField source="address" />
      <EditButton />
    </Datagrid>
  </List>
);
