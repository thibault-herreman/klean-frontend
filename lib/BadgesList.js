import React from "react";
import { StyleSheet, View, FlatList  } from "react-native";
import Badges from './Badges';

function BadgesList(props) {
    let DATA = [
        { id: "ikujhgcvhbnds", toolBadge: "crème solaire" },
        { id: "faezfvzegzerg", toolBadge: "gants" },
        { id: "lkiuytfcgvhjd", toolBadge: "sacs poubelle" },
        { id: "loiuhyoijhbbd", toolBadge: "pince" },
        { id: "lkiuyfdsbnksd", toolBadge: "chapeau" },
        { id: "oihedml,sdscn", toolBadge: "baskets" },
    ];

    let renderItem = ({ item }) => {

        return (
            <View style={styles.container}>
                <Badges type="green" text={item.toolBadge} /> 
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
    },
});

return (
    <FlatList
    data={DATA}
    horizontal
    renderItem={renderItem}
    />
);

}

export default BadgesList;