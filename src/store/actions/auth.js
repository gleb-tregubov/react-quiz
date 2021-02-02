import axios from 'axios'
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes'

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenexpirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function auth(email, password, isLogin) {
    return async dispatch => {
        
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5Z1EMWplI87aYAxoG8mIX0hFgjM5n5bM'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5Z1EMWplI87aYAxoG8mIX0hFgjM5n5bM'
        }

        const response = await axios.post(url, authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expireIn * 1000)

        localStorage.setItem('token', data.idtoken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('tokenexpirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
    }
}