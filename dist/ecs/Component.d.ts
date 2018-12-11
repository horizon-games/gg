import Entity from './Entity';
export declare const getComponentTypeFromClass: (klass: any) => string;
export default class Component {
    readonly type: string;
    value?: any;
    constructor(value?: any);
    onAttach(entity: Entity<any>): void;
    onDetach(entity: Entity<any>): void;
}
export interface ComponentTypes {
    [key: string]: Component;
}
//# sourceMappingURL=Component.d.ts.map