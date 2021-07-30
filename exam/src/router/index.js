import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import AddTodo from '@/views/AddTodo.vue';
import TodoDetails from '@/views/TodoDetails.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
    meta: {
      requireAuth: true
    },
  },
  {
    path: "/add",
    name: "AddPage",
    component: AddTodo,
  },
  {
    path: "/todo/:id",
    name: "TodoDetailsPage",
    component: TodoDetails,
  },
  {
    path: "*",
    name: "404",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.name !=="AuthPage") {
//     if (!store.state.user) {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         alert("Пользователь не авторизован, вы будете перенаправлены на страницу авторизации");
//         next({ path: '/auth' });
//       } else {
//         store.commit('SET_USER', user);
//       }
//     }
//     next();
//   }
//   next();
// });


export default router;
