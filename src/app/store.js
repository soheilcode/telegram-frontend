import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import userReducer from '../features/userSlice'
import groupReducer from '../features/groupSlice'
export default configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        group: groupReducer
    },
});