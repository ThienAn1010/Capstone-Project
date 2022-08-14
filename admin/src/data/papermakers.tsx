import * as React from "react";
import { List, Datagrid, TextField, EmailField} from 'react-admin';

export const PapermakerList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField className='text-red-900  ' source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);