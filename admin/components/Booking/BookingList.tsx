import {
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useDataProvider,
} from "react-admin";

export const BookingList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="offeredServiceId" reference="OfferedService" />
        <ReferenceField source="userId" reference="User">
          <TextField source="username" />
        </ReferenceField>
        <TextField source="note" />
        <NumberField source="payAmount" label="Amount" />
        <FunctionField
          label="Status"
          render={(record: any) => {
            if (record.status === "pendingConfirm") return "Pending";
            if (
              record.status === "accept" ||
              record.status === "pendingFinished"
            )
              return "In progress";
            if (record.status === "deny") return "Denied";
            if (record.status === "drop") return "Cancelled";
            if (record.status === "success") return "Done";
          }}
        />
        ;
        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
