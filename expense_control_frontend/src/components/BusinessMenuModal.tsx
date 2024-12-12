// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { Box,
         Typography,
         Button, 
        } from "@mui/material";
import { useStylesGlobal } from '../Styles'

interface ChildProps {
    hiddenPanel:  boolean
    selectBusiness: (newData: number) => void
    signOut: () => void
}

export default function BusinessMenuModal(
  {   
      hiddenPanel, 
      selectBusiness,
      signOut
  }: ChildProps )  {
  const { classes } = useStylesGlobal();

  return (
    <div
        hidden= {hiddenPanel}
    >
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectBusiness(0)}
        > 
          <Typography
            className={` ${classes.font_business}`}
          >
            Agustin
          </Typography>
        </Button>
      </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectBusiness(1)}
        >
          <Typography
            className={` ${classes.font_business}`}
          >
            Belen
          </Typography>
        </Button>
      </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectBusiness(2)}
        > 
          <Typography 
            className={` ${classes.font_business}`}
          >
            Cande
          </Typography>
        </Button>
      </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectBusiness(3)}
        > 
          <Typography
            className={` ${classes.font_business}`}
          >
            Facha Gaucha
          </Typography>
        </Button>
      </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business} ${classes.btn_logout}`}
          onClick={() =>signOut()}
        >
          <Typography className={` ${classes.font_logout}`}>
            Cerrar sesión
          </Typography>
        </Button>
      </Box>
    </div>
  )
}