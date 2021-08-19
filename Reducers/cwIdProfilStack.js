// reduceur pour la gestion de l'affichage du détail de la cleanwalk en étant connecté et venant du profil
export default function (cwIdProfilStack = null, action) {
  if (action.type == "setCwIdProfilStack") {
    return action.id;
  } else if (action.type == "resetCwIdProfilStack") {
    return null;
  } else {
    return cwIdProfilStack;
  }
}
