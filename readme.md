## 使用

```html
<!-- 样式文件 -->
<link rel="stylesheet" href="//unpkg.com/yie@0.0.19/dist/yie.css">

<!-- 依赖包 -->
<script src="//unpkg.com/preact"></script>
<script src="//unpkg.com/preact-transition"></script>
<script src="//unpkg.com/preact-utils"></script>
<script src="//unpkg.com/preact-router"></script>

<!-- 加载所有组件 -->
<script src="//unpkg.com/yie"></script>

<!-- 按需加载 -->
<link rel="stylesheet" href="//unpkg.com/yie@0.0.19/dist/Avatar/style.css">
<script src="//unpkg.com/yie@0.0.19/dist/Avatar/Avatar.umd.js"></script>
```


## 颜色

```less

@ui-color-light        : #fff;
@ui-color-light-neutral: #e4f5ef;
@ui-color-dark         : #2c3e50;
@ui-color-dark-neutral : #4f6f7f;
@ui-color-darker       : #1d2935;
@ui-color-primary      : #2196f3;
@ui-color-accent       : #6806c1;
@ui-color-danger       : #e83030;
@ui-color-warning      : #ea6e00;
@ui-color-info         : #03c2e6;
@ui-color-success      : #42b983;
```


## 基本参数类型定义

- type Scenery = 'danger' | 'warning' | 'info' | 'success';
- type Colorant = 'primary' | 'accent' | Scenery;


## 组件


- AppActivity

    - snackbarTransition?: 'slide' | 'fade';
    - navIcon?: string;
    - onNavClick?: (e: Event) => void;
    - onActionClick?: (e: Event) => void;
    - onMenuClick?: (e: Event) => void;
    - actions?: Action[];
    - maxActionCount?: number;
    - title?: string;
    - shadowed?: boolean;
    - color?: Colorant;
 
- AppLayout

    - history?: any;
    - onRouterChange?: (args: RouterOnChangeArgs) => void;

- Avatar

    - color?: Colorant;
    - size?: string | number;
    - tile?: boolean;

- BottomNavigation

    - textColor?: Colorant;
    - backgroundColor?: Colorant;
    - selectedTextColor?: string;
    - type?: 'absolute' | 'fixed' | 'static';
    - items?: Array<string | BottomNavigationItem>;
    
        - BottomNavigationItem
            - text?: string;
            - icon?: string;
            - onClick?: (e: Event, item?: string | BottomNavigationItem) => void;
    
    - selected?: number;
    - onItemClick?: (e: Event, item: BottomNavigationItem) => void;

- Button

    - color?: Colorant;
    - size?: 'big' | 'small';
    - type?: 'flat' | 'raised' | 'outline',
    - disabled?: boolean;
    - leftIcon?: string;
    - rightIcon?: string;
    - loading?: boolean | 'inline';
    - value?: string | number;
    - component?: string;
    - block?: boolean;
    - round?: boolean;
    - onClick?: EventListener;

- Dialog

    - display?: boolean;
    - dimmed?: boolean;
    - docked?: boolean;
    - title?: string;
    - onHide?: Function;
    - onShow?: Function;
    - onButtonClick?: Function;
    - okValue?: string;
    - cancelValue?: string;
    - onOk?: Function;
    - onCancel?: Function;
    - dismiss?: any;
    - onDismiss?: Function;
    - buttons?: Array<string | DialogButton>;

- Icon 

    - color?: Colorant;
    - name: string;
    - size?: 'small' | 'medium' | 'big' | 'large' | 'huge' | 'gigantic';
    - onClick?: EventListener;
  
- IconButton 

    - color?: Colorant;
    - size?: 'big' | 'small';
    - type?: 'flat' | 'raised' | 'outline',
    - disabled?: boolean;
    - icon?: string;
    - loading?: boolean;
    - component?: string;
    - round?: boolean;
    - onClick?: EventListener;
  
