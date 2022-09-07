import { Button } from "@mui/material";
import { useState } from "react";
import {
  AutocompleteInput,
  Confirm,
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  TextField,
  useRecordContext,
  useUpdate,
} from "react-admin";

const bookingFilters = [
  <SearchInput source="id" alwaysOn key={1} />,
  <AutocompleteInput
    key={2}
    source="status"
    choices={[
      { id: "pendingConfirm", name: "Pending" },
      { id: "accept", name: "Accepted" },
      { id: "deny", name: "Denied" },
      { id: "drop", name: "Cancelled" },
      { id: "success", name: "Finished" },
    ]}
  />,
];

const CustomButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);
  const [update, { data, isLoading, error }] = useUpdate("Booking", {
    id: record.id,
    data: { isDroppedConfirmed: true },
    previousData: record,
  });
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    update();
    handleDialogClose();
  };

  if (record.droppedAt && !record.isDroppedConfirmed) {
    return (
      <>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "capitalize" }}
          color="info"
          disableRipple
          onClick={() => setOpen(true)}
        >
          Confirm
        </Button>
        <Confirm
          isOpen={open}
          loading={isLoading}
          title={`Refund back to the user?`}
          content={`Are you sure you want to refund this user?`}
          onConfirm={handleConfirm}
          onClose={handleDialogClose}
        />
      </>
    );
  }
};

export const BookingList = () => {
  return (
    <List filters={bookingFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="offeredServiceId" reference="OfferedService" />
        <ReferenceField source="userId" reference="User">
          <TextField source="username" />
        </ReferenceField>
        <FunctionField
          label="Comment"
          render={(record: any) => {
            if (record.note && record.note !== "undefined") return record.note;
            return "No comment";
          }}
        />
        <NumberField source="payAmount" label="Amount" />
        <FunctionField
          label="Status"
          render={(record: any) => {
            if (record.status === "pendingConfirm") return "Pending";
            if (record.status === "accept") return "Accepted";
            if (record.status === "deny") return "Denied";
            if (record.status === "drop") return "Cancelled";
            if (record.status === "success") return "Done";
          }}
        />
        ;
        <DateField source="createdAt" />
        <CustomButton />
      </Datagrid>
    </List>
  );
};
