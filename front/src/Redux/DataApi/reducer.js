
const initState = { products: [], selectedProduct: [] }

export const getDataReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":

            return {
                ...state,
                products: action.payload
            }

        case "SELECT_PRODUCT":
            return {
                ...state,
                selectedProduct: action.payload
            }

        default:
            return state;
    }

}
