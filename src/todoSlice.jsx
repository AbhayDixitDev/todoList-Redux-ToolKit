import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
    name: "todo",
    initialState:{
        task:[]
    },
    reducers:{
        addTask:(state,actions)=>{
            state.task.push(actions.payload)
        },
        Delete:(state,actions)=>{
            state.task = state.task.filter(item=>item.id!=actions.payload);
        },
        taskComplete:(state,actions)=>{
            for(var i=0;i<state.task.length;i++)
            {
                if(state.task[i].id==actions.payload)
                {
                    state.task[i].status=true;
                }
            }
        },
        taskUnComplete:(state,actions)=>{
            for(var i=0;i<state.task.length;i++)
            {
                if(state.task[i].id==actions.payload)
                {
                    state.task[i].status=false;
                }
            }
        },
        editDataSave:(state,actions)=>{
         
            for(var i=0;i<state.task.length;i++)
             {
                 if(state.task[i].id==actions.payload.id)
                 {
                     state.task[i].task=actions.payload.task;
                 }
             }
         }
    }
})


export const {addTask,Delete,taskComplete,taskUnComplete,editDataSave} = todoSlice.actions
export default todoSlice.reducer
