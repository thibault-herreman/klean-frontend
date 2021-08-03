export default function (tokenObj = { token: "XeDLDMr3U4HSJSl74HJpKD", IsFirstVisit: true }, action) {

    if (action.type == 'login') {
        console.log("login in reducer")
        return { token: action.token, IsFirstVisit: false };

    } else if (action.type == 'signOut') {
        console.log("signOut in reducer")
        return { token: "XeDLDMr3U4HSJSl74HJpKD", IsFirstVisit: false };

    } else {
        console.log("not login in reducer")
        return tokenObj;
    }
}