import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
const store = configureStore({
    reducer: {
        auth: authSlice,
        // TODO: add more reducers here for post
    }
});

export default store;
