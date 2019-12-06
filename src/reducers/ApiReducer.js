
const apiR = (state , action) => {
    
  if (action.type === "modalstate"){
    console.log(state.modalstate)
    if(state.modalstate === false){
      return{
        ...state,
        modalstate: true
      }
    }else{
      return{
        ...state,
        modalstate: false
      }
    }
  }
        return state
    
  }

export default apiR

