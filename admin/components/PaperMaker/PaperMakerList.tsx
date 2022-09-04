import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
  DateField,
  EditButton,
  BooleanInput,
} from "react-admin";

const postFilters = [
  <BooleanInput key={1} source={"isConfirmed"} label="Confirmed" />,
];

export const PaperMakerList = () => (
  <List filters={postFilters}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
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
        label="Username"
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
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Address"
        link={false}
      >
        <TextField source="address" />
      </ReferenceField>

      <BooleanField source="isConfirmed" label="Confirmed" />
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Created At"
        link={false}
      >
        <DateField source="createdAt" showTime />
      </ReferenceField>

      <EditButton />
    </Datagrid>
  </List>
);
