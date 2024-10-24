/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from 'tss-react/mui';
import {  createTheme } from '@mui/material/styles';

// 0: Deep ocean
// 1: Dark metal
// 2: Fresh blue
// 3: White solid

const linkColor = '#c1e8fb';  // Is used w
const firstColor = '#002830';
const firstAlphaColor = '#0B4955';
const secondColor = '#7FC2D5';
const secondAlphaColor = '#CEE9F1';
const thirdColor = '#EEAA46';
const thirdAlphaColor = '#EEAA46';
const tableHeaderColor = 'rgb(255, 255, 255, 1)';
const tableAlertOnBackground = 'rgb(290, 10, 50, .6)';
const tableAlertOnColor = 'rgb(255, 255, 255, 1)';
const tableRowColor = '#222';
const rowEvenBackground = 'rgb(69, 144, 186)';
const rowOddBackground = 'rgb(162, 199, 220)';
const menuItem = '#DCF2F1';

const succesMain = 'rgb(32, 205, 60, 1)';
const succesContrastText = 'rgb(32, 205, 60, .2)';
const succesDark = 'rgb(2, 145, 10, 1)';
const warningMain = 'rgb(255, 47, 47, 1)';
const warningContrastText = 'rgb(255, 47, 47, .2)';
const warningDark = 'rgb(155, 27, 27, 1)';
const neutralMain = 'rgb(255, 255, 255, 1)';
const neutralContrastText = 'rgb(255, 255, 255, .2)';
const neutralDark = 'rgb(155, 155, 155, 1)';
const plusIcon = 'rgb(77, 168, 218, 1)';
// const modalInternalColor = 'rgb(77, 168, 218, 1)';
// const modalColor = 'rgb(210, 210, 250, 1)';
// const modalColor = 'rgb(210, 210, 250, 1)';
const shadowColor = 'rgb(4, 1, 1, 1)';

// ----------------------------------------

export const themeGlobal = createTheme({
    
    palette: {
      success: {
        main: succesMain,
        contrastText: succesContrastText,
      },
      warning: {
        main: warningMain,
        contrastText: warningContrastText,
      },
    //   neutral: {
    //     main: neutralMain,
    //     contrastText: neutralContrastText,
    //     dark: neutralDark,
    //   },
    },
});


