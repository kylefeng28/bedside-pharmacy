import React, { StyleSheet } from 'react-native'
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
    body: {
        marginLeft: '2%',
        marginRight: '2%'
    },

    header: {
        marginBottom: 0,
        marginBottom: 15,
        backgroundColor: '$LightGray',
        padding: '4%',
    },

    header_text_box: {
        flex: 2,
    },

    header_icon: {
        fontSize: 32,
        color: '$DarkGray'
    },

    header_text: {
        fontSize: 18,
        color: '$MainBlack',
        fontFamily: 'Open-Sans-SemiBold'
    },

    inline: {
        flex: 1,
        flexDirection: 'row'
    },

    drug_name: {
        fontSize: 30,
        fontFamily: 'Open-Sans-Bold',
        color: '$MainBlack'
    },

    add_comparison: {
        fontSize: 32,
        color: '$DarkGray',
    },

    footer: {
        backgroundColor: '$LightGray'
    },

    footer_icon: {
        fontSize: 32,
        // color: '$LinkBlue'
    },

    /* ==========================================================================
    Home Page
    ========================================================================== */

    title: {
        fontSize: 30,
        fontFamily: 'Open-Sans-Bold',
        marginTop: 30,
        marginBottom: 10,
        color: '$MainBlack'
    },

    title_light: {
        fontFamily: 'Open-Sans-Light'
    },

    by_class: {
        fontSize: 20,
        fontFamily: 'Open-Sans-Bold',
        color: '$MainBlack'
    },

    search_icon: {
        color: '$DarkGray',
        fontSize: 30
    },

    class_list: {
        marginTop: 30
    },

    class_list_item: {
        fontSize: 18,
        fontFamily: 'Open-Sans-Regular',
        color: '$LinkBlue'
    },

    forward_icon: {
        fontSize: 20,
        color: '$MediumGray'
    },

    /* ==========================================================================
     Subclass Page
     ========================================================================== */

    circle_icon: {
        fontSize: 18,
        color: '$LinkBlue',
    },

    subclass_list_item: {
        height: 60
    },

    subclass_list_item_text: {
        fontSize: 18,
        fontFamily: 'Open-Sans-Regular',
        color: '$MainBlack',
        marginLeft: 8,
    },

    /* ==========================================================================
    Druglist Page
    ========================================================================== */

    add_icon: {
        fontSize: 30,
        color: '$LinkBlue'
    },

    drug_list_item: {
        height: 60
    },

    drug_list_item_text: {
        fontSize: 18,
        fontFamily: 'Open-Sans-Regular',
        color: '$MainBlack',
        marginLeft: 8,
    },

    /* ==========================================================================
     DrugInfo Page
     ========================================================================== */

    brand_name: {
        fontSize: 16,
        fontFamily: 'Open-Sans-Bold',
        color: '$MainBlack',
    },

    subclass_name: {
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
        alignItems: 'flex-start',
    },

    indication_headerText: {
        fontSize: 18,
        textAlign: 'left',
        color: '$LinkBlue',
    },

    indication_content: {
        fontSize: 16,
        padding: 20,
        backgroundColor: '#fff',

        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '$MediumGray',
        alignItems: 'center',
    },

    indication_active: {
        backgroundColor: '$LinkBlue',
        color: '$MainWhite'
    },

    indication_inactive: {
        backgroundColor: '$MainWhite',
    },

    indication_header_active: {
        color: '$MainWhite',
        backgroundColor: '$LinkBlue'
    },

    indication_header_inactive: {
        color: '$LinkBlue'
    },



    /* ==========================================================================
     Compare Page
     ========================================================================== */
    compare_title_container: {
        // width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 10,
    },

    compare_title: {
        fontSize: 30,
        fontFamily: 'Open-Sans-Bold',
        color: '$MainBlack'
    },

    compare_by:{
      fontSize: 13,
      fontFamily: 'Open-Sans-Regular',
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        // width: '80%'
    },

    compare_item: {
        paddingTop: 2,
        paddingBottom: 2,
        width: '50%',
        // width: '50%'
    },

    compare_drug: {
        paddingTop: 2,
        paddingBottom: 2,
        width: '100%'
    },

    column_header_text: {
        color: '$LinkBlue',
        fontSize: 18,
        fontFamily: 'Open-Sans-SemiBold'
    },

    compare_column_name:{
      color:'$MainBlack',
      fontSize: 16,
      fontFamily: 'Open-Sans-SemiBold'
    },

    compare_column_value:{
      color: '$MainBlack',
      fontSize: 16,
      fontFamily: 'Open-Sans-Regular'

    },

    close_icon: {
        paddingRight: 5,
        fontSize: 45,
        // color: '$MediumGray',
        color: '$DarkGray',
        opacity: .5
    },

    // use add_icon from druglist page

});