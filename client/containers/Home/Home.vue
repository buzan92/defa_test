<template>
  <div class="page">
    <StudentsForm/>
    <hr>
    <StudentsTable
      :students="students"/>
  </div>
</template>

<script>
import StudentsTable from '../../components/StudentsTable';
import StudentsForm from '../../components/StudentsForm';

export default {
  data() {
    const { state } = this.$store;
    return {
      isUpdate: false,
      students: state.students,
    };
  },
  components: {
    StudentsTable,
    StudentsForm,
  },

  methods: {

  },
};
</script>
