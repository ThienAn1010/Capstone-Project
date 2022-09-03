import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import postgrestRestProvider from "@promitheus/ra-data-postgrest";
import { PaperMakerList } from "./PaperMakerList";
import { PaperMakerEdit } from "./PaperMakerEdit";

const dataProvider = postgrestRestProvider("/api/admin");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={"PaperMaker"}
        list={PaperMakerList}
        edit={PaperMakerEdit}
      />
      <Resource name={"OfferedService"} list={ListGuesser} />
      <Resource name={"Booking"} list={ListGuesser} />
      <Resource name={"User"} list={ListGuesser} />
    </Admin>
  );
};

export default App;
