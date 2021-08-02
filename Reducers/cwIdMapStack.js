export default function (cwIdMapStack = null, action) {
  if (action.type == "setCwIdMapStack") {
    return action.id;
  } else if (action.type == "resetCwIdMapStack") {
    return null;
  } else {
    return cwIdMapStack;
  }
}
