import Entity from './Entity';
export declare type ComponentKeyOf<C> = keyof C;
export declare type ComponentOf<C> = C[keyof C];
export declare const getComponentTypeFromClass: (klass: any) => string;
export default abstract class Component<T extends any> {
    value: T;
    readonly type: string;
    constructor(value: T);
    onAttach(entity: Entity<any>): void;
    onDetach(entity: Entity<any>): void;
}
export interface ComponentTypes {
    [key: string]: Component<any>;
}
//# sourceMappingURL=Component.d.ts.map