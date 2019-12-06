import produce from "immer"

const initState = {
    ulstate : {
        OpenOrClose: [],
    },
    modalstate: false,
    GoogleSearchMarker:{position:[0,0],status:'',value:{}},
    lat: 25.0782884,
    lng: 121.6067442,
    MarkersPosition:{},
    zoom: 11,
    bounds:"",
    LayerId : 0,
    inputText:'',
    response: {},
    sfdata:{},
    promiseaddress:"",
    fdata:{
      layer:{},
      id:1,
      name:"",
      address:"",
      coordinate:"",
      photo:"",
      remark:"",

    },
    mapcursor:'',
    functiontype:'',
    toolsta: false,
    clickFeatureID: "",
}

const MainR = (state = initState, action) =>{
switch (action.type) {
    case 'Geo':
        
        return {
            ...state, inputText:'',
            lat: action.inputText.geometry.location.lat,
            lng: action.inputText.geometry.location.lng,
            zoom: 16,
            response: action.inputText,
            fdata: {...state.fdata, coordinate: [action.inputText.geometry.location.lat,action.inputText.geometry.location.lng]},
            GoogleSearchMarker:{...state.GoogleSearchMarker,value:action.inputText,position:[action.inputText.geometry.location.lat,action.inputText.geometry.location.lng], status:'OK'},
        }
        
        
    
    case 'AupdateInputText':
        return{
            ...state,inputText : action.inputText
        }
    case 'AhandleChange':
        
        return{
            ...state , LayerId: action.LayerId
        }
    
    case 'handleName':
        
        return{
            ...state , fdata: {...state.fdata, name: action.name}
        }

    case 'handleAddress':
        
        return{
            ...state , fdata: {...state.fdata, address: action.address}
        }
    
    case 'handleCoordinate':
        
        return{
            ...state , fdata: {...state.fdata, coordinate: [state.lat,state.lng]}
        }

    case 'handlePhoto':
        
        return{
            ...state , fdata: {...state.fdata, photo: action.photo}
        }

    case 'handleRemark':
        
        return{
            ...state , fdata: {...state.fdata, remark: action.remark}
        }
    
    case 'handleSubmit':
        //console.log(action.fdata)
        //let markers = state.MarkersPosition
        let idd = state.clickFeatureID
        
        //markers[idd] = action.fdata.coordinate
        const submitState = produce(state,draftState =>{
            draftState.sfdata[idd].name = action.fdata.name
            draftState.sfdata[idd].address = action.fdata.address
            draftState.sfdata[idd].photo = action.fdata.photo
            draftState.sfdata[idd].remark = action.fdata.remark
            

        })
        return submitState
    case 'getFeatureID':
        console.log(state.fdata,state.sfdata)
        const clearsubmitState = produce(state,draftState =>{
            
            draftState.fdata.name = ""
            draftState.fdata.address = state.sfdata[action.id].address
            draftState.fdata.photo = ""
            draftState.fdata.remark = ""

            draftState.clickFeatureID= action.id
        })
        return clearsubmitState
    case  'ulonclick': 
        //console.log(id)
        let deltaA = state.ulstate.OpenOrClose
        //console.log(deltaA)
        deltaA[action.id] = !state.ulstate.OpenOrClose[action.id]
        
        return{ 
            ...state,
            ulstate: {...state.ulstate,OpenOrClose:deltaA},
                

                
                
        }
    case 'getmoveend':
        //console.log(action.e.target._lastCenter)
        //console.log(state.lat)
        const getmoveend = produce(state, draftState => {
            if(!!action.e.target._lastCenter){
            draftState.zoom = action.e.target._animateToZoom
            draftState.lat = action.e.target._lastCenter.lat
            draftState.lng = action.e.target._lastCenter.lng
            }
        })
        return getmoveend
    case  'pointer': 
        //console.log(action.data.bounds)
        const TypeOfPoint = produce(state, draftState => {

            draftState.lat = action.data.coordinate[0]
            draftState.lng = action.data.coordinate[1]
            if(action.data.layertype === "marker"){
                draftState.zoom = action.data.zoom
            }else if(action.data.layertype === "circle"){
                draftState.zoom = action.data.zoom
            }else if(action.data.layertype === "polygon"){
                draftState.bounds = action.data.bounds
            }else if(action.data.layertype === "polyline"){
                draftState.bounds = action.data.bounds
            }else if(action.data.layertype === "rectangle"){
                draftState.bounds = action.data.bounds
            }
            
        })
    
        return TypeOfPoint
    case 'GoogleMarkerToLayer':
        let coor = state.GoogleSearchMarker.position
        return{
            ...state,
            MarkersPosition:{...state.MarkersPosition,coor},
            GoogleSearchMarker:{...state.GoogleSearchMarker, position:[0,0], status:'' ,value:{}}
        }

    case 'removeLi':
        
        return { 
            ...state,       
            MarkersPosition: {}
        }
          
    case 'mapcursor':
        console.log(action.cursortype)
        return{
            ...state,
            mapcursor: action.cursortype[0],
            functiontype:action.cursortype[1],
        }
    
    case 'toolstate':
            //console.log(action.toolstate)
        return{
            ...state,
            toolsta: !action.toolstate,
        }    
// 加入圖層
    case 'DispatchAddMarker':
        
        let Markerid = action.layer._leaflet_id;
        let MarkernewLayer={}
        
        MarkernewLayer[Markerid] ={
            layer:action.layer,
            layertype:"marker",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [action.layer._latlng.lat,action.layer._latlng.lng],
            id:action.layer._leaflet_id,
            zoom: 16,
        }
        //console.log(MarkernewLayer)   
                    
        return {
            ...state, 
            lat: action.layer._latlng.lat,
            lng: action.layer._latlng.lng,
            zoom: 16,
            sfdata: {...state.sfdata, ...MarkernewLayer},
              
        }
    case 'DispatchAddRectangle':
        console.log(action.layer._latlngs[0])
        let rectangleid = action.layer._leaflet_id;
        let rectanglenewLayer={}
        let rectanglebounds = action.layer._bounds
        let xposition = (rectanglebounds._northEast.lat+rectanglebounds._southWest.lat)/2
        let yposition = (rectanglebounds._northEast.lng+rectanglebounds._southWest.lng)/2
        //for ( let i = 0; i < action.layer._latlngs[0].length; i++) { xposition += action.layer._latlngs[0][i].lat}
        //xposition = xposition/4
        rectanglenewLayer[rectangleid] ={
            layer:action.layer,
            layertype:"rectangle",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [xposition,yposition],
            id:action.layer._leaflet_id,
            bounds: rectanglebounds,
        }
                       
        return {
            ...state, 
            lat: xposition,
            lng: yposition,
            sfdata: {...state.sfdata, ...rectanglenewLayer},
            bounds: rectanglebounds,
              
        }
    case 'DispatchAddPolygon':
        console.log(action.layer)
        let Polygonid = action.layer._leaflet_id;
        let PolygonnewLayer={}
        let polygonbounds = action.layer._bounds
        let xxposition = (polygonbounds._northEast.lat+polygonbounds._southWest.lat)/2
        let yyposition = (polygonbounds._northEast.lng+polygonbounds._southWest.lng)/2
        PolygonnewLayer[Polygonid] ={
            layer:action.layer,
            layertype:"polygon",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [xxposition,yyposition],
            id:action.layer._leaflet_id,
            bounds: polygonbounds,
        }
                       
        return {
            ...state, 
            lat: xxposition,
            lng: yyposition,
            bounds: polygonbounds,
            sfdata: {...state.sfdata, ...PolygonnewLayer},
              
        }
    case 'DispatchAddPolyline':
        //console.log(action.layer._latlng)
        let Polylineid = action.layer._leaflet_id;
        let PolylinenewLayer={};
        let LineBounds =action.layer._bounds;
        let linex = (LineBounds._northEast.lat+LineBounds._southWest.lat)/2
        let liney = (LineBounds._northEast.lng+LineBounds._southWest.lng)/2
        PolylinenewLayer[Polylineid] ={
            layer:action.layer,
            layertype:"polyline",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [linex,liney],
            id:action.layer._leaflet_id,
            bounds: LineBounds,
        }
                       
        return {
            ...state, 
            lat: linex,
            lng: liney,
            bounds: LineBounds,
            sfdata: {...state.sfdata, ...PolylinenewLayer},
              
        }

    case 'DispatchAddCircle':
            //console.log(action.layer._latlng)
            let Circleid = action.layer._leaflet_id;
            let CirclenewLayer={}
            CirclenewLayer[Circleid] ={
                layer:action.layer,
                layertype:"circle",
                name:"新增圖層",
                address:"",
                photo:"",
                remark:"",
                coordinate: [action.layer._latlng.lat,action.layer._latlng.lng],
                id:action.layer._leaflet_id,
                zoom: action.zoom,
            }
                           
            return {
                ...state, 
                lat: action.layer._latlng.lat,
                lng: action.layer._latlng.lng,
                zoom: action.zoom,
                sfdata: {...state.sfdata, ...CirclenewLayer},
                  
            }
// 修改圖層 
    case 'EditFeature':
            
            let Feature = Object.keys(action.layer._layers)
            //console.log(Feature)
            console.log(state.sfdata)
            
            

            const EditState = produce(state, draftState => {
                Feature.map((id,idx) =>{
                    //console.log(action.layer._layers[id])
                    //console.log(draftState.sfdata)
                    let editlayer = action.layer._layers[id]
                    draftState.sfdata[id].layer = editlayer[id]
                    if(draftState.sfdata[id].layertype === 'marker'){
                        draftState.sfdata[id].coordinate = [editlayer._latlng.lat,editlayer._latlng.lng]
                        //draftState.sfdata[id].address = geoLatLngToAddress([editlayer._latlng.lat,editlayer._latlng.lng])
                    }else if(draftState.sfdata[id].layertype === 'polyline'){
                        let Bounds =editlayer._bounds;
                        let x = (Bounds._northEast.lat+Bounds._southWest.lat)/2
                        let y = (Bounds._northEast.lng+Bounds._southWest.lng)/2
                        draftState.sfdata[id].coordinate = [x,y]
                        //draftState.sfdata[id].address = geoLatLngToAddress([x,y])
                    }else if(draftState.sfdata[id].layertype === 'polygon'){
                        let Bounds =editlayer._bounds;
                        let x = (Bounds._northEast.lat+Bounds._southWest.lat)/2
                        let y = (Bounds._northEast.lng+Bounds._southWest.lng)/2
                        draftState.sfdata[id].coordinate = [x,y]
                        //draftState.sfdata[id].address = geoLatLngToAddress([x,y])
                    }else if(draftState.sfdata[id].layertype === 'rectangle'){
                        let Bounds =editlayer._bounds;
                        let x = (Bounds._northEast.lat+Bounds._southWest.lat)/2
                        let y = (Bounds._northEast.lng+Bounds._southWest.lng)/2
                        draftState.sfdata[id].coordinate = [x,y]
                        //draftState.sfdata[id].address = geoLatLngToAddress([x,y])
                    }else if(draftState.sfdata[id].layertype === 'circle'){
                        draftState.sfdata[id].coordinate = [editlayer._latlng.lat,editlayer._latlng.lng]
                        //draftState.sfdata[id].address = geoLatLngToAddress([editlayer._latlng.lat,editlayer._latlng.lng])
                    }
                    
                    
                })
            })
            return EditState 
// 刪除圖層 
    case 'DeleteFeature':   
        let DFeature = Object.keys(action.layer._layers)   
        const DeleteState = produce(state, draftState => {

            for(let i = 0; i< DFeature.length ;i++){
                delete draftState.sfdata[DFeature[i]]
            }
        })

        return DeleteState
    default:
        return state;
}
}

export default MainR