
export const setProducts = (data) => ({
    type: "SET_PRODUCTS",
    payload: data
})


export const selectProducts = product => ({
    type: "SELECT_PRODUCT",
    payload: product
})