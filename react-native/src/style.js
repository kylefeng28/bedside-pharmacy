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
  $LightGray: '#E1E1E1',
  $DarkGray: '#767676',
  $MainBlack: '#151515',
  $MainWhite: '#FFFFFF'
});

export default EStyleSheet.create({
  body:{
    width: '90%'
  },

  drug_name:{
    fontSize: 30,
    fontFamily: 'Open-Sans-Bold',
    width: '95%'
  },

  subclass_name:{
    fontSize: 12,
    fontFamily: 'Open-Sans-Italic',
    width: '95%',
    color: '$DarkGray'
  },

  indication_header: {
    padding: 25,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '$LightGray',
    // width: '95%',
    alignItems:'center',
    // justifyContent: 'left'
  },

  indication_headerText: {
    fontSize: 18,
    textAlign: 'left',
    alignItems:'center',
    color: '$LinkBlue',
  },

  indication_content: {
    fontSize: 16,
    padding: 20,
    backgroundColor: '#fff',
    
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '$LightGray',
    alignItems:'center',
  },

  indication_active: {
    backgroundColor: '$LinkBlue',
    alignItems:'center',
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

  container: {
    width: '96%',
    alignItems: 'center',
    // justifyContent: 'center',
   
    // backgroundColor: '$MainBlack',
    // margin: 0
    // right: 5
    textAlign: 'center'

    // justifyContent: 'center',
  },
});

