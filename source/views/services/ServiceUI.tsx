import React from "react";
import * as UI from '@/components/cobalt/importUI';
import ServiceLogic from "@/source/controller/services/Service";
import { StatusBar } from "expo-status-bar";
import { styles } from "@/source/styles/services/ServiceStyles";
class ServiceUI extends ServiceLogic {

    renderTypes = ({ item }) => {
        return (
            <UI.Box style={styles.topServiceContainer}>
                <UI.TouchableOpacity
                    style={[styles.tabItem, item.isSelected && styles.activeTab]}
                    onPress={() => this.handleActiveService(item.id)}
                >
                    <UI.Text style={[styles.alpabetTxt, item.isSelected && styles.activeTxt]}>
                        {item.type}
                    </UI.Text>
                </UI.TouchableOpacity>
            </UI.Box>
        );
    };

    renderCard = ({ item }) => {
        const isLesson = item.type !== "image";

        return (
            <UI.Box style={styles.cardBox}>
                <UI.Box style={styles.card}>
                    <UI.Image
                        source={isLesson ? item.icon : item.image}
                        style={isLesson ? styles.icon : styles.photo}
                    />
                </UI.Box>
                <UI.Box style={styles.cardTextBox}>
                    <UI.Text style={styles.cardTitle}>{item.title}</UI.Text>
                </UI.Box>
            </UI.Box>
        );
    };
    renderServiceList = ({ item }) => {
        const isLesson = item.type !== "image";
        return (
            <UI.TouchableOpacity style={styles.cardBox} onPress={() => this.navigateToReservation()}>
                <UI.Box style={styles.card}>
                    <UI.Image
                        source={isLesson ? item.icon : {uri:item.image}}
                        style={isLesson?styles.icon : styles.photo}
                    />
                </UI.Box>
                <UI.Box style={styles.cardTextBox}>
                    <UI.Text style={styles.cardTitle}>{item.title}</UI.Text>
                </UI.Box>
            </UI.TouchableOpacity>
        )
    }
    render() {
        return (
            <UI.Box style={styles.mainContainer}>
                <UI.ConnectedCbHeader headerTitle={""} props={this.props} />
                <StatusBar hidden={true} />

                <UI.Box style={styles.serviceTopBar}>
                    <UI.FlatList
                        data={this.state.serviceTypes}
                        renderItem={this.renderTypes}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </UI.Box>

                <UI.Box style={styles.cardContainer}>
                    <UI.FlatList
                        data={this.cards}
                        numColumns={2}
                        contentContainerStyle={{ justifyContent: "center" }}
                        renderItem={this.renderServiceList}
                    />
                </UI.Box>

            </UI.Box>
        );
    }
}

export default ServiceUI;