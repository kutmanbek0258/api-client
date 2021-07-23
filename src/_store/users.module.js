import { userService } from '../_services/user.service';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    getByKeyword({commit}, id) {
        commit('getByKeywordRequest');

        userService.getByKeyword(id)
            .then(
                users => commit('getByKeywordSuccess', users),
                error => commit('getByKeywordFailure', error)
            )
    },

    getByKeywordController({commit}, id) {
        commit('getByKeywordControllerRequest');

        userService.getByKeyword(id)
            .then(
                users => commit('getByKeywordControllerSuccess', users),
                error => commit('getByKeywordControllerFailure', error)
            )
    },

    getByKeywordReceiver({commit}, id) {
        commit('getByKeywordReceiverRequest');

        userService.getByKeyword(id)
            .then(
                users => commit('getByKeywordReceiverSuccess', users),
                error => commit('getByKeywordReceiverFailure', error)
            )
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', user.id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },

    getByKeywordRequest(state) {
        state.all = { loadingKeyword: true };
    },
    getByKeywordSuccess(state, users) {
        state.all = { itemsKeyword: users };
    },
    getByKeywordFailure(state, error) {
        state.all = { error };
    },

    getByKeywordControllerRequest(state) {
        state.all = { loadingKeywordController: true };
    },
    getByKeywordControllerSuccess(state, users) {
        state.all = { itemsKeywordController: users };
    },
    getByKeywordControllerFailure(state, error) {
        state.all = { error };
    },

    getByKeywordReceiverRequest(state) {
        state.all = { loadingKeywordReceiver: true };
    },
    getByKeywordReceiverSuccess(state, users) {
        state.all = { itemsKeywordReceiver: users };
    },
    getByKeywordReceiverFailure(state, error) {
        state.all = { error };
    },

    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                console.log(deleting)
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
