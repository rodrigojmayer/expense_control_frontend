// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { Box,
         Typography,
         Button, 
        } from "@mui/material";
import { useStylesGlobal } from '../Styles'

interface ChildProps {
    hiddenPanel:  boolean
    selectPayment: (newData: number) => void
}

export default function PaymentMethodMenuModal(
  {   
      hiddenPanel, 
      selectPayment
  }: ChildProps )  {
  const { classes } = useStylesGlobal();

  return (
    <div
      hidden= {hiddenPanel}
    >
    <Box className={classes.customBoxRow}>
      <h2>
        Método de pago
      </h2>
    </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectPayment(0)}
        >
        <Typography
          className={` ${classes.font_business}`}
        >
          MobilePay
        </Typography>
        </Button>
      </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectPayment(1)}
        >
          <Typography
            className={` ${classes.font_business}`}
          >
            Cash
          </Typography>
        </Button>
      </Box>
      <Box className={classes.customBoxRow}>
        <Button 
          className={` ${classes.btn_business}`}
          onClick={() =>selectPayment(2)}
        >
          <Typography 
            className={` ${classes.font_business}`}
          >
            Revolut
          </Typography>
        </Button>
      </Box>
    </div>
  )
}