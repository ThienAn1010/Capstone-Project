import {
  BooleanInput,
  Edit,
  ListButton,
  ReferenceField,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
} from "react-admin";

const PaperMakerEditToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const PaperMakerEditActions = (props: any) => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const PaperMakerEdit = () => (
  <Edit actions={<PaperMakerEditActions />}>
    <SimpleForm toolbar={<PaperMakerEditToolbar />}>
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Name"
        link={false}
      >
        <TextInput source="name" disabled fullWidth />
      </ReferenceField>
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Email"
        link={false}
      >
        <TextInput disabled source="username" fullWidth />
      </ReferenceField>
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Phone"
        link={false}
      >
        <TextInput disabled source="phoneNumber" fullWidth />
      </ReferenceField>
      <ReferenceField
        reference={"User"}
        source={"userId"}
        label="Address"
        link={false}
      >
        <TextInput disabled source="address" fullWidth />
      </ReferenceField>

      <TextInput disabled source="aboutMe" fullWidth multiline />

      <BooleanInput source="isConfirmed" fullWidth />
    </SimpleForm>
  </Edit>
);
