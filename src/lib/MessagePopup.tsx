import { Snackbar, Slide, Color } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

type NewProps = {
  message: string;
  open: boolean | undefined;
  setOpen : (arg0: boolean) => void;
  handleClose : () => void;
};

const MessagePopup = (props : NewProps) => {
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };
  return (
    <Snackbar open={props.open} onClose={handleClose} autoHideDuration={2000}>
      <Alert onClose={() => handleClose("click", "clickaway")}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default MessagePopup;
