import * as React from "react";
import { Admin, Resource} from 'react-admin';
import { PapermakerList } from './data/papermakers';
import jsonServerProvider from 'ra-data-json-server';
import {PostList} from './data/bookings';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={PapermakerList} />
    <Resource name="posts" list={PostList}/>
  </Admin>
);

export default App;