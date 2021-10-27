import React,{Component} from 'react';
import firebase from "firebase"
import keys from "./config"
import Tabs from "./components/Tabs";import Tabs1 from "./components/Tabs1";
import Button from "@material-ui/core/Button"
import {Cloud,ThumbUpAltOutlined,Subject,ChevronRight,Favorite,ShoppingCart,CallRounded,LocalOfferRounded,InfoOutlined,DescriptionOutlined,LanguageOutlined,WhatsApp,EmailOutlined,EmojiFlagsOutlined,CallOutlined, StorefrontOutlined,AccessTimeOutlined, ThreeDRotation ,RoomOutlined, ArrowRight} from '@material-ui/icons';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Toast from 'react-bootstrap/Toast'
import ToastBody from 'react-bootstrap/ToastBody'
import Paper from '@material-ui/core/Paper';
import {Tabs as Ttabs , Tab } from '@material-ui/core';
import FlatList from 'flatlist-react';
import Moment from 'react-moment';





class Display_Product extends Component {

    constructor(){
    super()

    this.state={
        grouppost:[],timing:[],
        groupid:[],
        user_data:[],
        user:{},product:{},
        liked:0,
        counter:0,
        stat : null,
        alert_on:false,
        isModelVisible: 0,
        isModelVisible_like : 0,
        isModelVisible_alert : 0,
        isModelVisible_image: 0,
        commentData:[],
        liker:{},
        alert:{},
        isLoading: true,
        lastVisibleId:0,
        isRefreshing:false,
        i_comment:"",
        business:{},
        unread_count:0,
        unreadposts:[],
        alerts:[],
        notification:[],
        no_noti: 0,
        no_app:0,business_uid:false,
        pkey:false,gkey:false,groupkey:false,visible_image:false,
        i_image:null,i_name:false,i_price:false,i_tag:false,i_description:false,visible_tag:false
    }
    }

   
      
    componentDidMount(){

   
        let p_uid = this.props.p_uid
      

        
        let b_uid = this.props.b_uid

        this.setState({business_uid:b_uid})

        firebase.firestore().collection('business_page').doc(b_uid).collection("products").doc(p_uid).onSnapshot(doc => { this.setState({ product: doc.data() });})

        firebase.firestore().collection('business_page').doc(b_uid).onSnapshot(doc => { this.setState({ business: doc.data()})})

    }




    
     
   
 
