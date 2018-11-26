import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import Home from '../views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      title: 'Home',
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
    },
    {
      path: '/extras',
      name: 'extras',
      component: () => import('../views/Extras.vue'),
    },
    {
      //  path: '/profile/:id',
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/Events.vue'),
    },
    {
      path: '/invision',
      name: 'invision',
      component: () => import('../views/Invision.vue'),
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/Teams.vue'),
    },
    {
      path: '/myabsences',
      name: 'myabsences',
      component: () => import('../views/MyAbsences.vue'),
    },
    {
      path: '/absences',
      name: 'absences',
      component: () => import('../views/Absences.vue'),
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: () => import('../views/ThankYou.vue'),
    },
    {
      path: '/handover/teamleader',
      name: 'handover',
      component: () => import('../views/Handover.vue'),
    },
    {
      path: '/handover/tickets',
      name: 'handovertickets',
      component: () => import('../views/HandoverTickets.vue'),
    },
    {
      path: '/checklist/:id',
      name: 'checklist',
      component: () => import('../views/Checklist.vue'),
      props: true,
      beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id)) || to.params.id === 'current';
        next(isValidId);
      },
    },
    {
      path: '/checklists',
      name: 'checklists',
      component: () => import('../views/Checklists.vue'),
    },
    {
      path: '/checks',
      name: 'checks',
      component: () => import('../views/Checks.vue'),
    },
    {
      path: '/manage/users',
      name: 'manageUsers',
      component: () => import('../views/ManageUsers.vue'),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/manage/teams',
      name: 'manageTeams',
      component: () => import('../views/ManageTeams.vue'),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/manage/roles',
      name: 'manageRoles',
      component: () => import('../views/ManageRoles.vue'),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/manage/user/:id',
      name: 'manageUser',
      component: () => import('../views/ManageUser.vue'),
      props: true,
      beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id));
        next(isValidId);
      },
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/manage/team/:id/',
      name: 'editTeam',
      component: () => import('../views/TeamEdit.vue'),
      props: (route) => {
        const teamId = Number.parseInt(route.params.id, 10);
        if (Number.isNaN(teamId)) {
          return 0;
        }
        return { id: teamId };
      },
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/manage/role/:id/',
      name: 'manageRole',
      component: () => import('../views/ManageRole.vue'),
      props: true,
      beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id));
        next(isValidId);
      },
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/manage/shifts/new',
      name: 'ShiftPattern',
      component: () => import('../views/ShiftPattern.vue'),
    },
    {
      path: '/manage/shifts/generate',
      name: 'ShiftGenerator',
      component: () => import('../views/GenerateShifts.vue'),
    },
    {
      path: '/manage/shifts',
      name: 'shifts',
      component: () => import('../views/Shifts.vue'),
    },
    {
      path: '/scores',
      name: 'scores',
      component: () => import('../views/QAScores.vue'),
    },
    {
      path: '*',
      name: 'default',
      component: () => import('../views/Error.vue'),
    },
  ],
});

function getUserState() {
  return new Promise((resolve) => {
    if (store.state.users.currentUser === null) {
      const unwatch = store.watch(
        () => store.state.users.currentUser,
        (value) => {
          unwatch();
          resolve(value);
        },
      );
    } else {
      resolve(store.state.users.currentUser);
    }
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // You can use store variable here to access globalError or commit mutation
    const user = await getUserState();
    if (!user) {
      next('/nouser');
    } else if (!user.isAdmin) {
      next('/admin');
    } else {
      next();
    }
  }
  await next();
});

export default router;

