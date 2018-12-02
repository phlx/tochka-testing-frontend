import Vue from 'vue'
import Vuex from 'vuex'
import backend from './services/backend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: {}
  },

  mutations: {
    updateTasks (state, tasks) {
      tasks.map(task => {
        if (state.tasks[task.id]) {
          Object.keys(task).map(attribute => (state.tasks[task.id][attribute] = task[attribute]))
        } else {
          state.tasks[task.id] = task
        }
        state.tasks[task.id].index = ['title', 'description', 'author', 'status']
          .map(attribute => state.tasks[task.id][attribute])
          .join(' ')
          .toLowerCase()
      })
      return state.tasks
    }
  },

  actions: {
    loadTask ({ commit, state }, id) {
      console.info('[store] action loadTask', { id })
      if (!state.tasks[id] || !state.tasks[id].description) {
        return backend
          .getTask(id)
          .then(task => commit('updateTasks', [task]))
          .then(() => state.tasks[id])
      }
      return state.tasks[id]
    },

    loadAll ({ commit, state }, fields = ['id', 'title', 'date']) {
      console.info('[store] action loadAll', { fields })
      return backend
        .getAllTasks(fields)
        .then(tasks => commit('updateTasks', tasks))
        .then(() => Object.values(state.tasks))
    }
  }
})
