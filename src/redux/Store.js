import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"

const store = configureStore({
reducer: {
storearticles:articlesReducer,

}
})
export default store
