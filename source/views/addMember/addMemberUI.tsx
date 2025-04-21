import * as UI from '@/components/cobalt/importUI';
import { connect } from 'react-redux';
import { RootState } from '@/components/redux/store';
import { Icon  } from '@/components/ui/icon';
import { BellIcon,ArrowLeftIcon ,CloseIcon,AddIcon} from '@/components/ui/icon';
import { Image,Modal} from "react-native"
import { getDashBoardData } from '@/components/redux/reducers/dashboardReducer';
import useAddMemberLogic from '@/source/controller/addMember/addMember';
import { styles } from '@/source/styles/addMember/addMember';

const pageId = 'AddMember';
class AddMemberUI extends useAddMemberLogic {
  render() {
    return (
      <UI.ScrollView style={styles.mainContainer} contentContainerStyle={{ paddingBottom: 50 }}>
        <UI.Box style={styles.statusBar} />
        <UI.ImageBackground style={styles.backLogo} source={{ uri: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZnxlbnwwfHwwfHx8MA%3D%3D" }}>
          <UI.Box style={styles.overlay} />
          <UI.Box style={styles.headerContainer}>
          <UI.TouchableOpacity style={styles.backIon}>
            <Image source={require("@/assets/images/icons/Back.png")} style={styles.iconStyle} />
          </UI.TouchableOpacity>
          <UI.TouchableOpacity style={styles.bellIcon}>
            <Image source={require("@/assets/images/icons/Home3x.png")} style={styles.iconStyle} />
          </UI.TouchableOpacity>
          </UI.Box>
          <UI.Box style={styles.subContainer}>
            <UI.TouchableOpacity>
              <UI.Text style={styles.profileTxt}>Service</UI.Text>
              <UI.Text style={styles.profileLabel}>Deep Cleaning</UI.Text>
            </UI.TouchableOpacity>
            <UI.Box>
              <UI.Text style={styles.profileTxt}>Requested Date</UI.Text>
              <UI.Text style={styles.profileLabel}>04/17/2025</UI.Text>
            </UI.Box>
            <UI.Box>
              <UI.Text style={styles.profileTxt}>Request Time</UI.Text>
              <UI.Text style={styles.profileLabel}>8:30 PM</UI.Text>
            </UI.Box>
          </UI.Box>
        </UI.ImageBackground>

        <UI.Box style={styles.memberContainer}>

          <UI.TouchableOpacity style={styles.timeContainer}>
            <UI.Text style={styles.timeTxt}>7:25</UI.Text>
          </UI.TouchableOpacity>

          <UI.Box style={styles.addMemberContainer}>
            <UI.Text style={styles.addMemberTxt}>Add Members</UI.Text>
            <UI.FlatList
              data={[{ number: 1 }, { number: 2 }, { number: 3 }]}
              horizontal
              style={{ minHeight: 40, maxHeight: 60 }}
              renderItem={({ item, index }) => {
                return (
                  <UI.TouchableOpacity style={styles.memberCountBtn}>
                    <UI.Text style={styles.memberCountTxt}>{item.number}</UI.Text>
                  </UI.TouchableOpacity>
                )
              }}
            />
            <UI.Text style={styles.addMessageTxt}>Please click on "+" to select Members,Guests or My Buddies</UI.Text>
          </UI.Box>

          <UI.Box>
            <UI.Text style={styles.labelMember}>Members</UI.Text>
            <UI.FlatList
              data={[{ number: 1 }, { number: 2 }, { number: 3 }]}
              renderItem={({ item, index }) => {
                return (
                  <UI.Box style={styles.addedMemberList}>
                    <UI.Text style={styles.memberName}>Hilcox, Loreson</UI.Text>
                    <UI.Box style={styles.addOrRemoveBtn}>
                      <UI.TouchableOpacity style={styles.memberActionIcons}>
                        <Icon as={CloseIcon} size="xl" color='#b1b1b1' />
                      </UI.TouchableOpacity>
                      <UI.TouchableOpacity style={styles.addIcon} onPress={this.toggleModal}>
                        <Icon as={AddIcon} size="xl" color='#1dc6ff' />
                      </UI.TouchableOpacity>
                    </UI.Box>
                  </UI.Box>
                )
              }}
            />

          </UI.Box>

          <UI.Box style={{ marginTop: 20 }}>
            <UI.Text style={styles.commentTxt}>Comments</UI.Text>
            <UI.ConnectedCbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId} />
          </UI.Box>

          <UI.TouchableOpacity style={styles.submitBtn}>
            <UI.Text style={styles.submitTxt}>Submit</UI.Text>
          </UI.TouchableOpacity>
        </UI.Box>

        <Modal
          transparent={true}
          visible={this.state.isModalVisible}
          animationType="slide"
          onRequestClose={this.toggleModal}
        >
          <UI.Pressable style={styles.modalOverlay} onPress={this.toggleModal} />
          <UI.Pressable style={styles.modalContent}>
            <UI.TouchableOpacity onPress={this.navigateToMember} style={styles.modalBtn}>
              <UI.Text style={styles.modalBtnTxt}>Member</UI.Text>
            </UI.TouchableOpacity>
            <UI.TouchableOpacity onPress={this.toggleModal} style={styles.modalBtn}>
              <UI.Text style={styles.modalBtnTxt}>Guest</UI.Text>
            </UI.TouchableOpacity>
            <UI.TouchableOpacity onPress={this.toggleModal} style={styles.modalBtn}>
              <UI.Text style={styles.modalBtnTxt}>My Buddies</UI.Text>
            </UI.TouchableOpacity>
          </UI.Pressable>
        </Modal>
      </UI.ScrollView>
    );
  }
}

const mapStateToProps = (state:RootState) => {
  return {}
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberUI)
