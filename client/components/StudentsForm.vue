<template>
    <div class="student-form">
      <p class="student-form__label">Имя</p>
      <input v-model="form.name" type="text" @input="validateName"/>
      <p class="student-form__error">{{errors.nameError}}</p>
      <p class="student-form__label">Фамилия</p>
      <input v-model="form.surname" type="text" @input="validateSurname"/>
      <p class="student-form__error">{{errors.surnameError}}</p>
      <p class="student-form__label">Дата рождения</p>
      <input v-model="form.birthdate" type="date" @input="validateBirthdate"/>
      <p class="student-form__error">{{errors.birthdateError}}</p>
      <p class="student-form__label">Группа</p>
      <input v-model="form.group" type="text" @input="validateGroup"/>
      <p class="student-form__error">{{errors.groupError}}</p>
      <button v-if="$store.state.isEdit" @click="handleUpdateStudent">Изменить</button>
      <button v-if="!$store.state.isEdit" @click="handleAddStudent">Добавить</button>
    </div>
</template>
<script>
import moment from 'moment';

export default {
  data() {
    return {
      errors: {
        nameError: null,
        surnameError: null,
        birthdateError: null,
        groupError: null,
      },
    }
  },
  computed: {
    form: {
      get() {
        return this.$store.state.studentForm;
      },
    }
  },

  methods: {
    handleAddStudent() {
      if (this.validateForm()) {
        this.$store.commit('addStudent', this.form);
      }
    },
    handleUpdateStudent() {
      if (this.validateForm()) {
        this.$store.commit('updateStudent', this.form);
      }
    },
    validateForm() {
      return this.validateName()
        && this.validateSurname()
        && this.validateBirthdate()
        && this.validateGroup();
    },
    validateName() {
      if (!/^[а-яё]+$/i.test(this.form.name)) {
        this.errors.nameError = 'Укажите корректное имя';
        return false;
      }
      this.errors.nameError = null;
      return true;
    },

    validateSurname() {
      if (!/^[а-яё]+$/i.test(this.form.surname)) {
        this.errors.surnameError = 'Укажите корректную фамилию';
        return false;
      }
      this.errors.surnameError = null;
      return true;
    },

    validateBirthdate() {
      const date = moment(this.form.birthdate, 'YYYY-MM-DD', true);
      if (!date.isValid() || date.isAfter()) {
        this.errors.birthdateError = 'Укажите корректную дату рождения';
        return false;
      }
      this.errors.birthdateError = null;
      return true;
    },

    validateGroup() {
      if (!/^[А-ЯЁ]{2,4}[-]\d*[-]\d{2}$/.test(this.form.group)) {
        this.errors.groupError = 'Укажите корректную группу, например "ИВТ-1-15"';
        return false;
      }
      this.errors.groupError = null;
      return true;
    },
  },
}
</script>

<style lang="scss" scoped>
.student-form {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  &__label {
    margin: 0;
  }
  &__error {
    height: 10px;
    color: #ff0000;
    font-size: 13px;
    margin: 0 0 10px 0;
  }
}
</style>
