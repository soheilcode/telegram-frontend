import { createSlice } from '@reduxjs/toolkit';
const darkTheme = {
    dark: true,
    lighterBackground: 'rgb(40,40,40)',
    borderColor: 'rgb(60,60,60)',
    background: 'black',
    text: 'white',
    textDarker: 'rgb(160,160,160)',
    message: 'rgb(40,40,40)'
}
const lightTheme = {
    dark: false,
    lighterBackground: 'white',
    borderColor: 'rgb(230,230,230)',
    background: 'white',
    text: 'black',
    textDarker: 'gray',
    message: 'rgb(240,240,240)'
}
export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: lightTheme,
    },
    reducers: {
        makeDark: state => {
            state.theme = darkTheme;
        },
        makeLight: state => {
            state.theme = lightTheme
        }
    },
});

export const { makeDark, makeLight } = themeSlice.actions;


export const selectTheme = state => state.theme.theme

export default themeSlice.reducer;