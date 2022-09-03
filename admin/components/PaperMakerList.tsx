import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";

export const PaperMakerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Name"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Email"
        link={false}
      >
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Phone"
        link={false}
      >
        <TextField source="phoneNumber" />
      </ReferenceField>

      <TextField source="status" />
      <TextField source="aboutMe" />
      <BooleanField source="isConfirmed" label="Confirmed" />
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Created At"
        link={false}
      >
        <DateField source="createdAt" showTime />
      </ReferenceField>
    </Datagrid>
  </List>
);
