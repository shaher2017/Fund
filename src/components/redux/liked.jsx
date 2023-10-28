import { createSlice } from "@reduxjs/toolkit";

const thelist = createSlice({
name: 'thelist',
initialState:[],
reducers:{
    addProject:(state,action) =>{
        
        if (state.includes(action.payload)){
            return state;
    }
    
    else {return [...state, action.payload];} 
},
deleteProject: (state, action) => {
    return state.filter((item) => item !== action.payload);
  },
}
});
export const {addProject, deleteProject} = thelist.actions;
export default thelist.reducer;