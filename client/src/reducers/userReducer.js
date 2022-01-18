const SET_USER = "SET_USER"
const SET_LOGOUT = "SET_LOGOUT"

const defaultState = {
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.playload.user,
                isAuth: true
            }
        case SET_LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }

        default:
            return state;
    }
}

export const setUser = user => ({type: SET_USER, playload: user})
export const logout = () => ({type: SET_LOGOUT})