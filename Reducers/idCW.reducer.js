export default function (cleanwalkId = null, action) {
  if (action.type == "setIdCW") {
    return action.cleanwalkId;
  } else if (action.type == "resetIdCl") {
    return null;
  } else {
    return cleanwalkId;
  }
}
