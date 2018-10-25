import * as actionsType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalprice: 2,
    error: false
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
                totalprice: state.totalprice + INGREDIENT_PRICES[action.ingredientName],
            };
        case actionsType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalprice: state.totalprice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionsType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionsType.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            };
        default :
            return state;
    }
}

export default reducer;