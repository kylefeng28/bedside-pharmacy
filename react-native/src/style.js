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
  container: {
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center', 
    alignSelf: 'stretch',
    // textAlign: 'center'
  },

  indication_header: {
    padding: 25,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '$LightGray',
    width: '95%',
    // justifyContent: 'left'
  },

  indication_headerText: {
    fontSize: 18,
    color: '$LinkBlue',
    textAlign: 'left'
  },

  indication_content: {
    width: '95%',
    padding: 20,
    backgroundColor: '#fff',
    
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '$LightGray',
  },

  indication_active: {
    backgroundColor: '$LinkBlue',
  },

  indication_inactive: {
    backgroundColor: '$MainWhite',
  },
});

