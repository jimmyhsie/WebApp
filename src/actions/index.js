import {pointsRef, docRef, firestore} from '../config/config'
import { thisExpression } from '@babel/types'

export const Geo = (inputText) =>{
    return{
        type:'Geo',
        inputText,
        
    }
}

export const AhandleChange = (LayerId) => {
    return{
        type:'AhandleChange',
        LayerId
    }
  }
export const AupdateInputText=(inputText) => {
    return{
        type:'AupdateInputText',
        inputText
    }
}

export const handleName = (name) => {
    return{
        type:'handleName',
        name
    }
}

export const handleAddress = (address) => {
    return{
        type:'handleAddress',
        address
    }
}

export const handleCoordinate = (coordinate) => {
    return{
        type:'handleCoordinate',
        coordinate
    }
}

export const handlePhoto = (photo) => {
    return{
        type:'handlePhoto',
        photo
    }
}

export const handleRemark = (remark) => {
    return{
        type:'handleRemark',
        remark
    }
}

export const handleSubmit = (fdata) => {
    return{
        type:'handleSubmit',
        fdata
    }
}

export const AddGroupMarkers = (latlng) => {
    return{
        type:'AddGroupMarkers',
        latlng
    }
}

export const ulonclick = (id) => {
    return{
        type:'ulonclick',
        id
    }
}

export const getmoveend = e => {
    return{
        type:"getmoveend",
        e
    }
}
export const pointer = (data) => {
    return{
        type:'pointer',
        data
    }
}

export const removeLi = (layer) => {
    return{
        type: 'removeLi',
        layer
    }
}

export const mapcursor = (cursortype) => {
    return{
        type: 'mapcursor',
        cursortype
    }
}

export const toolstate = (toolstate) => {
    return{
        type: 'toolstate',
        toolstate
    }
}
//加入圖層
export const DispatchAddMarker = (layer) => {
    console.log(layer)
    //path.join(path_a, path_b)
    let path = "points/"+layer._leaflet_id
    
    firestore.doc(path).set({coordinate:[layer._latlng.lng,layer._latlng.lat],type:"marker"}).then(()=>{
        console.log('save')
    }).catch(error=>{
        console.log(error)
    })
    return{
        type: 'DispatchAddMarker',
        layer,
        
    }
}
export const DispatchAddCircle = (layer) => {
    return{
        type: 'DispatchAddCircle',
        layer,
        
    }
}

export const DispatchAddRectangle = (layer,zoom) => {
    return{
        type: 'DispatchAddRectangle',
        layer,
        zoom
    }
}

export const DispatchAddPolyline = (layer,zoom) => {
    return{
        type: 'DispatchAddPolyline',
        layer,
        zoom
    }
}

export const DispatchAddPolygon = (layer,zoom) => {
    return{
        type: 'DispatchAddPolygon',
        layer,
        zoom
    }
}

export const GoogleMarkerToLayer = (marker) => {
    return{
        type: 'GoogleMarkerToLayer',
        marker,
    }
}

//修改圖層
export const EditFeature = (layer,zoom) => {
    return{
        type: 'EditFeature',
        layer,
        zoom
    }
}

//刪除圖層

export const DeleteFeature = (layer,zoom) => {
    return{
        type: 'DeleteFeature',
        layer,
        zoom
    }
}
export const getFeatureID = (id) => {
    return{
        type: 'getFeatureID',
        id
    }
}

//API Async

export const addToDo = newToDo => async dispatch => {
   pointsRef.push().set(newToDo);
};
export const completeToDo = completeToDo => async dispatch => {
   pointsRef.child(completeToDo).remove();
};
export const fetchToDos = () => async dispatch => {
   pointsRef.on("value", snapshot => {
    dispatch({
      type: 'FETCH_TODOS',
      payload: snapshot.val()
    });
  });
};

//madalactions

export const modalstate = mstate => {
    return{
        type: "modalstate",
        mstate
    }
}






