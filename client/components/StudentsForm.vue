<template>
    <div>
      <input v-model="form.name" type="text" placeholder="Имя" @input="validateName"/>
      <p>{{errors.nameError}}</p>
      <input v-model="form.surname" type="text" placeholder="Фамилия" @input="validateSurname"/>
      <p>{{errors.surnameError}}</p>
      <input v-model="form.birthdate" type="date" placeholder="Дата рождения" @input="validateBirthdate"/>
      <p>{{errors.birthdateError}}</p>
      <input v-model="form.group" type="text" placeholder="Группа" @input="validateGroup"/>
      <p>{{errors.groupError}}</p>
      <button @click="handleAddStudent">Добавить</button>
    </div>
</template>
<script>
import moment from 'moment';

export default {
  data() {
    const { state } = this.$store;
    return {
      maxId: 0,
      form: state.studentForm,
      errors: {
        nameError: null,
        surnameError: null,
        birthdateError: null,
        groupError: null,
      },
    }
  },
  props: {
    // form: {
    //   type: Array,
    //   default: [],
    //   required: true,
    // },
  },
  methods: {
    handleAddStudent() {
      if (this.validateName()
        && this.validateSurname()
        && this.validateBirthdate()
        && this.validateGroup()) {
        this.maxId++;
        const form = {...this.form, id: this.maxId};
        console.log('form', form);
        this.$store.commit('addStudent', form);
      }
    },
    validateName() {
      if (!/^[а-яё]+$/i.test(this.form.name)) {
        this.errors.nameError = 'Укажите корректное имя';
        // return false;
      }
      this.errors.nameError = null;
      return true;
    },

    validateSurname() {
      if (!/^[а-яё]+$/i.test(this.form.surname)) {
        this.errors.surnameError = 'Укажите корректную фамилию';
        // return false;
      }
      this.errors.surnameError = null;
      return true;
    },

    validateBirthdate() {
      const date = moment(this.form.birthdate, 'YYYY-MM-DD', true);
      if (!date.isValid() || date.isAfter()) {
        this.errors.birthdateError = 'Укажите корректную дату рождения';
        //return false;
      }
      this.errors.birthdateError = null;
      return true;
    },

    validateGroup() {
      if (!/^[А-ЯЁ]{2,4}[-]\d*[-]\d{2}$/.test(this.form.group)) {
        this.errors.groupError = 'Укажите корректную группу, например "ИВТ-1-15"';
        // return false;
      }
      this.errors.groupError = null;
      return true;
    },
  },
}
</script>