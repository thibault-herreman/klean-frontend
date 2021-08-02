export default function (cityInfo = [], action) {
  if (action.type = "sendCityInfo") {
    console.log("action reducer: ", action.cityInfo);
    return action.cityInfo;
  } else {
    return cityInfo;
  }
}
