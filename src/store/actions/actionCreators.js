import * as actionTypes from './actionTypes'

export const login = (userId, user) => {
    return {
        type: actionTypes.USER_LOGIN,
        userId,
        user
    }
}

export const logout = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    }
}
export const relog = () => {
    return {
        type: actionTypes.USER_RELOG,
    }
}
