import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import postgrestRestProvider from "@promitheus/ra-data-postgrest";
import { PaperMakerEdit } from "./PaperMaker/PaperMakerEdit";
import { PaperMakerList } from "./PaperMaker/PaperMakerList";
import { UserList } from "./User/UserList";
import { UserEdit } from "./User/UserEdit";
import { BookingList } from "./Booking/BookingList";

const dataProvider = postgrestRestProvider("/api/admin");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={"PaperMaker"}
        list={PaperMakerList}
        edit={PaperMakerEdit}
      />
      <Resource name={"User"} list={UserList} edit={UserEdit} />
      <Resource name={"Booking"} list={BookingList} edit={EditGuesser} />
      <Resource name={"OfferedService"} list={ListGuesser} />
    </Admin>
  );
};

export default App;
