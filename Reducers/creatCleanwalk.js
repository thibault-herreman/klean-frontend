export default function (cityInfo = {}, action) {
  if ((action.type = "sendCityInfo")) {
      return (action.cityInfo);
  } else {
      return cityInfo;
  }
}
