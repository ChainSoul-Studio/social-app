const initialState = {
    currentUser: null,
    // Add more initial state variables
}

// Store the state and update it when action is received
export const user = (state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}