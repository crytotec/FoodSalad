import { configureStore } from "@reduxjs/toolkit";
import itemstore from '../features/items/itemSlice'


const store=configureStore({
    reducer:{
        items: itemstore
    }
})



 export type RootState=ReturnType<typeof store.getState>
 export type Appdispatch=typeof store.dispatch;


 export default store