<template>
<div class="table-wrapper">
  <input
    type="text"
    @input="tableSearch($event, 'surname')"
    placeholder="Поиск по фамилии">
  <div class="table">
    <div class="table__row table__header">
      <div class="table__row--item"></div>
      <div class="table__row--item">Имя</div>
      <div class="table__row--item">Фамилия
        <span
          class="table__sort"
          :class="{'table__sort-asc': isAsc('surname'), 'table__sort-desc': isDesc('surname')}"
          @click="tableSort('surname')">&gt;
        </span>
      </div>
      <div class="table__row--item">Возраст
        <span
          class="table__sort"
          :class="{'table__sort-asc': isAsc('birthdate'), 'table__sort-desc': isDesc('birthdate')}"
          @click="tableSort('birthdate')">&gt;
        </span>
        <select @change="tableFilter($event, 'birthdate')" ref="selectFilter">
          <option v-for="option in prepareFilter('birthdate')" v-bind:value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="table__row--item">Группа
        <select @change="tableFilter($event, 'group')" ref="selectFilter">
          <option v-for="option in prepareFilter('group')" v-bind:value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="table__row--item"></div>
    </div>
    <transition-group name="fade">
    <div v-for="student in processedStudents"
      :key="student.id"
      @click="selectRow($event, student.id)"
      class="table__row" :class="{table__selected: student.isSelected}">
      <div class="table__row--item"><input type="checkbox" v-model="student.isSelected"/></div>
      <div class="table__row--item">{{student.name}}</div>
      <div class="table__row--item">{{student.surname}}</div>
      <div class="table__row--item">{{calcAge(student.birthdate)}}</div>
      <div class="table__row--item">{{student.group}}</div>
      <div class="table__row--item">
        <button @click="editRow(student)">Изменить</button>
      </div>
    </div>
    </transition-group>
  </div>
  <button @click="removeStudents">Удалить выбранные</button>
</div>
</template>

<script>
import moment from 'moment';
import { declOfNum, sortByKey } from '../helpers';

export default {
  data() {
    return {
      filter: [],
      search: {
        field: null,
        query: ''
      },
      order: {
        field: null,
        by: 'asc',
      },
    }
  },
  computed: {
    processedStudents() {
      let res = [...this.$store.state.students];
      this.filter.forEach(filter => {
        if (filter.value !== '') {
          const { field, value } = filter;
          if (field === 'birthdate') {
            res = res.filter(item => this.calcAge(item[field]) === value);
          } else {
            res = res.filter(item => item[field] === value);
          }
        }
      });
      if (this.search.query !== '') {
        const { field, query } = this.search;
        res = res.filter(item => item[field].toUpperCase().search(query.toUpperCase()) !== -1);
      }
      if (this.order.field) {
        const { field, by } = this.order;
        res = by === 'asc' ? sortByKey(res, field) : sortByKey(res, field).reverse();
      }
      return res;
    },
  },
  methods: {
    calcAge(birthdate) {
      const age = moment().diff(birthdate, 'years');
      return `${age} ${declOfNum(age, ['год', 'года', 'лет'])}`;
    },
    selectRow(e, id) {
      if (e.target.type === 'submit') {
        return;
      }
      this.$store.commit('selectStudent', id);
    },
    editRow(student) {
      this.$store.commit('editStudent', student);
    },
    removeStudents() {
      this.$store.commit('removeStudents');
    },
    tableSearch(e, field) {
      this.search = { field, query: e.target.value };
    },
    prepareFilter(field) {
      if (field === 'birthdate') {
        return ['', ...new Set(this.$store.state.students.map(item => this.calcAge(item[field])))].sort();
      }
      return ['', ...new Set(this.$store.state.students.map(item => item[field]))].sort();
    },
    tableFilter(e, field) {
      this.filter.forEach(filter => {
        if (filter.field === field) {
          filter.value = e.target.value;
          return;
        }
      });
      this.filter.push({ field, value: e.target.value });
    },
    isAsc(field) {
      return (this.order.field === field && this.order.by === 'asc');
    },
    isDesc(field) {
      return (this.order.field === field && this.order.by === 'desc');
    },
    tableSort(field) {
      if (this.order.field === field) {
        this.order.by = this.order.by === 'asc' ? 'desc' : 'asc';
      } else {
        this.order.by = 'asc';
      }
      this.order.field = field;
    },
  },
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
}
.table {
  $light-color: #ffffff;
  $gray-color: #d3d3d3;
  $yellow-color: #fff675;
  $dark-color: #00255e;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border: 1px solid $gray-color;
  color: $dark-color;
  box-shadow: 5px 5px 2px -3px #777;
  max-width: 1024px;

  &__header {
    background-color: $gray-color !important;
    font-weight: 600;
    select {
      margin: 0 5px;
      min-width: 50px;
    }
  }
  &__sort {
    font-size: 20px;
    transform: rotate(90deg);
    margin: 0 5px;
    cursor: pointer;
    color: $light-color;
    transition: all 0.3s linear;
    &-asc {
      color: $dark-color;
    }
    &-desc {
      transform: rotate(270deg);
      color: $dark-color;
    }
  }
  &__selected {
    color: $light-color !important;
    background-color: $dark-color !important;
    button {
      color: #00255e;
      background-color: #fff;
    }
  }
  &__row {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    line-height: 1.8;
    &:nth-of-type(even) {
      background-color: $gray-color;
    }
    &:nth-of-type(odd) {
      background-color: $light-color;
    }
    &:hover {
      background-color: $yellow-color;
    }
    &--item {
      display: flex;
      flex-flow: row nowrap;
      flex-grow: 1;
      flex-basis: 0;
      align-items: center;
      word-break: break-word;
      padding: 2px;
      text-align: center;
    }
  }
  input {
    min-width: 30px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
}
</style>
