import { Interpreter, Machine, MachineConfig } from 'xstate';
import config from '../../constants/config';
import { Storage } from '../../utils/storage';

interface AppStateSchema {
  states: {
    user: {
      states: {
        loggedOut: Record<string, never>;
        loggedIn: Record<string, never>;
      };
    };
    drawer: {
      states: {
        closed: Record<string, never>;
        opened: Record<string, never>;
      };
    };
    debug: {
      states: {
        disabled: Record<string, never>;
        enabled: {
          states: {
            xstateInspect: {
              states: {
                idle: Record<string, never>;
                launch: Record<string, never>;
              };
            };
          };
        };
      };
    };
  };
}

// The events that the machine handles
export type AppEvent =
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'OPEN_XSTATE_INSPECT' }
  | { type: 'USER_LOGIN' }
  | { type: 'USER_LOGOUT' };

// The context (extended state) of the machine
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppContext {}

export type AppMachineType = MachineConfig<AppContext, AppStateSchema, AppEvent>;
export type AppServiceType = Interpreter<AppContext, AppStateSchema, AppEvent>;

export default Machine<AppContext, AppStateSchema, AppEvent>(
  {
    key: 'app',
    type: 'parallel',
    states: {
      user: {
        initial: 'loggedOut',
        states: {
          loggedOut: {
            on: {
              USER_LOGIN: 'loggedIn'
            }
          },
          loggedIn: {
            on: {
              USER_LOGOUT: 'loggedOut'
            }
          }
        }
      },
      drawer: {
        initial: 'closed',
        states: {
          closed: {
            on: {
              TOGGLE_DRAWER: 'opened'
            }
          },
          opened: {
            on: {
              TOGGLE_DRAWER: 'closed'
            }
          }
        }
      },
      debug: {
        initial: 'disabled',
        states: {
          disabled: {
            always: [{ target: 'enabled', cond: 'isDebugEnabled' }]
          },
          enabled: {
            type: 'parallel',
            states: {
              xstateInspect: {
                initial: 'idle',
                states: {
                  idle: {
                    entry: () => Storage.disableXStateInspect(),
                    on: {
                      OPEN_XSTATE_INSPECT: 'launch'
                    }
                  },
                  launch: {
                    entry: () => {
                      Storage.enableXStateInspect();
                      location.reload();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    guards: {
      isDebugEnabled: () => {
        return config.isDebugEnabled;
      }
    }
  }
);
