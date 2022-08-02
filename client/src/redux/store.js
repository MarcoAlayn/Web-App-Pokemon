//aqui creamos el store , agregamos el redux tools y el middleware
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import thunk from "redux-thunk"
import rootReducer from "./reducer"


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store