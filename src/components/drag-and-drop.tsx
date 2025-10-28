import React, { ReactNode, forwardRef, ReactElement } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  DraggableProvided,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          } as any);
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  ),
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };

// 创建支持拖拽的组件包装器
interface DraggableComponentProps {
  children: ReactElement;
  provided: DraggableProvided;
}

const DraggableComponentWrapper: React.FC<DraggableComponentProps> = ({
  children,
  provided,
}) => {
  const { draggableProps, dragHandleProps, innerRef } = provided;

  // 如果 children 是原生 DOM 元素，直接应用 props
  if (typeof children.type === "string") {
    return React.cloneElement(children, {
      ...draggableProps,
      ...dragHandleProps,
      ref: innerRef,
    });
  }

  // 如果是自定义组件，使用 forwardRef 包装
  const ComponentWithRef = forwardRef<HTMLElement, any>((props, ref) =>
    React.createElement(children.type, {
      ...children.props,
      ...props,
      ref,
    }),
  );

  return (
    <ComponentWithRef {...draggableProps} {...dragHandleProps} ref={innerRef} />
  );
};

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return (
            <DraggableComponentWrapper provided={provided}>
              {children}
            </DraggableComponentWrapper>
          );
        }
        return <div />;
      }}
    </Draggable>
  );
};
