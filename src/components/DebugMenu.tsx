import React, { ReactElement, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/core/SpeedDial';
import { Build as BuildIcon, Timeline as XStateIcon } from '@material-ui/icons';
import SpeedDialAction from '@material-ui/core/SpeedDialAction';
import { AppContext, AppEvent } from '../machines/app/appMachine';
import { useService } from '@xstate/react';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

type Action = {
  icon: ReactElement;
  name: string;
  event: AppEvent;
};

const actions: Action[] = [{ icon: <XStateIcon />, name: 'XState Inspect', event: { type: 'OPEN_XSTATE_INSPECT' } }];

const DebugMenu = (): ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const service = useContext(AppContext);
  const [current, send] = useService(service);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return current.matches('debug.enabled') ? (
    <SpeedDial
      ariaLabel="Debug floating button"
      className={classes.speedDial}
      icon={<BuildIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            send(action.event);
          }}
        />
      ))}
    </SpeedDial>
  ) : null;
};

export default DebugMenu;
