import produce from "immer"

const initState = {
    pagestate: true,
    test:"{}",
    viewcenter:[],
    pointerToPopup:{TF:false,po:[0,0],type:"",createPo : [0,0] },
    ulstate : {
        OpenOrClose: [],
    },
    modalstate: false,
    blogmodalstate: false,
    
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
      blog:"",
      imagePreviewUrl:"",

    },
    mapcursor:'',
    functiontype:'',
    toolsta: false,
    clickFeatureID: "",
}

const MainR = (state = initState, action) =>{
switch (action.type) {
    case 'test':
        console.log(action.testi)
        return {
            ...state, 
            test: action.testi
        }
        

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
            ...state , fdata: {...state.fdata, photo: action.photo, imagePreviewUrl: action.photo}
        }

    case 'handleRemark':
        
        return{
            ...state , fdata: {...state.fdata, remark: action.remark}
        }
    
    case 'handleBlog':
    
            return{
                ...state , fdata: {...state.fdata, blog: action.blog}
            }
    
    case 'handleSubmit':
        //console.log(action.fdata.photo)
        //let markers = state.MarkersPosition
        let idd = state.clickFeatureID
        
        //markers[idd] = action.fdata.coordinate
        let submitState = produce(state,draftState =>{
            draftState.sfdata[idd].name = action.fdata.name
            draftState.sfdata[idd].address = action.fdata.address
            draftState.sfdata[idd].photo = action.fdata.photo
            draftState.sfdata[idd].imagePreviewUrl = action.fdata.photo
            draftState.sfdata[idd].remark = action.fdata.remark
            

        })
        return submitState
    
    case 'bloghandleSubmit':
            //console.log(action)
            //let markers = state.MarkersPosition
            let blogid = state.clickFeatureID
            
            //markers[idd] = action.fdata.coordinate
            let blogsubmitState = produce(state,draftState =>{
                draftState.sfdata[blogid].blog = action.blog
                
                
    
            })
            return blogsubmitState    
    case 'PopupIdAdd':
        let PopupIdAdd = produce(state,draftState =>{

            draftState.clickFeatureID= action.id
        })
        return PopupIdAdd
    case 'getFeatureID':
        //console.log(state.fdata,state.sfdata)
        let clearsubmitState = produce(state,draftState =>{
            
            draftState.fdata.name = state.sfdata[action.id].name
            draftState.fdata.address = state.sfdata[action.id].address
            draftState.fdata.photo = state.sfdata[action.id].photo
            draftState.fdata.remark = state.sfdata[action.id].remark
            draftState.fdata.blog = state.sfdata[action.id].blog
            
            draftState.clickFeatureID= action.id
        })
        return clearsubmitState

    case 'removePopup':
        //console.log(188)
        let cleanPopstate = produce(state,draftState =>{
            draftState.pointerToPopup.TF = false
            draftState.pointerToPopup.po = [0,0]
            draftState.fdata.name = ""
            draftState.fdata.address = ""
            draftState.fdata.photo = ""
            draftState.fdata.imagePreviewUrl = ""
            draftState.fdata.remark = ""
            draftState.fdata.blog = ""
            //draftState.lat=action.latlng.lat
            //draftState.lng=action.latlng.lng
        }) 
        
        return cleanPopstate
    case 'openPopup':
            //console.log(1)
            let openPopstate = produce(state,draftState =>{
                draftState.pointerToPopup.TF = true
                //draftState.pointerToPopup.po = [0,0]
                //draftState.lat=action.latlng.lat
                //draftState.lng=action.latlng.lng
            }) 
            
            return openPopstate
    
    case  'ulonclick': 

        let deltaA = produce(state,draftState =>{

            draftState.sfdata[action.id].OpenOrClose = !state.sfdata[action.id].OpenOrClose
            draftState.blogmodalstate = true
            draftState.fdata.blog = draftState.sfdata[action.id].blog

        })
        
        
        return deltaA
    case 'getmoveend':
        //console.log(action.e.center)
        //console.log(state.bounds)
        let getmoveend = produce(state, draftState => {
            
            //draftState.viewcenter = action.e.center
            //draftState.lat = action.e.center[0]
            //draftState.lng = action.e.center[1]
            draftState.pointerToPopup.TF = true
            draftState.pointerToPopup.po = state.pointerToPopup.createPo
            
        })
        return getmoveend
    case  'pointer': 
        //console.log(action.data.zoom)
        //console.log(action.data.bounds)
        let TypeOfPoint = produce(state, draftState => {

            let randomnumber = Math.random()*0.000001
            draftState.fdata.name = action.data.name
            draftState.fdata.address = action.data.address
            draftState.fdata.photo = action.data.photo
            draftState.fdata.remark = action.data.remark
            draftState.fdata.blog = action.data.blog
            draftState.lat = action.data.coordinate[0]+randomnumber
            draftState.lng = action.data.coordinate[1]+randomnumber
            if(draftState.pointerToPopup.po[0] == 0 && draftState.pointerToPopup.po[0] !== action.data.coordinate[0]){
                draftState.pointerToPopup.TF = !draftState.pointerToPopup.TF
                draftState.pointerToPopup.po = [action.data.coordinate[0],action.data.coordinate[1]]
                //console.log(1)
            }else if(draftState.pointerToPopup.po[0] !== 0 && draftState.pointerToPopup.po[0] !== action.data.coordinate[0]){
                draftState.pointerToPopup.po = [action.data.coordinate[0],action.data.coordinate[1]]
                //console.log(2)    
            }else if(draftState.pointerToPopup.po[0] !== 0 && draftState.pointerToPopup.po[0] == action.data.coordinate[0]){
                draftState.pointerToPopup.TF = true
                //console.log(3)
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
    case 'PopupOpenWhenCreatedAction':
        //console.log(action.layer)
        let PopupOpen = produce(state, draftState => {
            draftState.pointerToPopup.TF = true
            draftState.pointerToPopup.po = [action.layer._latlng.lat,action.layer._latlng.lng]
            //draftState.pointerToPopup.type = "circle"
        })
        return PopupOpen
    case 'PopupOpenWhenCreatedActionForRectangle':
            //console.log(action.center)
            let PopupOpenRec = produce(state, draftState => {
                draftState.pointerToPopup.TF = true
                draftState.pointerToPopup.po = action.center
            })
            return PopupOpenRec
// 加入圖層
    case 'DispatchAddMarker':
        
        let Markerid = action.layer._leaflet_id;
        let MarkernewLayer={}
        let uniMarkerid = (new Date).getTime()
        MarkernewLayer[Markerid] ={
            layer:{po:[action.layer._latlng.lat,action.layer._latlng.lng]},
            layertype:"marker",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [action.layer._latlng.lat,action.layer._latlng.lng],
            id:action.layer._leaflet_id,
            uniID: uniMarkerid,
            //zoom: 16,
            OpenOrClose: false,

        }
        //console.log(MarkernewLayer)   
                    
        return {
            ...state, 
            lat: action.layer._latlng.lat+0.000001,
            lng: action.layer._latlng.lng+0.000001,
            zoom: action.zoom,
            //bounds: "",
            sfdata: {...state.sfdata, ...MarkernewLayer},
              
        }
    case 'DispatchAddRectangle':
        console.log(action.layer._latlngs[0])
        let rectangleid = action.layer._leaflet_id;
        let unirectangleid = (new Date).getTime()
        let rectanglenewLayer={}
        let rectanglebounds = action.layer._bounds
        let xposition = (rectanglebounds._northEast.lat+rectanglebounds._southWest.lat)/2
        let yposition = (rectanglebounds._northEast.lng+rectanglebounds._southWest.lng)/2
        //for ( let i = 0; i < action.layer._latlngs[0].length; i++) { xposition += action.layer._latlngs[0][i].lat}
        //xposition = xposition/4
        rectanglenewLayer[rectangleid] ={
            layer:{po:[
                [action.layer._bounds._southWest.lat,action.layer._bounds._southWest.lng],
                [action.layer._bounds._northEast.lat,action.layer._bounds._northEast.lng]
            ]},
            layertype:"rectangle",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [xposition,yposition],
            id:action.layer._leaflet_id,
            uniID :unirectangleid,
            bounds: rectanglebounds,
            //zoom: action.zoom,
            OpenOrClose: false,
        }
                       
        return {
            ...state, 
            lat: xposition+0.000001,
            lng: yposition+0.000001,
            sfdata: {...state.sfdata, ...rectanglenewLayer},
            zoom: action.zoom,
            //bounds: rectanglebounds,
              
        }
    case 'DispatchAddPolygon':
        //console.log(action.layer)
        let Polygonid = action.layer._leaflet_id;
        let uniPolygonid= (new Date).getTime()
        let PolygonnewLayer={}
        let polygonbounds = action.layer._bounds
        let xxposition = (polygonbounds._northEast.lat+polygonbounds._southWest.lat)/2
        let yyposition = (polygonbounds._northEast.lng+polygonbounds._southWest.lng)/2
        PolygonnewLayer[Polygonid] ={
            layer:{po:[action.layer._latlngs[0].map(id => [id.lat,id.lng],)
            ]},
            layertype:"polygon",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [xxposition,yyposition],
            id:action.layer._leaflet_id,
            uniID:uniPolygonid,
            //bounds: polygonbounds,
            OpenOrClose: false,
            
        }
                       
        return {
            ...state, 
            lat: xxposition+0.000001,
            lng: yyposition+0.000001,
            zoom: action.zoom,
            //bounds: polygonbounds,
            sfdata: {...state.sfdata, ...PolygonnewLayer},
              
        }
    case 'DispatchAddPolyline':
        //console.log(action.layer._latlng)
        let Polylineid = action.layer._leaflet_id;
        let uniPolylineid = (new Date).getTime()
        let PolylinenewLayer={};
        let LineBounds =action.layer._bounds;
        let linex = (LineBounds._northEast.lat+LineBounds._southWest.lat)/2
        let liney = (LineBounds._northEast.lng+LineBounds._southWest.lng)/2
        PolylinenewLayer[Polylineid] ={
            layer:{po:[action.layer._latlngs.map(id => [id.lat,id.lng],)
            ]},
            layertype:"polyline",
            name:"新增圖層",
            address:"",
            photo:"",
            remark:"",
            coordinate: [linex,liney],
            id:action.layer._leaflet_id,
            uniID:uniPolylineid,
            //bounds: LineBounds,
            OpenOrClose: false,
        }
                       
        return {
            ...state, 
            lat: linex+0.000001,
            lng: liney+0.000001,
            zoom: action.zoom,
            //bounds: LineBounds,
            sfdata: {...state.sfdata, ...PolylinenewLayer},
              
        }

    case 'DispatchAddCircle':
            //console.log(action.layer._latlng)
            let Circleid = action.layer._leaflet_id;
            let CirclenewLayer={}
            let uniCircleid = (new Date).getTime()
            CirclenewLayer[Circleid] ={
                layer:{po:[action.layer._latlng.lat,action.layer._latlng.lng],
                       radius:action.layer._mRadius
                    },
                layertype:"circle",
                name:"新增圖層",
                address:"",
                photo:"",
                remark:"",
                coordinate: [action.layer._latlng.lat,action.layer._latlng.lng],
                id:action.layer._leaflet_id,
                zoom: action.zoom,
                uniID:uniCircleid,
                //bounds: action.zoom,
                OpenOrClose: false,
            }
                           
            return {
                ...state, 
                lat: action.layer._latlng.lat+0.000001,
                lng: action.layer._latlng.lng+0.000001,
                zoom: action.zoom,
                //bounds: action.zoom,
                sfdata: {...state.sfdata, ...CirclenewLayer},
                  
            }
// 修改圖層 
    case 'EditFeature':
            
            let Feature = Object.keys(action.layer._layers)
            //console.log(Feature)
            console.log(state.sfdata)
            
            

            let EditState = produce(state, draftState => {
                Feature.map((id,idx) =>{
                    console.log(action.layer._layers[id])
                    //console.log(draftState.sfdata)
                    let editlayer = action.layer._layers[id]
                    
                    if(draftState.sfdata[id].layertype === 'marker'){
                        draftState.sfdata[id].coordinate = [editlayer._latlng.lat,editlayer._latlng.lng]
                        draftState.sfdata[id].layer = {po:[editlayer._latlng.lat,editlayer._latlng.lng]}
                        
                        //draftState.sfdata[id].address = geoLatLngToAddress([editlayer._latlng.lat,editlayer._latlng.lng])
                    }else if(draftState.sfdata[id].layertype === 'polyline'){
                        let Bounds =editlayer._bounds;
                        let x = (Bounds._northEast.lat+Bounds._southWest.lat)/2
                        let y = (Bounds._northEast.lng+Bounds._southWest.lng)/2
                        draftState.sfdata[id].coordinate = [x,y]
                        draftState.sfdata[id].layer = {po:[editlayer._latlngs.map(id => [id.lat,id.lng],)
                        ]}
                        //draftState.sfdata[id].address = geoLatLngToAddress([x,y])
                    }else if(draftState.sfdata[id].layertype === 'polygon'){
                        let Bounds =editlayer._bounds;
                        let x = (Bounds._northEast.lat+Bounds._southWest.lat)/2
                        let y = (Bounds._northEast.lng+Bounds._southWest.lng)/2
                        draftState.sfdata[id].coordinate = [x,y]
                        draftState.sfdata[id].layer = {po:[editlayer[0]._latlngs.map(id => [id.lat,id.lng],)
                        ]}
                        //draftState.sfdata[id].address = geoLatLngToAddress([x,y])
                    }else if(draftState.sfdata[id].layertype === 'rectangle'){
                        let Bounds =editlayer._bounds;
                        let x = (Bounds._northEast.lat+Bounds._southWest.lat)/2
                        let y = (Bounds._northEast.lng+Bounds._southWest.lng)/2
                        draftState.sfdata[id].coordinate = [x,y]
                        draftState.sfdata[id].layer = {po:[
                            [editlayer._bounds._southWest.lat,editlayer._bounds._southWest.lng],
                            [editlayer._bounds._northEast.lat,editlayer._bounds._northEast.lng]
                        ]}
                        //draftState.sfdata[id].address = geoLatLngToAddress([x,y])
                    }else if(draftState.sfdata[id].layertype === 'circle'){
                        draftState.sfdata[id].coordinate = [editlayer._latlng.lat,editlayer._latlng.lng]
                        draftState.sfdata[id].layer = {po:[editlayer._latlng.lat,editlayer._latlng.lng],
                            radius:editlayer._mRadius
                         }
                        //draftState.sfdata[id].address = geoLatLngToAddress([editlayer._latlng.lat,editlayer._latlng.lng])
                    }
                    
                    
                })
            })
            return EditState 
// 刪除圖層 
    case 'DeleteFeature':   
        let DFeature = Object.keys(action.layer._layers)   
        let DeleteState = produce(state, draftState => {
            draftState.pointerToPopup.TF = false
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