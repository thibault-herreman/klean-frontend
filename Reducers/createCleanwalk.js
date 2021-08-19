// reduceur pour les infos de la ville
export default function (cityInfo={}, action) {
  if (action.type=="sendCityInfo") {
    let newCityInfo = action.payLoad;
    return newCityInfo;
  } else {
    return cityInfo;
  }
}
