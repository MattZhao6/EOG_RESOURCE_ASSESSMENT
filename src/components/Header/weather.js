import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {GET_WEATHER} from "../../store/query/queries";
import { useQuery } from "@apollo/client";
import {useGeolocation} from 'react-use';
import {weatherForLocation} from '../../store/actions/dataActions';
import { LinearProgress } from '@material-ui/core';
import Chip from './Chip';

const Weather = () => {
    const getLocation = useGeolocation();
    const latLong = {
      latitude: getLocation.latitude || 29.7604,
      longitude: getLocation.longitude || -95.3698,
    };
  
    const { loading, error, data } = useQuery(GET_WEATHER, {
      variables: {
        latLong,
      },
    });
  
   //use affect to prevent rerender the data
    useEffect(() => {
      if(error) {
        // using console.log() to run error
        console.log(error)
      };
      if (!data) return;
        const { getWeatherForLocation } = data;
        weatherForLocation(getWeatherForLocation);
    }, [data, error])
  
    if (loading) return <LinearProgress />;
  
    return <Chip label={`Weather in ${data.getWeatherForLocation.locationName}: ${data.getWeatherForLocation.description} 
    and ${Math.trunc((data.getWeatherForLocation.temperatureinCelsius*9)/5 + 32)}°`} />;
}

const mapStatetoProps = state =>{
    return {
      savedData : state.dataReducer.savedData,  
    }
  }
  
  const mapDispatchToProps = dispatch =>
        bindActionCreators({
        weatherForLocation
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(Weather);