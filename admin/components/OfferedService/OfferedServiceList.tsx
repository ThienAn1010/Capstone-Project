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
      <ReferenceField source="paperMakerId" reference="PaperMaker">
        <ReferenceField
          reference={"User"}
          source={"userId"}
          label="Email"
          link={false}
        >
          <TextField source="username" />
        </ReferenceField>
      </ReferenceField>
      <ReferenceField source="serviceId" reference="Service" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        source="paperMakerId"
        reference="PaperMaker"
        link={false}
        label="Total Bookings"
      >
        <TextField source="totalCases" />
      </ReferenceField>
      <ReferenceField
        source="paperMakerId"
        reference="PaperMaker"
        link={false}
        label="Total Successful Booking"
      >
        <TextField source="pastSuccessfulCases" />
      </ReferenceField>
      <ReferenceField
        source="paperMakerId"
        reference="PaperMaker"
        link={false}
        label="Rating"
      >
        <TextField source="rating" />
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
