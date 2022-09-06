import {
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  AutocompleteInput,
} from "react-admin";

export const BookingEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" fullWidth />
      <TextInput source="note" fullWidth />
      <NumberInput source="payAmount" fullWidth />
      <AutocompleteInput
        fullWidth
        source="status"
        choices={[
          { id: "pendingConfirm", name: "Pending" },
          { id: "accept", name: "In progress" },
          { id: "deny", name: "Denied" },
          { id: "drop", name: "Cancelled" },
          { id: "success", name: "Done" },
        ]}
      />
      <DateInput source="createdAt" fullWidth />
    </SimpleForm>
  </Edit>
);
