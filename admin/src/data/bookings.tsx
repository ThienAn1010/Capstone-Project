import * as React from "react";
import { List, Datagrid, TextField, ReferenceField, EditButton  } from 'react-admin';

export const PostList = () => (
    <List>
        <Datagrid>
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);