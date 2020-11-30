import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {switchBtnStatus} from "../../../../store/actions/toggleAction";

const useStyles = makeStyles({
    container: {
        width: "10vw",
        height: "10vh",
        background: 'lightBlue',
        borderRadius: '10px',
        justifyContent : "space-evenly",
        padding:"5px",
        cursor: "pointer",
        '&:hover': {
            boxShadow: '3px 3px 3px black',
        },
    },
    title: {
        width: "100%",
        display: 'block',
        textAlign: 'center',
        color: 'white',
        
    },
    infomation: {
        width: "100%",
        display: 'block',
        textAlign: 'center',
    }
  });

const SingleBtn = (props) => {
    const styles = useStyles() 
    let currentBtn = null //save what is the current btn name
    let backGroundColor = null // every btn has a different color
    if(props.info.metric === "flareTemp") { //set the btn color and btn name
        currentBtn = props.flareTemp
        backGroundColor = "#FF3933"
    }
    if(props.info.metric === "waterTemp") {
        currentBtn = props.waterTemp
        backGroundColor = "#FFBF00"
    }
    if(props.info.metric === "casingPressure") {
        currentBtn = props.casingPressure
        backGroundColor = "#0000FF"
    }
    if(props.info.metric === "oilTemp") {
        currentBtn = props.oilTemp
        backGroundColor ="#FF00FF"
    }
    if(props.info.metric === "tubingPressure") {
        currentBtn = props.tubingPressure
        backGroundColor = "#00FFFF"
    }
    if(props.info.metric === "injValveOpen") {
        currentBtn = props.injValveOpen
        backGroundColor = "#00FF00" 
    }
    //create the onClick to reset the btn status 
    const handleOnClick = ()=>{ 
        console.log(props.info.metric)
        props.switchBtnStatus(props.info.metric)
    }
    return (
    <div >
        <div 
        onClick={handleOnClick} 
        className={styles.container}  
        style={{opacity: currentBtn ? '1' : '0.1', backgroundColor: backGroundColor }}
        >
            <h3 className={styles.title}>
                {props.info.metric}
            </h3>
            <p className={styles.title}>
                {props.info.value} {props.info.unit} 
            </p>
        </div>
    </div>)
}

const mapStatetoProps = state =>{
    return {
        flareTemp: state.statusReducer.flareTemp,
        waterTemp : state.statusReducer.waterTemp,
        casingPressure: state.statusReducer.casingPressure,
        oilTemp: state.statusReducer.oilTemp,
        tubingPressure: state.statusReducer.tubingPressure,
        injValveOpen: state.statusReducer.injValveOpen,
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
            switchBtnStatus
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(SingleBtn);