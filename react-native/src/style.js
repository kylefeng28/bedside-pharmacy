import React, {StyleSheet} from 'react-native'

export default StyleSheet.create({
  title:{
    color: '#151515',
     marginTop:30,
     marginBottom:30,
  },

  box:{
    flexGrow: 1
  },

  column:{
    backgroundColor:'#007FAE'
  },

  column_head:{
    color: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // paddingTop: statusBarHeight,
  },
  // title: {
  //   textAlign: 'center',
  //   fontSize: 22,
  //   fontWeight: '300',
  //   marginBottom: 20,
  // },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

