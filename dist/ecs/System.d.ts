import EntityManager from './EntityManager';
import { ComponentTypes } from './Component';
interface SystemOptions {
    priority: number;
    enabled: boolean;
}
export default abstract class System<C extends ComponentTypes> {
    readonly type: string;
    enabled: boolean;
    constructor(options?: Partial<SystemOptions>);
    init(_: EntityManager<C>): void;
    abstract update(manager: EntityManager<C>, dt: number, time: number): void;
    enable(): void;
    disable(): void;
}
export {};
//# sourceMappingURL=System.d.ts.map