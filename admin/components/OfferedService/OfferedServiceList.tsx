import {
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const OfferedserviceList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="paperMakerId" reference="PaperMaker">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="serviceId" reference="Service" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="price" />
      <NumberField source="duration" />
      <TextField source="description" />
      <TextField source="documents" />
      <TextField source="estimate" />
      <DateField source="createdAt" />
      <EditButton />
    </Datagrid>
  </List>
);