 render() {     

    let p_uid = this.props.p_uid
    let b_uid = this.props.b_uid


        return (

          <div >
                        <div class="row" style={{justifyContent:"space-between",paddingLeft:"28px",paddingRight:"28px",paddingTop:"10px"}} >                            
                            <p style={{fontFamily: 'sans-serif-light',fontSize:20,color:"#007aff"}}>{this.state.business.name}</p>
                            <p style={{fontFamily: 'sans-serif-light',fontSize:20,color:"#CD6155"}}>Product</p>

                        </div>

                        <img alt="Responsive image"  src={   this.state.product.image} style={{ display:"block", maxWidth: "100%",height:"auto",borderRadius:4}}  />
                          


                            <p> </p>
                            <p style={{fontFamily: 'sans-serif-thin',color:"red",fontSize:9,marginLeft:10}}>Name  </p>
                            <p style={{fontWeight:"700",width:"90%",fontSize:20,marginLeft:20}} >{this.state.product.name}</p> 
                     

                            <p style={{backgroundColor:"#eee",height:"5px"}}></p>


                            <p> </p>
                            <p style={{fontFamily: 'sans-serif-thin',color:"red",fontSize:9,marginLeft:10}}>Price  </p>

                           { this.state.product.price ?
                           
                           <div class="row" style={{marginLeft:20}} >
                            <p style={{fontWeight:"700",fontSize:20}} >₹</p> 
                            <p style={{fontWeight:"700",fontSize:20,marginLeft:5}} >  {this.state.product.price}</p> 

                            </div>

                            :
                            
                            <a class={"row "} href={`tel:${this.state.business.phone}` } target="_blank" style={{ backgroundColor:"#CD6155",flexDirection:"row",borderRadius:3,height:20,marginLeft:20,marginRight:20} }>
                            
                                <CallOutlined style={{color:"#fff",fontSize:20,marginLeft:5}}   />
                                <p  style={{fontFamily: 'sans-serif-medium',fontSize:12, color:"white",alignSelf:"center",marginLeft:7}}>   Call Now to know the price  </p>
                            
                            </a> 

                           
                          }

                          {
                              this.state.product.price
                              ?<p  style={{fontFamily: 'sans-serif-medium',fontWeight:"700",justifyContent:"flex-end",fontSize:12, color:"#007aff",alignSelf:"center",marginLeft:"20px",marginTop:"-15px"}}>{this.state.product.negotiation}  </p>
                              :<p  style={{fontFamily: 'sans-serif-medium',fontWeight:"700",justifyContent:"flex-end",fontSize:12, color:"#007aff",alignSelf:"center",marginLeft:"20px"}}>{this.state.product.negotiation}  </p>
                          }
                            

                            <p style={{backgroundColor:"#eee",height:"5px"}}></p>


                            <p> </p>
                            <p style={{fontFamily: 'sans-serif-thin',color:"red",fontSize:9,marginLeft:10}}>Tag  </p>
                            <p style={{fontWeight:"700",width:"90%",fontSize:18,marginLeft:20}}>{this.state.product.tag}</p> 
                      

                            <p style={{backgroundColor:"#eee",height:"5px"}}></p>

                            <p> </p>
                            <p style={{fontFamily: 'sans-serif-thin',color:"red",fontSize:9,marginLeft:10}}>Description  </p>
                           
                                {
                                    this.state.product.description ?
                                    <p style={{fontFamily: 'sans-serif-light',width:"90%",fontSize:14,marginLeft:20}} >{this.state.product.description}</p> 
                                    :
                                    <p style={{fontFamily: 'sans-serif-thin',width:"90%",fontSize:11,marginLeft:20}} >No Description Available</p> 


                                }
                           
                            <p style={{backgroundColor:"#eee",height:"5px"}}></p>

                            <p> </p>
                            <p style={{fontFamily: 'sans-serif-thin',color:"red",fontSize:9,marginLeft:10}}>Business Website  </p>
                         
                            <div style={{marginLeft:"15px",marginRight:"15px"}} >
                                                         <a class="card" href={  `https://www.b2cloud.ml/${b_uid}`} target="_blank"  style={{padding:10,borderRadius:8,borderColor: "#C0C0C0",borderWidth:0.6,}}>
                                                         <div class="row " style={{paddingLeft:15,paddingRight:15,paddingTop:6}}>
                                                                    
                                                                    <p  style={{ fontSize:18,fontWeight:"700",color:"#000",width:"95%"}} >{this.state.business.name}  </p> 
                                                                    <ChevronRight style={{alignSelf:"center",color:"black",fontSize:30,marginTop:"-20px",width:"5%",justifyContent:"flex-end"}}   />
                                                                
                                                                </div>
                                                                <img  src={  this.state.business.image} style={{ display:"block", maxWidth: "100%",height:"auto",borderRadius:4}} />
                                                                
                                                                
                                                          
                                                         </a>
                                                          
                            </div>

                            <a style={{justifyContent:"center",marginTop:"15px",paddingTop:"10px",flexDirection:"row"}} class="row" href={  `https://play.google.com/store/apps/details?id=com.office.b2cloud&hl=en_IN`} target="_blank">

                                    <p style={{color:"#000"}}>website made with   </p>
                                    <Cloud style={{ fontSize: 18,marginTop:"4px",width:"5%",color:"#CD6155" }}  />
                                    <p style={{color:"#000"}}>   B2CLOUD  </p>

                            </a>

            </div>
        );
    }
} 

export default Display_Product;

