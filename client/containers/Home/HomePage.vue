<template>
  <div class="page">
    <button v-if="$store.state.isEdit" @click="toggleModal" class="js-toggle">Изменить</button>
    <button v-if="!$store.state.isEdit" @click="toggleModal" class="js-toggle">Добавить</button>
    <StudentsTable
      :students="students" />
    <div
      v-if="isShowForm"
      @click="toggleModal($event)"
      class="student-modal js-toggle">
      <div class="student-modal__content">
        <span
          class="student-modal__close js-toggle"
          @click="toggleModal">&times;</span>
        <StudentsForm />
      </div>
    </div>
  </div>
</template>

<script>
import StudentsTable from '../../components/StudentsTable';
import StudentsForm from '../../components/StudentsForm';

export default {
  data() {
    const { state } = this.$store;
    return {
      isShowForm: false,
      isUpdate: false,
      students: state.students,
    };
  },
  components: {
    StudentsTable,
    StudentsForm,
  },

  methods: {
    toggleModal(e) {
      e.stopPropagation();
      const { className } = e.target;
      if (className.indexOf('js-toggle') !== -1) {
        this.isShowForm = !this.isShowForm;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.student-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  &__close {
    cursor: pointer;
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    padding: 0 0 5px 5px;
    display: flex;
    justify-content: flex-end;
  }
  &__content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    max-width: 300px;
    display: flex;
    flex-direction: column;
  }
}
</style>
