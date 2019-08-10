
export const init = (blogs) => {
    return {type:"INIT", data:blogs};
}

export const clear = () => {
    return {type:"CLEAR"};
}

export const setUser = (user) => {
    return {type:"SET_USER", data:user};
}

export const logoutUser = () => {
    return {type:"LOGOUT_USER"};
}

const initialState = {blogs: [], user: null}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INIT":
            state = {...state, blogs: action.data}
            break;
        case "CLEAR":
            state = {...state, blogs: []}
            break;
        case "SET_USER":
            state = {...state, user: action.data}
            break;
        case "LOGOUT_USER":
            state = {...state, user: null};
            window.localStorage.setItem("loggedUser", "");
            break;
        default:
            console.log("BLOG REDUCER", "DEFAULT", action.type)
    }

    return state;
}

export default mainReducer;