// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import myVariableReducer from './features/counter/counterSlice'

const store = configureStore({
    reducer: {
        myVariable: myVariableReducer,
        // Other reducers...
    },
})

export default store
