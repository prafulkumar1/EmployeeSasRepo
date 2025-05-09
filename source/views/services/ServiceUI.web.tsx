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

// import React, { useEffect, useState } from "react";
// import { Text, ActivityIndicator } from "react-native";
// import axios from "axios";
// import * as UI from "@/components/cobalt/importUI";
// import { styles } from "@/source/styles/services/ServiceStyles.web";
// const pageId = 'ServiceUI'
// const ServiceUI = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(
//         "https://cobaltportal.mycobaltsoftware.com:4430/codesync.test/BookingManagement/GetLoginUserDetails"
//       )
//       .then((response) => {
//         console.log(response?.data, "responisdeeee");
//         setData(response?.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         setLoading(false);
//       });
//   }, []);
//   console.log(data?.ID, "---------------------");

//   return (
//     <UI.View
//       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//     >
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           {data && (
//             <UI.View>
//               {Object.entries(data).map(([key, value], index) => (
//                 <UI.View key={index} style={{ marginVertical: 5 }}>
//                   <Text style={{ fontSize: 20, color: "#000" }}>
//                     {key}: {String(value ?? "null")}
//                   </Text>
//                 </UI.View>
//               ))}
//             </UI.View>
//           )}
//         </>
//       )}
//     </UI.View>
//     // <UI.ConnectedCbView
//     //   id="addMemberContainer"
//     //   pageId={pageId}
//     //   style={styles.cardContainer}
//     // >
//     //   <Text> Add Member</Text>
//     // </UI.ConnectedCbView>
//   );
// };

// export default ServiceUI;
