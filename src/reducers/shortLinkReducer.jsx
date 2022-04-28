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
export default function authReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'shortLink/loading':
      return {
        ...state,
        redirectLoading: action.data
      }

    case 'shortLink/list':
      let paginationOpts = { ...state.paginationOpts }
      if (action.meta) {
        paginationOpts = {
          ...paginationOpts,
          current: action.meta["current_page"],
          total: action.meta["total_count"],
          pageSize: parseInt(localStorage.getItem('limit')) || paginationOpts.pageSize
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
    case 'shortLink/redirect':
      return {
        ...state,
        shortLink: action.data
      }
    case 'shortLink/create':
      return {
        ...state,
        shortLink: action.data
      }

    case 'shortLink/active':
      const newShortLinks = state.shortLinks.map( sl => sl.id === action.data.id ? action.data : sl )

      return {
        ...state,
        shortLinks: newShortLinks
      }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}