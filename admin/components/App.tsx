import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import postgrestRestProvider from "@promitheus/ra-data-postgrest";
import { PaperMakerEdit } from "./PaperMaker/PaperMakerEdit";
import { PaperMakerList } from "./PaperMaker/PaperMakerList";
import { UserList } from "./User/UserList";
import { UserEdit } from "./User/UserEdit";
import { BookingList } from "./Booking/BookingList";
import { BookingEdit } from "./Booking/BookingEdit";
import { OfferedserviceList } from "./OfferedService/OfferedServiceList";
import authProvider from "../src/authProvider";

const dataProvider = postgrestRestProvider("/api/admin");

const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name={"PaperMaker"}
        list={PaperMakerList}
        edit={PaperMakerEdit}
      />
      <Resource name={"User"} list={UserList} edit={UserEdit} />
      <Resource name={"Booking"} list={BookingList} edit={BookingEdit} />
      <Resource name={"OfferedService"} list={OfferedserviceList} />
    </Admin>
  );
};

export default App;
