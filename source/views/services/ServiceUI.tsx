import React from "react";
import * as UI from '@/components/cobalt/importUI';
import ServiceLogic from "@/source/controller/services/Service";
import { StatusBar } from "expo-status-bar";
import { styles } from "@/source/styles/services/ServiceStyles";
import { RootState } from "@/components/redux/store";
import { connect } from "react-redux";
import { getServiceClasses, storeSingleService } from "@/components/redux/reducers/serviceReducer";

const pageId = "ServiceClass"
class ServiceUI extends ServiceLogic {

    renderServiceList = ({ item }) => {
        return (
            <UI.TouchableOpacity onPress={() => this.navigateToReservation(item)}>
                <UI.ConnectedCbBox id="ServiceCardBox" pageId={pageId} style={styles.serviceCardBox}>
                    <UI.ConnectedCbBox id="ServiceCardImg" pageId={pageId} style={styles.serviceCardImg}>
                        <UI.ConnectedCbImage id="ServiceImg" pageId={pageId}
                            imageJsx={
                                <UI.Image
                                    alt="image"
                                    source={item?.ServiceClassImage == "" ? item.icon : { uri: item.ServiceClassImage }}
                                    style={item?.ServiceClassImage == "" ? styles.icon : styles.photo}
                                    resizeMode="cover"
                                />
                            }
                        />
                    </UI.ConnectedCbBox>
                    <UI.ConnectedCbBox id="ServiceCardTextBox" pageId={pageId} style={styles.serviceCardTextBox}>
                        <UI.ConnectedCbText id="ServiceName" pageId={pageId} style={styles.serviceName}>{item.ServiceClassName}</UI.ConnectedCbText>
                        <UI.ConnectedCbText id="ServiceDisc" pageId={pageId} style={styles.serviceDesc}>{item.ServiceClassDiscription}</UI.ConnectedCbText>
                    </UI.ConnectedCbBox>
                </UI.ConnectedCbBox>
            </UI.TouchableOpacity>
        )
    }
    render() {
        const { activeTab } = this.state;
        const serviceCategory = this.ServiceData.BookingTypes?.map((service) => service?.BookingTypeName);
        const activeServiceClass = this.ServiceData?.BookingTypes?.find((service) => service?.BookingTypeName === activeTab)?.ServiceClass || [];
        return (
            <UI.ConnectedCbBox id="ServiceMainContainer" pageId={pageId} style={styles.serviceMainContainer}>
                <UI.ConnectedCbHeader id="ServiceHeaderContainer" pageId={pageId} headerTitle={"Book A Lesson"} props={this.props} goHome={() => this.navigateToService()}/>
                <StatusBar hidden={true} />


                <UI.ConnectedCbView id="ServiceTabContainer" pageId={pageId} style={styles.serviceTabContainer}>
                    <UI.ScrollView horizontal>
                        {serviceCategory?.length > 0 && serviceCategory?.map((category) => {
                            return (
                                <UI.TouchableOpacity
                                    key={category}
                                    onPress={() => this.setState({ activeTab: category })}
                                >
                                    <UI.ConnectedCbBox id="TabHeaderBtn" pageId={pageId} style={[styles.tabHeaderBtn, activeTab === category && styles.activeTab]}>
                                        <UI.ConnectedCbText
                                            style={[
                                                styles.tabText,
                                                activeTab === category && styles.activeTabText,
                                            ]}
                                            id="TabText" pageId={pageId}
                                        >
                                            {category}
                                        </UI.ConnectedCbText>
                                    </UI.ConnectedCbBox>
                                </UI.TouchableOpacity>
                            )
                        })}
                    </UI.ScrollView>
                </UI.ConnectedCbView>


                <UI.ConnectedCbBox id="CardContainer" pageId={pageId} style={styles.cardContainer}>
                    <UI.FlatList
                        data={activeServiceClass}
                        numColumns={2}
                        contentContainerStyle={styles.serviceCards}
                        renderItem={this.renderServiceList}
                        showsVerticalScrollIndicator={false}
                    />
                </UI.ConnectedCbBox>

            </UI.ConnectedCbBox>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.services.loading,
        serviceClassList:state.services.serviceClassList
    }
}
const mapDispatchToProps = {
    getServiceClasses,
    storeSingleService
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceUI)