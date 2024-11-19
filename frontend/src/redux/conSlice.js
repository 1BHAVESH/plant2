import {createSlice} from "@reduxjs/toolkit";


const conSlice = createSlice({
    name: "Con",
    initialState:{
        con: false,
        
    },
    reducers:{
        setCond: (state, action) => {
            state.con = action.payload
        },

        
    }
})

export const {setCond} = conSlice.actions;
export default conSlice.reducer