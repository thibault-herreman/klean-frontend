export default function (tokenObj = { token: "XeDLD?Mr3!U4HSJ?Sl74HJpKD!", IsFirstVisit: true }, action) {

    if (action.type == 'login') {
        console.log("login in reducer")
        return { token: "gBzHa7pYcI013YM1IMSGnzLqLkgekND4", IsFirstVisit: false };

    } else if (action.type == 'signOut') {
        console.log("signOut in reducer")
        return { token: "XeDLD?Mr3!U4HSJ?Sl74HJpKD!", IsFirstVisit: false };

    } else {
        console.log("not login in reducer")
        return tokenObj;
    }
}