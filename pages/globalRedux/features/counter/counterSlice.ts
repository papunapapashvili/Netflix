// slices/myVariableSlice.js
import { createSlice } from '@reduxjs/toolkit'

const myVariableSlice = createSlice({
    name: 'myVariable',
    initialState: null, // Initial value of your variable
    reducers: {
        setMyVariable: (state, action) => {
            return action.payload
        },
    },
})

export const { setMyVariable } = myVariableSlice.actions
export default myVariableSlice.reducer
