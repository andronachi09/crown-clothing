import { AnyAction } from "redux";

type Matchable<ActionCreator extends () => AnyAction> = ActionCreator & {
    type: ReturnType<ActionCreator>['type'];
    match(action: AnyAction): action is ReturnType<ActionCreator>;
};

//utility function that receives some action creator in order to create a new matchable type out of that action creator
export function withMatcher<ActionCreator extends () =>
    AnyAction & { type: string }>(actionCreator: ActionCreator): Matchable<ActionCreator>;

export function withMatcher<ActionCreator extends (...args: any[]) =>
    AnyAction & { type: string }>(actionCreator: ActionCreator): Matchable<ActionCreator>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T
    payload: P
};

export type Action<T> = {
    type: T
};

//function overloading: provides the ability to make multiple function type definitions of the same name
//we always want to export overload definitions
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload}
};