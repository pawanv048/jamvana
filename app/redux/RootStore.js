import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

export const submitFormData = createAsyncThunk('submitFormData', async (formData, thunkAPI) => {
    // do some async logic here, such as making a network request
    // ...
    // when the async logic is finished, return the data
    return { formData }
})

const store = configureStore({
    reducer: {
        form: (state = { formData: {}, submitCount: 0 }, action) => {
            switch (action.type) {
                case submitFormData.fulfilled.type: {
                    state.formData = action.payload.formData
                    state.submitCount++
                }
            }
        }
    },
    middleware: [thunk]
})

export default store