import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  studentForm: {
    id: 0,
    name: '',
    surname: '',
    birthdate: '',
    group: '',
    isSelected: false,
  },
  students: [],
};
const mutations = {
  addStudent({ students }, payload) {
    students.push(payload);
  },
  selectStudent({ students }, payload) {
    const idx = students.findIndex(item => item.id === payload);
    students[idx].isSelected = !students[idx].isSelected;
  },
  removeStudents({ students }) {
    for (let idx = students.length-1; idx >= 0; idx--) {
      if (students[idx].isSelected === true) {
        students.splice(idx, 1);
      }
    }
  },
  editStudent({ studentForm }, payload) {
    return {...studentForm, ...payload };
  }
};
const actions   = { };

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
