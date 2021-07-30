export default function(cleanwalkId = null, action) {
    if(action.type == "setIdCW") {
        return action.cleanwalkId
    } else {
        return cleanwalkId
    }
}


