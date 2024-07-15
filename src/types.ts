export type item = {
    name: string;
    id: string;
    type: string;
    icon: string;
}
export type CrumpData = {
    body: item[];
    hair: item[];
    expression: item[];
    arms: item[];
    legs: item[];
    head: item[];
    accessory: item[];
};
export type SelectData = {
    body: string;
    hair: string;
    expression: string;
    arms: string;
    legs: string;
    head: string;
    accessory: string;
}