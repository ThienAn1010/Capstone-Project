import { Admin, Resource, ListGuesser } from "react-admin";
import postgrestRestProvider from "@promitheus/ra-data-postgrest";
import { PaperMakerList } from "./PaperMakerList";

const dataProvider = postgrestRestProvider("/api/admin");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name={"PaperMaker"} list={PaperMakerList} />
      <Resource name={"OfferedService"} list={ListGuesser} />
      <Resource name={"Booking"} list={ListGuesser} />
      <Resource name={"User"} list={ListGuesser} />
    </Admin>
  );
};

export default App;
