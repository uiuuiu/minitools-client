import { AnyAction } from 'redux';
import { actions } from '../apis/shortLinkApi';

interface shortLinkData {
  id: number;
  url: string;
  title: string;
  url_string: string;
  description: string;
  tag: string;
  active: boolean;
}

const initialState = {
  shortLinks: [],
  shortLink: null,
  redirectLoading: false,
  paginationOpts: {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10", "25", "50", "100", "200"],
    total: 0
  },
  query: {}
}

// Use the initialState as a default value
export default function authReducer(state = initialState, action: AnyAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'shortLink/loading':
      return {
        ...state,
        redirectLoading: action.data
      }

    case actions.SHORTLINK_LIST:
      let paginationOpts = { ...state.paginationOpts }
      if (action.meta) {
        paginationOpts = {
          ...paginationOpts,
          current: action.meta["current_page"],
          total: action.meta["total_count"],
          pageSize: parseInt(localStorage.getItem('limit') || '') || paginationOpts.pageSize
        }
      } else {
        paginationOpts = {
          ...paginationOpts,
          pageSize: 0
        }
      }

      return {
        ...state,
        paginationOpts: paginationOpts,
        shortLinks: action.data
      }
    case actions.SHORTLINK_REDIRECT:
      return {
        ...state,
        shortLink: action.data
      }
    case actions.SHORTLINK_CREATE:
      return {
        ...state,
        shortLink: action.data
      }
    case actions.PUBLIC_SHORTLINK_CREATE:
      let localShortLinks = JSON.parse(localStorage.getItem("localShortLinks") || JSON.stringify([]));
      localShortLinks.push(action.data);
      localStorage.setItem("localShortLinks", JSON.stringify(localShortLinks));
      return {
        ...state,
        shortLink: action.data
      }
    case actions.SHORTLINK_ACTIVE:
      const newShortLinks = state.shortLinks.map((sl: shortLinkData) => sl.id === action.data.id ? action.data : sl)

      return {
        ...state,
        shortLinks: newShortLinks
      }
    case actions.SHORTLINK_SYNC:
      localStorage.removeItem("localShortedLinks");
      return state
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}