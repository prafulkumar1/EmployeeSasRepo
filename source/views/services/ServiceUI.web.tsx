
// import * as UI from '@/components/cobalt/importUI';
// import { RootState } from '@/components/redux/store';
// import { styles } from '@/source/styles/dashbboard/dashboardStyle.web';
// import { connect } from 'react-redux';
// import ReservationLogic from '@/source/controller/reservation/Reservation';
// import ServiceLogic from '@/source/controller/services/Service';

// const pageId='Reservation';
// class ServiceUI extends ServiceLogic {
//   render() {
//     let pageConfigJson = global.appConfigJsonArray.find(item => item?.PageId === pageId);
//     global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
//     return (
//       <UI.View style={styles.mainContainer}>
//         <UI.Text>Servcie For Web</UI.Text>
//       </UI.View>
//     );
//   }
// }

// const mapStateToProps = (state:RootState) => {
//   return {
//     loading:state.dashboard.loading
//   }
// }
// const mapDispatchToProps = {
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ServiceUI)


import React from "react";
import * as UI from '@/components/cobalt/importUI';
import ServiceLogic from "@/source/controller/services/Service";
import { styles } from "@/source/styles/services/ServiceStyles.web";
import { Text } from "react-native";
class ServiceUI extends ServiceLogic {

    // renderTypes = ({ item }) => {
    //     return (
    //         <UI.Box style={styles.topServiceContainer}>
    //             <UI.TouchableOpacity
    //                 style={[styles.tabItem, item.isSelected && styles.activeTab]}
    //                 onPress={() => this.handleActiveService(item.id)}
    //             >
    //                 <UI.Text style={[styles.alpabetTxt, item.isSelected && styles.activeTxt]}>
    //                     {item.type}
    //                 </UI.Text>
    //             </UI.TouchableOpacity>
    //         </UI.Box>
    //     );
    // };

    // renderCard = ({ item }) => {
    //     const isLesson = item.type !== "image";

    //     return (
    //         <UI.Box style={styles.cardBox}>
    //             <UI.Box style={styles.card}>
    //                 <UI.Image
    //                     source={isLesson ? item.icon : item.image}
    //                     style={isLesson ? styles.icon : styles.photo}
    //                 />
    //             </UI.Box>
    //             <UI.Box style={styles.cardTextBox}>
    //                 <UI.Text style={styles.cardTitle}>{item.title}</UI.Text>
    //             </UI.Box>
    //         </UI.Box>
    //     );
    // };
    // renderServiceList = ({ item }) => {
    //     const isLesson = item.type !== "image";
    //     return (
    //         <UI.TouchableOpacity style={styles.cardBox} onPress={() => this.navigateToReservation(item)}>
    //             <UI.Box style={styles.card}>
    //                 <UI.Image
    //                     source={isLesson ? item.icon : {uri:item.image}}
    //                     style={isLesson?styles.icon : styles.photo}
    //                 />
    //             </UI.Box>
    //             <UI.Box style={styles.cardTextBox}>
    //                 <UI.Text style={styles.cardTitle}>{item.title}</UI.Text>
    //             </UI.Box>
    //         </UI.TouchableOpacity>
    //     )
    // }
    render() {
        return (
            <UI.View >
                {/* <UI.ConnectedCbHeader headerTitle={""} props={this.props} /> */}
                {/* <StatusBar hidden={true} /> */}

                 {/* <UI.Box style={styles.serviceTopBar}>
                    <UI.FlatList
                        data={this.state.serviceTypes}
                        renderItem={this.renderTypes}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </UI.Box>  */}

               {/* <UI.Box style={styles.cardContainer}>
                    <UI.FlatList
                        data={this.cards}
                        numColumns={2}
                        contentContainerStyle={{ justifyContent: "center" }}
                        renderItem={this.renderServiceList}
                    />
                </UI.Box> */}
                  <Text>jwnjewnjnjniewjnijwni</Text>
                <UI.TouchableOpacity
                  
                    onPress={() => this.navigateToReservation(4444)}
                >
                    <Text>
                          BUttton
                    </Text>
                </UI.TouchableOpacity>
            </UI.View>
        );
    }
}

export default ServiceUI;