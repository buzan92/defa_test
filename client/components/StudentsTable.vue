<template>
<div>
  <input type="text" @input="tableSearch($event, 'surname')" placeholder="Поиск по фамилии">
  <table>
    <tr>
      <th></th>
      <th>Имя</th>
      <th>Фамилия <a href="#" @click="tableSort('surname')">^</a></th>
      <th>Возраст
        <a href="#" @click="tableSort('birthdate')">^</a>
        <select @change="tableFilter($event, 'birthdate')" ref="selectFilter">
          <option v-for="option in prepareFilter('birthdate')" v-bind:value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </th>
      <th>Группа
        <select @change="tableFilter($event, 'group')" ref="selectFilter">
          <option v-for="option in prepareFilter('group')" v-bind:value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </th>
      <th></th>
    </tr>
    <tr v-for="student in prepare(students)" :key="student.id" @click="selectRow($event, student.id)">
      <td><input type="checkbox" v-model="student.isSelected"/></td>
      <td>{{student.name}}</td>
      <td>{{student.surname}}</td>
      <td>{{calcAge(student.birthdate)}}</td>
      <td>{{student.group}}</td>
      <td>
        <button @click="editRow(student)">Изменить</button>
      </td>
    </tr>
  </table>
  <button @click="removeStudents">Удалить</button>
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
  props: {
    students: {
      type: Array,
      default: [],
      required: true,
    },
  },

  methods: {
    prepare(data) {
      console.log('prepare fire');
      let res = [...data];
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
        res = res.filter(item => item[field].search(query) !== -1);
      }
      if (this.order.field) {
        const { field, by } = this.order;
        res = by === 'asc' ? sortByKey(res, field) : sortByKey(res, field).reverse();
      }
      return res;
    },
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
      console.log('student', student);
      this.$store.commit('editStudent', student);
      // this.form = { ...this.form, ...student };
    },
    removeStudents() {
      this.$store.commit('removeStudents');
    },
    tableSearch(e, field) {
      this.search = { field, query: e.target.value };
    },
    prepareFilter(field) {
      const distinct = [...new Set(this.$props.students.map(item => item[field]))].sort();
      if (field === 'birthdate') {
        return ['', ...distinct.map(item => this.calcAge(item))];
      }
      return ['', ...distinct];
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
    tableSort(field) {
      if (this.order.field === field) {
        this.order.by = this.order.by === 'asc' ? 'desc' : 'asc';
      } else {
        this.order.by = 'asc';
      }
      this.order.field = field;
    },

  }
}
</script>
