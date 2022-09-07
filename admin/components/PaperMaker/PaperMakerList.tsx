import { Button } from "@mui/material";
import { useState } from "react";
import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
  DateField,
  BooleanInput,
  useRecordContext,
  WrapperField,
  Confirm,
  useUpdate,
} from "react-admin";

const postFilters = [
  // eslint-disable-next-line react/jsx-key
  <BooleanInput key={1} source={"isConfirmed"} label="Confirmed" />,
];

const CustomButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);
  const [update, { data, isLoading, error }] = useUpdate("PaperMaker", {
    id: record.id,
    data: { isConfirmed: !record.isConfirmed },
    previousData: record,
  });

  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    update();
    handleDialogClose();
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ textTransform: "capitalize" }}
        onClick={() => setOpen(true)}
        color={record.isConfirmed ? "error" : "primary"}
        disableRipple
      >
        {!record.isConfirmed ? "Enable" : "Disable"}
      </Button>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title="Update PaperMaker Account"
        content={`Are you sure you want to ${
          !record.isConfirmed ? "enable" : "disable"
        } this papermaker`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

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

      <CustomButton />
    </Datagrid>
  </List>
);
