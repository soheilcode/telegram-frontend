import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        group: null,
    },
    reducers: {
        setGroup: (state, action) => {
            state.group = action.payload;

        },
        setGroupLast: (state, action) => {
            state.group.last = action.payload
        }
    }
});

export const { setGroup, setGroupLast } = groupSlice.actions;


export const selectGroup = state => state.group.group

export default groupSlice.reducer;