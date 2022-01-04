export interface State {
    mercenaries: any;
    [props: string]: any;
}

export function state() {
    return {
        mercenaries: {}
    }
}