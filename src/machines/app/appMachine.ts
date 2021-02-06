import { Interpreter, Machine, MachineConfig } from 'xstate';

interface AppStateSchema {
  states: {
    drawer: {
      states: {
        closed: Record<string, never>;
        opened: Record<string, never>;
      };
    };
  };
}

// The events that the machine handles
type AppEvent = { type: 'TOGGLE_DRAWER' };

// The context (extended state) of the machine
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppContext {}

export type AppMachineType = MachineConfig<AppContext, AppStateSchema, AppEvent>;
export type AppServiceType = Interpreter<AppContext, AppStateSchema, AppEvent>;

export default Machine<AppContext, AppStateSchema, AppEvent>({
  key: 'app',
  type: 'parallel',
  states: {
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
    }
  }
});
