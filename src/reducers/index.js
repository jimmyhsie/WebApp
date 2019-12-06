import reduceReducers from 'reduce-reducers';
import MainR from './MainReducer'
import apiR from './ApiReducer'




const allReducers = reduceReducers(
    
    MainR,
    apiR,

    )

export default allReducers

