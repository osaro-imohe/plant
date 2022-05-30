import { GridScale } from '@visx/grid/lib/types';
import {
  Arc, Bin, DefaultArcObject, PieArcDatum, ScaleLinear, ScaleOrdinal, ScaleTime,
} from 'd3';
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Column, Row } from 'react-table';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'tertiary' | 'auxilary';
type Containers = 'div' | 'section' | 'main' | 'footer' | 'header' |'nav';
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
top?: number | string;
bottom?: number | string;
right?: number | string;
left?: number | string;
flex?: string;
border?: string;
type?: Containers;
position?: 'absolute' | 'relative' | 'fixed';
width?: string;
height?: string;
marginAuto?: boolean;
block?: boolean;
inline?: boolean;
padding?: string;
flexGrow?: number;
marginTop?: string;
flexBasis?: number;
flexShrink?: number;
marginLeft?: string;
fullWidth?: boolean;
paddingTop?: string;
paddingLeft?: string;
marginRight?: string;
borderRadius?: string;
fullHeight?: boolean;
marginBottom?: string;
paddingRight?: string;
paddingBottom?: string;
backgroundColor?: string;
children?: ReactNode;
overflow?: 'hidden' | 'visible' | 'scroll';
flexDirection?: 'initial' | 'row' | 'column';
flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
justifyContent?:
| 'flex-start'
| 'flex-end'
| 'center'
| 'space-between'
| 'space-around'
| 'space-evenly'
| 'initial';
textAlign?:
| 'center'
| 'end'
| 'inherit'
| 'initial'
| 'justify'
| 'left'
| 'revert'
| 'right'
| 'start'
| 'unset';
alignItems?:
| 'stretch'
| 'center'
| 'flex-start'
| 'flex-end'
| 'baseline'
| 'initial'
| 'inherit';
}

export type TextProps = {
text: string;
bold?: boolean;
light?: boolean;
variant?: Variant;
type?: 'p' | 'span';
size?: Size;
};

type ButtonVariant = Variant | 'gray'

export type ButtonProps = {
size?: Size;
curbed?: boolean;
rounded?: boolean;
loading?: boolean;
disabled?: boolean;
variant?:ButtonVariant;
text?: string | null;
onClick?: Function;
children?: ReactNode | null;
type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type PageProps = {
children: ReactNode;
};

export type TableProps = {
columns: Column[];
data: any;
}

export type TableCell = {
value: string;
};

export type TableRowProps = {
row: Row,
index: string,
selectedRows: string[],
toggleRowSelect: Function
}

export type ChartDimensions = {
width: number;
height: number;
margin: { top: number; right: number; bottom: number; left: number };
}

export type BarChartProps = {
y?: Function;
xMax?: number;
yMax?: number;
xScale: Function;
yScale: Function;
verticalTickAmount?: number;
xAccessor?: Function;
yAccessor: Function;
data: Bin<number, number>[]
dimensions: ChartDimensions;
thresholds: Date[];
events?: boolean;
};

export type Data = {
index: string,
label: string,
sessionId: string,
eventTime: string
}

export type HistogramInfo = {
x: ScaleTime<number, number, never> | null;
y: ScaleLinear<number, number, never> | null;
Y: number[];
thresholds: Date[];
data: Bin<number, number>[];
}
export type PieMap = { minute:number, label: number };
export type ArcType = {
data: PieMap,
endAngle: number,
index: number,
padAngle: number,
value: number
}
export type DonutInfo = {
arc: Arc<any, DefaultArcObject> | null;
arcs: ArcType[];
labelArcs: Arc<any, DefaultArcObject> | null;
allTimeTotal: number;
colorScale: ScaleOrdinal<string, string, never> | null;
}
export type DonutChatProps = DonutInfo & {dimensions: ChartDimensions}

