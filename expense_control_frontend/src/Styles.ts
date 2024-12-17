import { makeStyles } from 'tss-react/mui';
import {  createTheme } from '@mui/material/styles';
 
const firstColor = '#002830';
const firstAlphaColor = '#0B4955';
const secondColor = '#7FC2D5';
const secondAlphaColor = '#CEE9F1';
const thirdColor = '#EEAA46';
const succesMain = 'rgb(32, 205, 60, 1)';
const succesContrastText = 'rgb(32, 205, 60, .2)';
const warningMain = 'rgb(255, 47, 47, 1)';
const warningContrastText = 'rgb(255, 47, 47, .2)';
const neutralMain = 'rgb(255, 255, 255, 1)';
const neutralDark = 'rgb(155, 155, 155, 1)';

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
    },
});

// export const useStylesGlobal = makeStyles()({
export const useStylesGlobal = makeStyles()((theme) => ({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
    deleteButtons: {
        display: "flex",
        justifyContent:  "center",
    },
    main_background_color: {
        backgroundColor: secondColor,
    },
    modal_color: {
        color: neutralMain,
    },
    AppDiv: {
        height:"100vh",
        // width: "100vw !important",
        width: "100vw",
        // padding: "24px !important",
        padding: "30px 24px",
        // width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: "100vw",
        },
        [theme.breakpoints.up('md')]: {
        width: "35vw",
        },
        // [theme.breakpoints.up('lg')]: {
        // width: "30vw",
        // },

    },
    arrowBack: {
        color: firstColor,
        fontSize:50,
        marginTop: 10,
    },
    customBoxColumn: { 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        gap: 8,
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        textAlign: "center",
        gap: 8,
    },
    customBoxRowArrow: {
        justifyContent:  "space-between",
        height: 70, 
    },
    customBoxRowArticlesHeader: {
        gap: 20,
        marginBottom: 20,
        marginLeft: 30
    },
    customBoxRowButtons: {
        margin: 10
    },
    customShoppingCartIcon: {
        fontSize: 45, 
        marginTop: 15,
        color: firstColor,
    },
    cartNumberArticles: {
        position: "relative",
        color: firstColor,
        top: 7,
        height: 12, 
    },
    buttonRemoveCartArticle: {
        backgroundColor: "red",
        color: neutralMain,
        borderRadius: "25px",
        minWidth: "15px",
        height: "15px",
        margin: "auto 5px auto 0",
        fontSize: 18, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
    customBoxCartArticles: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        backgroundColor: "white",
        borderRadius: "10px",
        color: firstColor,
        padding: "6px 12px",
        margin: "12px 0px",
    },
    customBoxCartTotal: {
        marginTop: 16,
    },
    customBoxCartArticle: {
        display: "flex",
        justifyContent:  "space-between",
        width: "100%",
    },
    underscore: {
        flexGrow: 1,
        color: firstColor,
        whiteSpace: "nowrap", /* Prevent wrapping */
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "center",
        position: "relative",
        margin:"0 5px",
        "&::before": {
            content: '"________________________________________________________________________________________________________________________________________________________________"', // Add underscores
            display: "block",
            fontSize: "1em",
            position: "absolute",
            width: "100%",
            height: "100%",
        },
    },
    subModalExternal: {
        position: "absolute",
        backgroundColor: 'rgba(0, 0, 0, .1)',
        backdropFilter: "blur(2px)",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
    },
    subModalInternal: {
        maxWidth: "350px",
        width: "calc(100% - 50px)",
        backgroundColor: secondColor,
        maxHeight: "85vh",
        borderRadius: "10px",
        padding: "5px",
        overflowX: "hidden",
        scrollbarWidth: "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    subModalDelete: {
        width: "calc(100% - 50px)",
        maxWidth: "250px",
        height: "30vh",
        maxHeight: "30vh",
    },
    buttonMultiplier: {
        backgroundColor: firstColor,
        color: neutralMain,
        borderRadius: "30px",
        minWidth: "45px",
        height: "45px",

    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        alignContent: "start",
        justifyContent: "end !important"
    },
    inputClassName: {
        borderRadius: 10,
        textAlign: "left"
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
    btn_delete: {
        backgroundColor: thirdColor,
        borderColor: thirdColor,
        color: firstColor,
        '&:hover': {
            borderColor: thirdColor,
            backgroundColor: thirdColor,
            "& > *": {
            //   color: neutralDark,
            }
        },
    },
    btn_business: {
        backgroundColor: neutralMain,
        height:"100px",
        width:"288px",
        margin: "8px",
        borderRadius: 10,
        font: "32px bold",
        '&:hover': {
            borderColor: neutralDark,
            backgroundColor: neutralMain,
            "& > *": {
                color: neutralDark,
            }
        },
    },
    btn_logout: {
        height:"36px",
        width:"130px",
    },
    font_business: {
        fontSize: "32px",
        fontWeight: "bold",
    },
    font_logout: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    btn_add: {
        color: firstColor,
        '&:hover': {
            "& > *": {
            //   color: neutralDark,
            }
        },
    },
    show: {
        display: "block",
    },
    title : {
        marginTop: "5px",
        marginBottom: "10px",
    },
    center : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
// })
}));

export const modalStyleSaveExternal = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    scrollbarWidth: "none",
    margin: "auto",
    padding:"0",
};