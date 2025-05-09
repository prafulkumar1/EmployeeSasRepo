import { isPlatformAndroid } from '@/components/constants/Matrices';
import { Dimensions, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    memberItem: {
        width: "23%",
        alignItems: 'center',
        margin: '1%',
        marginBottom: 15,
        flexDirection: "row"
      },
      memberIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#ccc",
        marginBottom: 5,
      },
      stretch: { width: 40, height: 40, margin: 8 },
      memberName: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: "center",
        color: "#888"
      },
      memberId: {
        fontSize: 12,
        color: "#888",
      },
      modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '70%',
        height: '98%',
        backgroundColor: '#fff',
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
        paddingBottom: 20,
    
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666',
      },
      modalHeader: {
        alignItems: "center",
        paddingVertical: 20,
      },
      closeIcon: {
        width: 30,
        height: 30,
        position: "absolute",
        right: 10,
        top: 10,
      },
      searchRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        width: "50%",
        gap: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        flexGrow: 1,
        minWidth: '35%',
      },
      searchButton: {
        borderWidth: 1,
        borderColor: "#5773A2",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginLeft: 5,
      },
      clearButton: {
        borderWidth: 1,
        borderColor: "#5773A2",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginLeft: 5,
      },
      searchClearButtonText: {
        fontSize:18,
        color: "#5773A2",
        fontWeight: '600',
      },
      checkboxButton: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#5773A2",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
      },
      checkboxTick: {
        width: 12,
        height: 12,
        backgroundColor: "#5773A2",
      },
      checkboxLabel: {
        color: "#5773A2",
        fontWeight: '600',
      },
      memberList: {
        paddingHorizontal: 30,
        paddingTop: 10,
      },
      paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 40,
        flexWrap: 'wrap'
      },
      pageButton: {
        margin: 5,
      },
      activePageButton: {
        backgroundColor: '#007bff',
      },
      pageText: {
        color: '#333',
      },
      activePageText: {
        color: '#5773A2',
      },
});