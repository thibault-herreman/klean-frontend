export default function (cwIdInvited = null, action) {
  if (action.type == "setCwIdInvited") {
    return action.id;
  } else if (action.type == "resetCwIdInvited") {
    return null;
  } else {
    return cwIdInvited;
  }
}
