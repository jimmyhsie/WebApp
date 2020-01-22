
const apiR = (state , action) => {
    
  if (action.type === "modalstate"){
    //console.log(state.modalstate)
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
  }else if (action.type === "blogmodalstate"){
    //console.log(state.blogmodalstate)
    if(state.blogmodalstate === false){
      return{
        ...state,
        blogmodalstate: true
      }
    }else{
      return{
        ...state,
        blogmodalstate: false
      }
    }
  }
  else if (action.type === "pagestate"){
    //console.log(state.blogmodalstate)
    if(state.pagestate === false){
      return{
        ...state,
        pagestate: true
      }
    }else{
      return{
        ...state,
        pagestate: false
      }
    }
  }
        return state
    
  }

export default apiR

