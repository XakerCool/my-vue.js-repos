// Вам нужно написать глобальный хук beforeEach у роутера
// которая будет проверять:
// Куда мы идем, и если мы идем НЕ на страницу Логина, то проверять пользователя:
// Сначало в store, если его там нет, то в localStorage
// И если в localStorage есть user, то вызывать мутацию SET_USER
// Но если и в localStorage нету user, то делать редирект на страницу Auth


import store from '@/store'; // нужно было импортировать store, так как доступа к this нет, точнее this был undefined

router.beforeEach((to, from, next) => {
    if (to.name !=="AuthPage") {
      if (!store.state.user) {
        console.log(JSON.parse(localStorage.getItem("user")));
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          alert("Пользователь не авторизован, вы будете перенаправлены на страницу авторизации");
          next({ path: '/auth' });
        } else {
          store.commit('SET_USER', user);
        }
      }
      next();
    }
    next();
  });