export const useStylesGlobal = makeStyles()({
    
    modal_external_background:{
        backgroundColor: 'rgba(900, 900, 900, .1)',
        backdropFilter: "blur(1px)",
    },
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
    link_color: {
        color: linkColor,
    },
    main_color: {
        color: secondColor,
    },
    
    main_background_color: {
        backgroundColor: secondColor,
    },
    warning_color: {
        color: warningMain,
    },
    modal_color: {
        // color: modalColor,
        color: neutralMain,
    },
    
    gradient_effect: {
        backgroundImage: `linear-gradient(45deg, rgb(250, 250, 250, 0) 50%, rgb(250, 250, 250, 0.1) 75%,  rgb(250, 250, 250, 0.5) 100%)`,
    },
    shadow_effect: {
        boxShadow: `-20px 20px 20px 2px ${shadowColor} `,
    },
    AppDiv: {
        height:"100vh",
        width: "100vw !important",
        // minWidth: "100% !important",
        // maxWidth: "100% !important",
        // margin: "20px",
        padding: "24px !important",
    },
    arrowHome: {
        color: firstColor,
    },
    customBoxColumn: { 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        gap: 8,
    },
    customBoxColumnCustomFields: { 
        // maxHeight:"50vh", 
        height:"260px",
        // width: "300px",
        overflowX: "hidden",
        backgroundColor: "rgb(255,255, 255, .2)",
        paddingTop: "8px",   
        paddingBottom: "8px",   
        // paddingLeft: "8px",    
        borderRadius: 10, 
        
    },
    scrollBarHide: {
        overflow: 'auto', // Hide any overflow
        scrollbarWidth: 'thin', // Hide scrollbar for Firefox
        scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
        '&:hover': {
            scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
            overflowY: 'auto', // Show scrollbar on hover
            // paddingRight: '0',
            overflowX: 'hidden',
        },
    },
    scrollBarHideInsufficientHeight : {
        paddingRight: '10px',
    },
    customBoxColumnStockOptions: {
        minHeight: "330px",
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        textAlign: "center",
        gap: 8,
    },
    customBoxGroup: {
        display: "flex",
        backgroundColor: firstColor,
        height: "100px",
        width: "100px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        textAlign: "center",
        padding: 1,
    },
    customBoxProduct: {
        display: "flex",
        backgroundColor: secondAlphaColor,
        color: firstColor,
        height: "100px",
        width: "100px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        textAlign: "center",
        padding: 1,
        fontWeight: "bold"
    },
    customBoxProducts: {
        backgroundColor: firstColor,
        borderRadius: "10px",
        padding: 16,
        width: "100%",

    },
    customBoxProductsHeader: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        marginBottom: 12,
    },
    fontGroup: {
        display: "block",
        color: tableHeaderColor,
    },
    subModalExternal: {
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, .4)',
        backdropFilter: "blur(1px)",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
    },
    subModalInternal: {
        maxWidth: "350px",
        width: "calc(100% - 50px)",
        backgroundColor: secondColor,
        // maxHeight: "520px",
        maxHeight: "85vh",
        borderRadius: "10px",
        padding: "5px",
        // color: "white",
        // overflow: "scroll",
        overflowX: "hidden",
        scrollbarWidth: "none",
        // overflowX: "hidden",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    buttonMultiplier: {
        backgroundColor: firstColor,
        color: neutralMain,
        borderRadius: "30px",
        minWidth: "45px",
        height: "45px",

    },
    customBoxRowHideSpace: {
        height: "40px",
        marginTop: "10px"
    },
    customBoxRowSpaceBetween: {
        display: "flex",
        justifyContent:  "space-between",
        alignItems: "center",
        // gap: 8,
    },
    customBoxRowSpaceAround: {
        display: "flex",
        justifyContent:  "space-around",
        alignItems: "center",
        gap: 8,
    },
    customImgRow: {
        display: "flex",
        justifyContent:  "flex-end",
        alignItems: "center", 
        gap: 30,
    },
    customZIndexTop: {
        zIndex:999,
    },
    customBoxCenter: {
        display: "flex",
        alignItems: "center", 
    },
    customBoxRowLeft: {
        justifyContent:  "start",
    },
    customBoxRowRight: {
        justifyContent:  "end",
    },
    customBoxRowEnd: {
        display: "flex",
        justifyContent:  "flex-end",
    },
    customBoxRowArrowButton: {
        marginTop: "auto",
        height: "70px"
    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
    },
    inputMainDataMargin: {
        margin: "0 16px",
    },
    newEmailField: {        
        backgroundColor: "transparent",
        borderRadius: 10,
        minWidth: "150px",
        width: "100%",
        maxWidth: "250px",
        "& .MuiOutlinedInput-input": {
            backgroundColor: "white", // Set the outline background to white
            borderRadius: 10, 
        },
        "& .MuiFormHelperText-root": {
          fontSize: "20px",
          color: "rgb(255, 147, 147, 1)",
        },
    },
    ionTrash:{
        color: "rgb(255, 47, 47, 1)",
        padding: "0",
        marginBottom: "4px",
        width: "37px", 
        height: "37px",
        '& img': {
            width: "37px", 
            height: "37px",
        },
    },
    inputUpdateAmountStock: {
        margin: "auto",
        width: "65px",
        
    },
    inputClassName: {
        borderRadius: 10,
        // autoComplete: 'new-password',
    },
    buttonsGroup: {
        width: "100%",
        height: "100%",
    },
    buttonFields: {
        backgroundColor: "white",
        width: "calc(100% - 12px)",
        margin: "5px",
        paddingLeft: "8px",
        paddingRight: "4px",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    btnCommonStyle: {
        borderRadius: "10px",
        transition: ".5s",
        "& > *": {
            transition: ".5s",
        },
        '&:hover': {
            borderWidth: "5px",
            "& > *": {
                transition: ".5s",
            }
        }
    },
    btn_cancel: {
      backgroundColor: warningMain,
      borderColor: warningMain,
      color: neutralMain,
      stroke: neutralMain,
      '&:hover': {
        borderColor: warningMain,
        backgroundColor: warningMain,
        "& > *": {
        //   stroke: warningDark
        }
      }
    },
    btn_ok: {
      backgroundColor: succesMain,
      borderColor: succesMain,
      color: neutralMain,
      stroke: neutralMain,
      '&:hover': {
        borderColor: succesMain,
        backgroundColor: succesMain,
        "& > *": {
    //   color: succesDark,
        }
      }
    },  
    btn_edit: {
      backgroundColor: firstAlphaColor,
      borderColor: firstAlphaColor,
      color: neutralMain,
      '&:hover': {
        borderColor: firstAlphaColor,
        backgroundColor: firstAlphaColor,
        "& > *": {
        //   color: neutralDark,
        }
      },
    },
    btn_business: {
      backgroundColor: neutralMain,
        height:"112px",
        // width:"288px",
        width:"288px",
        margin: "8px",
        borderRadius: 10,
        // fontFamily:['"Roboto"'],
        
        // fontSize: "32px",
        // fontWeight: "bold",
      font: "32px bold",
      '&:hover': {
        borderColor: neutralDark,
        backgroundColor: neutralMain,
        "& > *": {
          color: neutralDark,
        }
      },
    },
    font_business: {
        fontSize: "32px",
        fontWeight: "bold",
    },
    route: {
        display: "block",
      margin: "0 5px",
    //   margin: "15px",
    },
    btn_add: {
      backgroundColor: neutralContrastText,
      '&:hover': {
        borderColor: neutralDark,
        backgroundColor: neutralContrastText,
        "& > *": {
          color: neutralDark,
          stroke: neutralDark
        }
      },
    },
    menuIcon: {
      color: neutralMain,
      '& .MuiSvgIcon-root': {
        width: '2.9rem',
        height: '2.9rem',
      },
      display: 'flex',
      margin: "auto",
      marginRight: "0",
    },   
    plusIcon: {
      display: "flex",
      // margin: "0 5px",
      margin: "auto",
      padding: "1px 1px",
      backgroundColor: "rgb(77, 168, 218, 0)",
      '& .MuiSvgIcon-root': {
        width: '2.9rem',
        height: '2.9rem',
      },
    },
    plus_icon_color: {
      color: plusIcon,
    },
    backPlus: {
      color: "red",
    },
    check_rounded_icon_stroke_color: {
        stroke: succesMain,
    },
    close_rounded_icon_stroke_color: {
        stroke: warningMain,
    },
    add_rounded_icon_stroke_color: {
        stroke: neutralMain,
    },
    page: {
        display: "inline-block",
        margin: "2%",
        width: "30%",
        height: "30%",
        backgroundColor: "white",
    },
    editIcon: {
        width: "32px", 
        height: "32px",
        marginBottom: "6px"
    },
    newCustomField: {
        backgroundColor: "white",
        borderRadius: 10,
        minWidth: "150px",
        width: "40%",
        maxWidth: "250px",
    },
    show: {
        display: "block",
    },
    hide: {
        display: "none",
    },
    hideShowSpace: {
        width: "10%", 
    },

    alert_on : {
        color: "red",
    },
    text_field_error: {
        borderColor: "red",
        '& label': {
            color: 'red !important',
        },
        '& .MuiInput-underline:after': {
            color: 'red',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'red',
            '& fieldset': {
                borderWidth: "2px",
                borderColor: 'red',
                color: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'red',
                color: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
                color: 'red',
            },
        },
    },
    switch_error: {
        "& .MuiSwitch-thumb": {
            backgroundColor: 'red', // Change this color to your desired thumb color
        },
        '& .MuiSwitch-track': {
            backgroundColor: 'red', // Change this color to your desired track color
        },
    },
    customDivider : {
        borderColor: "white",
        width: "90%", 
        size: "320px",
        margin: "14px",
        marginTop: "20px",
    },
    customDividerVertical : {
        borderColor: "white",
        size: "50px",
        marginRight: "10px",
        marginLeft: "1px",
    },
    
    title : {
        marginTop: "5px",
        marginBottom: "10px",
    },
    menu_appbar: {
        position: "fixed",
        left: 0,
        bottom: 0,
        height: "64px",
        display: "flex",
        justifyContent: "center",
    },
    main_colorDD: {
        color: tableHeaderColor,
    },
    menu_toolbar: {
        height: "64px",
        margin: "auto",
    },
    menu_logo: {
        flexGrow: 1,
    },
    menu_page: {
        padding: "12px !important",
        margin: "0",

    },
    menu_footer: {
        left: 0,
        bottom:  '64px',
        color: "white",
        backgroundColor: "rgb(255, 47, 47, .25)",
        height: "32px",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    menu_options : {
        position: 'absolute',
        '&  > :nth-of-type(1)': {
            width: "100%",
            height: "100%",
        },
        '& Button': {
            // color: "white",
            height: "100%",
        },
    },
    menu_options_color : {
        '& Button': {
            color: tableHeaderColor,
        },
    },
    menu_options_SM : {
        bottom: 64,
        width: "100%",
    },
    menu_options_LG : {
        top: 64,
        right: 0,
        width: "15%",
        height: "35%",
        borderRadius: "0 0 10px 10px",
    },
    
    table_header_color: {
        color: tableHeaderColor,
        '&.Mui-checked': {
            color: tableHeaderColor,
        },
    },
    table_rows : {
        padding: "8px 0",
        border: 0,
    },
    table_rows_color : {
        color:tableRowColor,
    },
    table_alert_on_background : {
        backgroundColor: tableAlertOnBackground, 
    },
    table_alert_on_color : {
        color: tableAlertOnColor,
    },
    table_row_even: {
        backgroundColor: rowEvenBackground, 
    },
    table_row_odd: {
        backgroundColor: rowOddBackground, 
    },
    table_menu : {
        borderRadius: '4px', // Set border-radius to mimic scrollbar radius
        '& .MuiPaper-root': {  
            overflow: 'hidden', // Hide any overflow
            overflowY: 'auto', // Show scrollbar on hover
            borderRadius: '4px', // Set border-radius to mimic scrollbar radius
            // paddingRight: '12px',
            scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
            scrollbarWidth: 'thin', // Hide scrollbar for Firefox
            '&:hover': {
                scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                overflowY: 'auto', // Show scrollbar on hover
                // paddingRight: '0',
                overflowX: 'hidden',
            },
        },
    },
    table_menu_background_color : {
        '& .MuiPaper-root': { 
            backgroundColor: menuItem,
            '&:hover': {
                backgroundColor: menuItem,
             },
        },
    },
    table_disabled: {
        backgroundColor: "rgb(255,255, 255, .3)",
    },
    menu_item: {
        padding: '0 5px',
    },
    // menu_item: {
    menu_item_background_color: {
        backgroundColor: menuItem,
        '&:hover': {
            backgroundColor: menuItem,
        },
    },
    menuItemContent: {
        display: 'block',
        maxWidth: '100px', // Set a fixed width for truncation
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'relative',
    },
        
})

