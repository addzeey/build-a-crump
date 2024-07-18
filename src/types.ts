export type item = {
    name: string;
    id: string;
    type: string;
    icon: string;
}
export type CrumpData = {
    map(arg0: (item: any, index: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    body: item[];
    hair: item[];
    expression: item[];
    arms: item[];
    legs: item[];
    head: item[];
    accessory: item[];
    effect: item[];
};
export type SelectData = {
    body: string;
    hair: string;
    expression: string;
    arms: string;
    legs: string;
    head: string;
    accessory: string;
    effect: string;
}