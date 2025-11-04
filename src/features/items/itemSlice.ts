import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { item } from "../../Data/Items";



export interface menuLayout{
  Title:string;
  img:string;
  description:string,
  price:number,
  quantity:number  
} 


interface initialState{
    menu:menuLayout[]
}


const initialState:initialState={
    menu:[]
}


const menuSlice =createSlice({
    name:'menu',
    initialState,
    reducers:{
        addMenu:(state, action: PayloadAction<menuLayout>)=>{
         const exists=state.menu.find((item)=> item.Title === action.payload.Title);
         if (exists) {
            exists.quantity +=1;
         } else{
            state.menu.push({...action.payload, quantity: 1})
         }
        },
         removeMenu :(state, action:PayloadAction<string>)=>{
            state.menu=state.menu.filter((item)=> item.Title !== action.payload)
        },

        increaseQuantity:(state, action: PayloadAction<menuLayout>)=>{
            const quantity=state.menu.find((item)=>item.Title === action.payload.Title)
            if (quantity) {
            quantity.quantity +=1;
            }
        },

         decreaseQuantity:(state, action: PayloadAction<menuLayout>)=>{
            const decrease=state.menu.find((item)=>item.Title === action.payload.Title)
            if (decrease && decrease.quantity > 1) {
            decrease.quantity -=1;
            }
        },
         setMenu:(state, action:PayloadAction<menuLayout[]>)=>{
         state.menu=action.payload;   
        }
    }

   
})


export const {addMenu, removeMenu, increaseQuantity, decreaseQuantity, setMenu }=menuSlice.actions;
export default menuSlice.reducer