- Input

    - type?: 'text' | 'password' | 'number' | 'email';
    - value?: string | number;
    - alt?: string;
    - name?: string;
    - placeholder?: string;
    - id?: string;
    - maxLength?: number;
    - minLength?: number;
    - max?: number;
    - min?: number;
    - autocomplete?: string | boolean;
    - autofocus?: string | boolean;
    - pattern?: string | RegExp;
    - formnovalidate?: string;
    - form?: string;
    - list?: string;
    - disabled?: boolean;
    - readonly?: boolean;
    - required?: boolean;
    - onChange?: EventListener;
    - onInput?: EventListener;
    - onFocus?: EventListener;
    - onBlur?: EventListener;
    - onKeyUp?: EventListener;
    - onKeyDown?: EventListener;
    - onKeyPress?: EventListener;
    - loading?: 'left' | 'right';
    - leftIcon?: string;
    - rightIcon?: string;
    - status?: Scenery;
    - size?: 'big';
    - flat?: boolean;
    - multiple?: boolean;
    - block?: boolean;
    - rows?: number;

- LoadingIndicator 
    
    - color?: Colorant;
    - size?: 'small' | 'big';
    - overlay?: boolean;
    - inline?: boolean;

- Menu 

    - open?: boolean;
    - component?: string;
    - raised?: boolean;
    - origin?: 'top left' | 'top right' | 'bottom left' | 'bottom right' | string;
    - items?: Array<MenuItemProps | string | boolean | MenuItem>;
    - onBeforeOpen?: Function;
    - onOpen?: Function;
    - onAfterOpen?: Function;
    - onBeforeClose?: Function;
    - onClose?: Function;
    - onAfterClose?: Function;

- MenuItem

    - text?: string;
    - icon?: string;
    - selected?: boolean;
    - disabled?: boolean;
    - component?: string;
    - onClick?: EventListener;
  
- ProgressBar

    - indeterminate?: boolean;
    - progress?: number;
    - color?: Colorant;

- Radio

    - name?: string;
    - label?: string;
    - value?: any;
    - color?: Colorant;
    - labelPosition?: 'left' | 'right';
    - disabled?: boolean;
    - onBlur?: EventListener;
    - onFocus?: EventListener;
    - onChange?: (e: Event, active: boolean) => void;
    - children?: any[];

- Ripple

    - component?: string | Component;
    - ref?: Function;
    - __center__?: boolean;
  
- RippleInk

    - trigger: Element | (() => Element);
    - center?: boolean;

- Sheet

    - display?: boolean;
    - dimmed?: boolean;
    - docked?: boolean;
    - position?: 'top' | 'right' | 'bottom' | 'left';
    - floating?: boolean;
    - onShow?: Function;
    - onHide?: Function;
    - bodyStyle?: string | Record<string, any>;
    - bodyClassName?: string | string[] | Record<string, any>;
 
- Snackbar

    - message?: string | VNode | JSX.Element;
    - action?: string;
    - actionColor?: Colorant;
    - status?: Scenery;
    - onClick?: EventListener;
    - onActionClick?: EventListener;
    - onShow?: (value?: any) => void;
    - onHide?: (value?: any) => void;
    - onTimeout?: (value?: any) => void;
    - display?: boolean;
    - animation?: 'slide' | 'fade';
    - floating?: boolean;
    - position?: SnackbarPosition;
    - onAnimating?: (value: SnackbarProps) => void;
    - timeout?: number;

- SnackbarContainer

    - queueSnackbars?: boolean;
    - duration?: number;
    - position?: SnackbarPosition;
    - transition?: 'slide' | 'fade';
  
- Text
    
    - lines?: number;
    - value?: string;
    - ellipsis?: boolean;
    - size?: number | string;
    - color?: Colorant;

- Tipbox

    - title?: string;
    - onButtonClick?: Function;
    - okValue?: string;
    - cancelValue?: string;
    - onOk?: Function;
    - onCancel?: Function;
    - dismiss?: any;
    - onDismiss?: Function;
    - buttons?: Array<string | DialogButton>;
    

- Toolbar

    - navIcon?: string;
    - onNavClick?: EventListener;
    - onActionClick?: EventListener;
    - onMenuClick?: EventListener;
    - actions?: Action[];
    - maxActionCount?: number;
    - title?: string;
    - shadowed?: boolean;
    - color?: Colorant;
