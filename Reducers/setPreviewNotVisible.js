export default function (setIsVisiblePreview, action) {
    if (action.type = "setPreviewNotVisible") {
        return action.setPreviewNotVisible;
    } else {
        return setIsVisiblePreview;
    }
}