export const modalStyleExternal = {
    overflowX: "hidden",
    scrollbarWidth: "none",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
};
export const modalStyleInternal = {
    maxWidth: "350px",
    width: "calc(100% - 50px)",
    // maxHeight: "520px",
    maxHeight: "85vh",
    borderRadius: "10px",
    padding: "5px",
    // color: "white",
    // overflow: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    // overflowX: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
export const modalStyleInternalConfirmTermsAndPrivacy = {
    maxWidth: "900px",
}
export const modalStyleInternalForgottenPass = {
    width: "280px",
}
export const modalStyleInternalAdmin = {
    maxWidth: "100%",
}

export const modalStyleChangePassExternal = {
    top: "23%",
};

export const modalStyleChangePassInternal = {
    width: "calc(100% - 64px)",
};
export const modalStyleSaveExternal = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // top: "50%",
    // transform: "translateY(-50%)", // Center vertically using transform
    width: "100%",
    height: "100%",
    // overflow: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "none",
    margin: "auto",
    padding:"0",
    // paddingBottom:"40px",
    // padding:"10px 0",
};
export const modalStyleSignUpExternal = {
    marginTop: "30px",
};
export const modalStyleSaveInternal = {
    top: 74,
    width: "220px",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    // overflow: "scroll",
    // overflow: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "none",
};

export const modalStyleErrorInternal = {
    top: 74,
    width: "270px",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    // overflow: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "none",
};
export const modalLoginInternal = {
    width: "320px",
    paddingBottom: "20px",
};
export const modalStyleImageExternal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
export const modalStyleImageInternal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
