import {
  DateInput,
  Edit,
  ImageInput,
  ListButton,
  NumberInput,
  SimpleForm,
  TextInput,
  TopToolbar,
} from "react-admin";

const UserEditActions = (props: any) => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const UserEdit = () => (
  <Edit actions={<UserEditActions />}>
    <SimpleForm>
      <TextInput fullWidth source="username" />
      <TextInput fullWidth source="name" />
      <TextInput fullWidth source="phoneNumber" />
      <TextInput fullWidth source="address" />
      <DateInput fullWidth source="createdAt" />
    </SimpleForm>
  </Edit>
);
