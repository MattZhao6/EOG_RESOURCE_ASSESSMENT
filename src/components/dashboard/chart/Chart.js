import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import CharTooltip from "./CharTooltip";
import {addSavedStatus} from "../../../store/actions/dataActions";
import ToggleBtn from "./button/ToggleBtn";


const useStyles = makeStyles({
    container: {
        padding: '10px',
        height: '75vh',
        minWidth: '1000px',
    },
  });
const Chart = (props) =>{
    const styles = useStyles();
    const [charData, setData] = useState([])
    //chagne the data format to the recharts format
    //loop throught all the data
    useEffect(() => {
        let tempArray = []
        props.flareTemp.forEach((item,index)=>{
            let tempSingleData = {
                name: item.at,
                flareTemp : item.value,
                waterTemp :props.waterTemp[index].value,
                casingPressure : props.casingPressure[index].value,
                oilTemp : props.oilTemp[index].value,
                tubingPressure : props.tubingPressure[index].value,
                injValveOpen : props.injValveOpen[index].value,
            }
            tempArray.push(tempSingleData)
        })
        setData(tempArray)
    // eslint-disable-next-line
    }, [props.injValveOpen])
    const handleOnClick = () =>{ //add one to the counter 
        props.addSavedStatus()
    }
    return (
        <div className={styles.container} onClick={handleOnClick} >
            <ToggleBtn />
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charData}>
                <YAxis label={{ angle: -90, value: 'Value', position: 'insideLeft' }} />
                <XAxis dataKey="name" tickFormatter={(name)=>new Date(name).toLocaleTimeString()} interval="preserveStartEnd" minTickGap={25} />
                <Tooltip content={<CharTooltip charData={charData} />}/>
                <Legend />
                <Line style={{display: props.flareTempBtn? "":"none"}} type="monotone" dot={false} key="flareTemp" dataKey="flareTemp" stroke="#FF3933" />
                <Line style={{display: props.waterTempBtn? "":"none"}} type="monotone" dot={false} key="waterTemp" dataKey="waterTemp" stroke="#FFBF00" />
                <Line style={{display: props.casingPressureBtn? "":"none"}} type="monotone" dot={false} key="casingPressure" dataKey="casingPressure" stroke="#0000FF" />
                <Line style={{display: props.oilTempBtn? "":"none"}} type="monotone" dot={false} key="oilTemp" dataKey="oilTemp" stroke="#FF00FF" />
                <Line style={{display: props.tubingPressureBtn? "":"none"}} type="monotone" dot={false} key="tubingPressure" dataKey="tubingPressure" stroke="#00FFFF" />
                <Line style={{display: props.injValveOpenBtn? "":"none"}} type="monotone" dot={false} key="injValveOpen" dataKey="injValveOpen" stroke="#00FF00" />
                </LineChart>
            </ResponsiveContainer>   
        </div>
    )
}


const mapStatetoProps = state =>{
    return {
        //full data
        flareTemp : state.dataReducer.flareTemp,
        waterTemp :state.dataReducer.waterTemp,
        casingPressure : state.dataReducer.casingPressure,
        oilTemp : state.dataReducer.oilTemp,
        tubingPressure : state.dataReducer.tubingPressure,
        injValveOpen : state.dataReducer.injValveOpen,
        // status data
        flareTempBtn : state.statusReducer.flareTemp,
        waterTempBtn : state.statusReducer.waterTemp,
        casingPressureBtn : state.statusReducer.casingPressure,
        oilTempBtn : state.statusReducer.oilTemp,
        tubingPressureBtn : state.statusReducer.tubingPressure,
        injValveOpenBtn : state.statusReducer.injValveOpen,
        //////////counter
        savedStatus : state.statusReducer.savedStatus
  
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
            addSavedStatus
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(Chart);