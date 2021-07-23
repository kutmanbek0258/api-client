import config from '../config.json';
import { authHeader } from '../_helpers';

export const messageService = {
    getById,
    getSenderMessages,
    getReceiverMessages,
    getControllerMessages,
    create,
    update,
    delete: _delete
};

function getSenderMessages() {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/messages/outbox`, requestOptions).then(handleResponse);
}

function getReceiverMessages() {
    console.log("service getting messages")
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/messages/inbox`, requestOptions).then(handleResponse);
}

function getControllerMessages() {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/messages/controlbox`, requestOptions).then(handleResponse);
}

function getById(message) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    return fetch(`${config.apiUrl}/messages/get_message`, requestOptions).then(handleResponse);
}

function create(message) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    return fetch(`${config.apiUrl}/messages/message`, requestOptions).then(handleResponse);
}

function update(message) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    return fetch(`${config.apiUrl}/messages/accept`, requestOptions).then(handleResponse);
}

function _delete(message) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    return fetch(`${config.apiUrl}/messages/remove_message`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}