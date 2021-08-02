export default function (cityInfo={}, action) {
  if (action.type=="sendCityInfo") {
    console.log("action reducer: ", action.payLoad);
    let newCityInfo = action.payLoad;
    return newCityInfo;
  } else {
    return cityInfo;
  }
}
