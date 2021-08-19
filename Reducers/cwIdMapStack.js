// reduceur pour la gestion de l'affichage du détail de la cleanwalk en étant connecté et venant de la map
export default function (cwIdMapStack = null, action) {
  if (action.type == "setCwIdMapStack") {
    return action.id;
  } else if (action.type == "resetCwIdMapStack") {
    return null;
  } else {
    return cwIdMapStack;
  }
}
