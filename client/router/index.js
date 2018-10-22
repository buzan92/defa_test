import Vue    from 'vue';
import Router from 'vue-router';
import HomePage   from '../containers/Home/HomePage';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: HomePage
    }
  ]
});
