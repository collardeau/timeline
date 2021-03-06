
export default {

  firebase: {
    FIREBASE_HOST: "https://time-line.firebaseio.com/",
    PUBLIC_INDEX: "timeline-public-index"
  },
  EMPTY_STATE: {
    app: this,
    route: '',
    routeParams: [],
    user: {
      username: "anonymous",
      bookmarks: []
    },
    auth: null,
    menuIsOpen: false,
    timelines: [],
    timeline: {
      dots: [],
      desc: 'timeline desc',
      name: "the legacy"
    }
  },

    FIREBASE_HOST: "https://time-line.firebaseio.com/",

    CHANGE_TIMELINES: "CHANGE_TIMELINES",
    NOTIFY_USER: "NOTIFY_USER",
    FILTER_TIMELINES: "FILTER_TIMELINES",
    CHANGE_PUBLIC_TIMELINES: "CHANGE_PUBLIC_TIMELINES",
    CHANGE_USER_TIMELINES: "CHANGE_USER_TIMELINES",
    CHANGE_BOOKMARK_TIMELINES: "CHANGE_BOOKMAR_TIMELINES",
    KILL_TL_SYNC: "KILL_TL_SYNC",
    EMPTY_USER_DATA: "EMPTY_USER_DATA",
    ADD_TIMELINE: "ADD_TIMELINE",
    LOAD_TIMELINE: "LOAD_TIMELINE",
    EDIT_TIMELINE: "EDIT_TIMELINE",
    ADD_DOT: "ADD_DOT",
    REMOVE_DOT: "REMOVE_DOT",

    CHANGE_BM_COUNT: 'CHANGE_BM_COUNT',
    KILL_BM_SYNC: 'KILL_BM_SYNC',
    CHANGE_BM_STATUS: 'CHANGE_BM_STATUS',
    CHANGE_BOOKMARKS: "CHANGE_BOOKMARKS",
    CHANGE_TIMELINE_BM: "CHANGE_TIMELINE_BM",
    TOGGLE_TIMELINE_BOOKMARK: "TOGGLE_TIMELINE_BOOKMARK",

    LOGIN_USER: "LOGIN_USER",
    CHANGE_USER: "CHANGE_USER",
    LOGOUT_USER: "LOGOUT_USER"
};

