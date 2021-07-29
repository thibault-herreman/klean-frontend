export default function(participateCleanwalk = null, action){
    if (action.type == "participate"){
        let newId = action.cleanwalkIdFromButton
        return newId
    }else{
        return participateCleanwalk
    }
}