import { WeatherDataTypes, Colors } from "./enums.js";
import { styledLog } from "../../helpers/colored-logs.helper.js";

const WeatherHistory = (data) => {
  const forPlace = (place) => data.filter((x) => x.getPlace() == place);

  const forType = (type) => data.filter((x) => x.getType() == type);

  const forPeriod = (startDate, endDate) =>
    data.filter((x) => x.getTime() >= startDate && x.getTime() <= endDate);

  const convertToUsUnits = () => {
    styledLog(Colors.YELLOW, "\nConverting to US units");
    data.map((x) => {
      switch (x.getType()) {
        case WeatherDataTypes.TEMPERATURE:
          x.convertToF();
          break;
        case WeatherDataTypes.CLOUDCOVERAGE:
          break;
        case WeatherDataTypes.WIND:
          x.convertToMPH();
          break;
        case WeatherDataTypes.PRECIPITATION:
          x.convertToInches();
          break;
      }
    });
    styledLog(Colors.YELLOW, "Converted to US units");
  };

  const convertToInternationalUnits = () => {
    styledLog(Colors.YELLOW, "\nConverting to INTERNATIONAL units");
    data.map((x) => {
      switch (x.getType()) {
        case WeatherDataTypes.TEMPERATURE:
          x.convertToC();
          break;
        case WeatherDataTypes.CLOUDCOVERAGE:
          break;
        case WeatherDataTypes.WIND:
          x.convertToMS();
          break;
        case WeatherDataTypes.PRECIPITATION:
          x.convertToMM();
          break;
      }
    });
    styledLog(Colors.YELLOW, "Converted to INTERNATIONAL units");
  };

  const getData = () => data;

  const including = () => data;

  const lowestValue = () => {
    if (history.length === 0) {
      data.lowest = undefined;
    } else return data.lowest;
  };

  const printData = (dataArrray) => {
    let historyTitle = "\nWeather history:";
    styledLog(Colors.CYAN, historyTitle);

    dataArrray.map((x) => {
      styledLog(
        Colors.GREEN,
        x.getPlace() +
          " | " +
          x.getType() +
          " | " +
          x.getValue()+
          " | " +
          x.getUnit()+       
          " | " +
          x.getTime()
      );
    });
  };

  return {
    printData,
    getData,
    forPlace,
    forType,
    forPeriod,
    including,
    lowestValue,
    convertToInternationalUnits,
    convertToUsUnits,
  };
};

export default WeatherHistory;