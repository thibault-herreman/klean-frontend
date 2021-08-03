export default function (cwsStore={ infosCWparticipate: [], infosCWorganize: [] }, action) {
  if (action.type=="loadCwsStore") {
    
    return action.cwsStore;
  } else if (action.type == "majCwsParticip") {

    let cwsStoreCopy = {... cwsStore};

    cwsStoreCopy.infosCWparticipate = cwsStoreCopy.infosCWparticipate.filter(idCW => idCW !== action.idCW);

    return cwsStoreCopy;
  } else if (action.type == "majCwsOrga") {

    let cwsStoreCopy = {... cwsStore};

    cwsStoreCopy.infosCWorganize = cwsStoreCopy.infosCWorganize.filter(idCW => idCW !== action.idCW);

    return cwsStoreCopy;
  } else {
    return cwsStore;
  }
}