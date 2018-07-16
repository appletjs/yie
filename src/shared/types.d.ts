export type Scenery = 'danger' | 'warning' | 'info' | 'success';
export type Colorant = 'primary' | 'accent' | Scenery;

type MappedStyle = Record<string, any>;
type MappedClass = Record<string, any>;

export type ComponentStyle = string | MappedStyle | Array<string | MappedStyle | any[]>;
export type ComponentClass = string | MappedClass | Array<string | MappedClass | any[]>
