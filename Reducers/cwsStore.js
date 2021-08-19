// reduceur pour la gestion des cleanwalks de l'utilisateur et afficher les bons boutons dans le détail
export default function (cwsStore={ infosCWparticipate: [], infosCWorganize: [] }, action) {
  if (action.type=="loadCwsStore") {
    
    return action.cwsStore;
  } else if (action.type == "desinsCws") {

    let cwsStoreCopy = {... cwsStore};
    cwsStoreCopy.infosCWparticipate = cwsStoreCopy.infosCWparticipate.filter(idCW => idCW.toString() !== action.idCW.toString());

    return cwsStoreCopy;
  } else if (action.type == "addCwsOrga") {

    let cwsStoreCopy = {... cwsStore};
    cwsStoreCopy.infosCWorganize = [...cwsStoreCopy.infosCWorganize, action.idCW];

    return cwsStoreCopy;
  } else if (action.type == "addCwsPart") {

    let cwsStoreCopy = {... cwsStore};
    cwsStoreCopy.infosCWparticipate = [...cwsStoreCopy.infosCWparticipate, action.idCW];

    return cwsStoreCopy;
  } else if (action.type == "supCws") {

    let cwsStoreCopy = {... cwsStore};
    cwsStoreCopy.infosCWorganize = cwsStoreCopy.infosCWorganize.filter(idCW => idCW.toString() !== action.idCW.toString());

    return cwsStoreCopy;
  } else {
    return cwsStore;
  }
}