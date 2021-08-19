// reduceur pour la gestion de l'affichage du détail de la cleanwalk en tant qu'invité
export default function (cwIdInvited = null, action) {
  if (action.type == "setCwIdInvited") {
    return action.id;
  } else if (action.type == "resetCwIdInvited") {
    return null;
  } else {
    return cwIdInvited;
  }
}
