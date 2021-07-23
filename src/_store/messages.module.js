import { messageService } from '../_services/message.service';

const state = {
    all: {}
};

const actions = {
    getById({ commit }, msg) {
        commit('getByIdRequest');

        messageService.getById(msg)
            .then(
                message => commit('getByIdSuccess', message),
                error => commit('getByIdFailure', error)
            );
    },

    createMessage({ commit }, msg) {
        commit('createMessageRequest');

        messageService.create(msg)
            .then(
                message => commit('createMessageSuccess', message),
                error => commit('createMessageFailure', error)
            );
    },

    updateMessage({ commit }, msg) {
        commit('updateMessageRequest');

        messageService.update(msg)
            .then(
                message => commit('updateMessageSuccess', message),
                error => commit('updateMessageFailure', error)
            );
    },

    getSenderMessages({ commit }, usr) {
        commit('getSenderMessagesRequest');

        messageService.getSenderMessages(usr)
            .then(
                messages => commit('getSenderMessagesSuccess', messages),
                error => commit('getSenderMessagesFailure', error)
            );
    },

    getReceiverMessages({ commit }, usr) {
        console.log("controller getting messages")
        commit('getReceiverMessagesRequest');

        messageService.getReceiverMessages(usr)
            .then(
                messages => commit('getReceiverMessagesSuccess', messages),
                error => commit('getReceiverMessagesFailure', error)
            );
    },

    getControllerMessages({ commit }, usr) {
        commit('getControllerMessagesRequest');

        messageService.getControllerMessages(usr)
            .then(
                messages => commit('getControllerMessagesSuccess', messages),
                error => commit('getControllerMessagesFailure', error)
            );
    },

    deleteMessage({ commit }, message) {
        commit('deleteMessageRequest', message);

        messageService.delete(message)
            .then(
                id => commit('deleteMessageSuccess', id),
                error => commit('deleteMessageFailure', { message, error: error.toString() })
            );
    }
};

const mutations = {
    getByIdRequest(state) {
        state.all = { loading: true };
    },
    getByIdSuccess(state, message) {
        state.all = { items: message };
    },
    getByIdFailure(state, error) {
        state.all = { error };
    },

    createMessageRequest(state) {
        state.all = { loading: true };
    },
    createMessageSuccess(state, message) {
        state.all = { success: message };
    },
    createMessageFailure(state, error) {
        state.all = { error };
    },

    updateMessageRequest(state) {
        state.all = { loading: true };
    },
    updateMessageSuccess(state, message) {
        state.all = { items: message };
    },
    updateMessageFailure(state, error) {
        state.all = { error };
    },

    getSenderMessagesRequest(state) {
        state.all = { loading: true };
    },
    getSenderMessagesSuccess(state, messages) {
        state.all = { items: messages };
    },
    getSenderMessagesFailure(state, error) {
        state.all = { error };
    },

    getReceiverMessagesRequest(state) {
        state.all = { loading: true };
    },
    getReceiverMessagesSuccess(state, messages) {
        state.all = { items: messages };
    },
    getReceiverMessagesFailure(state, error) {
        state.all = { error };
    },

    getControllerMessagesRequest(state) {
        state.all = { loading: true };
    },
    getControllerMessagesSuccess(state, messages) {
        state.all = { items: messages };
    },
    getControllerMessagesFailure(state, error) {
        state.all = { error };
    },

    deleteMessageRequest(state) {
        state.all = { loading: true };
    },
    deleteMessageSuccess(state, id) {
        // remove deleted user from state
        state.all = { items: id };
    },
    deleteMessageFailure(state,  error) {
        state.all = { error };
    }
};

export const messages = {
    namespaced: true,
    state,
    actions,
    mutations
};
