import * as actionsType from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalprice: 2
}

const INGREDIENT_PRICES = {
    salad: 0.99,
    bacon: 0.59,
    cheese: 0.79,
    meat: 1.39
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionsType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalprice: state.totalprice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionsType.REEMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalprice: state.totalprice - INGREDIENT_PRICES[action.ingredientName]
            };
        default :
            return state;
    }
}

export default reducer;