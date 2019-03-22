import React, {StyleSheet} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({ 
  
  /* ==========================================================================
   Global styles
   ========================================================================== */

  // Global colors
  $CarolinaBlue: '#4B9CD3',
  $LinkBlue: '#007FAE',
  $AthleticsNavy: '#13294B',
  $DarkGray: '#767676',
  $MediumGray: '#E1E1E1',
  $LightGray: '#FAFAFA',
  $MainBlack: '#151515',
  $MainWhite: '#FFFFFF'
});

export default EStyleSheet.create({
   /* ==========================================================================
   Global styles
   ========================================================================== */
  body:{
    marginLeft: '2%',
    marginRight: '2%'
  },

  header:{
    marginBottom: 15,
    backgroundColor: '$LightGray',
    padding: '4%',
  },

  header_text_box:{
    flex: 2,
  },

  header_icon:{
    fontSize:32,
    color: '$DarkGray'
  },

  header_text:{
    fontSize: 18,
    color: '$MainBlack',
    fontFamily:'Open-Sans-SemiBold'
  },

  inline:{
    flex: 1, 
    flexDirection: 'row'
  },
  // container:{
  //   width: '95%',
  //   justifyContent:'center'
  // },

  drug_name:{
    fontSize: 30,
    fontFamily: 'Open-Sans-Bold',
    color: '$MainBlack'
  },

  add_comparison:{
    fontSize: 32,
    color: '$DarkGray',
  },

  footer:{
    backgroundColor: '$LightGray'
  },

  footer_icon:{
    fontSize: 32,
    color: '$LinkBlue'
  },

   /* ==========================================================================
   Durg Page
   ========================================================================== */

  brand_name:{
    fontSize: 16,
    fontFamily: 'Open-Sans-Bold',
    color: '$MainBlack'
  },

  subclass_name:{
    fontSize: 14,
    fontFamily: 'Open-Sans-Italic',
    width: '95%',
    color: '$DarkGray',
    marginBottom: 20
  },

  indication_header: {
    padding: 25,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '$MediumGray',
    // width: '95%',
    alignItems:'flex-start',
    // justifyContent: 'left'
  },

  indication_headerText: {
    fontSize: 18,
    textAlign: 'left',
    // alignItems:'left',
    color: '$LinkBlue',
  },

  indication_content: {
    fontSize: 16,
    padding: 20,
    backgroundColor: '#fff',
    
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '$MediumGray',
    alignItems:'center',
  },

  indication_active: {
    backgroundColor: '$LinkBlue',
    color: '$MainWhite'
  },

  indication_inactive: {
    backgroundColor: '$MainWhite',
  },

  indication_header_active:{
    color: '$MainWhite',
    backgroundColor: '$LinkBlue'
  },

  indication_header_inactive:{
    color: '$LinkBlue'
  },

  // container: {
  //   width: '96%',
  //   alignItems: 'center',
  //   // justifyContent: 'center',
   
  //   // backgroundColor: '$MainBlack',
  //   // margin: 0
  //   // right: 5
  //   textAlign: 'center'

  //   // justifyContent: 'center',
  // },
});

