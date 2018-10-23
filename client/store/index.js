import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  maxId: 0,
  isEdit: false,
  isFormShow: false,
  studentForm: { isSelected: false },
  students: [],
};
const mutations = {
  addStudent(state, payload) {
    state.maxId++;
    state.students.push({...payload, id: state.maxId });
    state.studentForm = { isSelected: false };
  },
  updateStudent(state, payload) {
    state.isEdit = false;
    state.studentForm = { isSelected: false };
    const index = state.students.findIndex(item => item.id === payload.id);
    if (index !== -1) Vue.set(state.students, index, payload);;
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
  editStudent(state, payload) {
    state.isEdit = true;
    state.studentForm = { ...state.studentForm, ...payload };
  },
  showForm(state, payload) {
    state.isFormShow = payload;
  },
};
const actions   = { };

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
