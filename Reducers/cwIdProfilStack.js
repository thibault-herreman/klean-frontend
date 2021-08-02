export default function (cwIdProfilStack = null, action) {
  if (action.type == "setCwIdProfilStack") {
    return action.id;
  } else if (action.type == "resetCwIdProfilStack") {
    return null;
  } else {
    return cwIdProfilStack;
  }
}
