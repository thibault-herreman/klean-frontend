// reduceur pour la gestion du token dans l'appli et l'affichage ou non du Onboarding
export default function (tokenObj = { token: "XeDLDMr3U4HSJSl74HJpKD", IsFirstVisit: true }, action) {

    if (action.type == 'login') {
        return { token: action.token, IsFirstVisit: false };

    } else if (action.type == 'signOut') {
        return { token: "XeDLDMr3U4HSJSl74HJpKD", IsFirstVisit: false };

    } else {
        return tokenObj;
    }
}