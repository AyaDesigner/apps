import React, { HTMLAttributes, forwardRef, ReactNode, Ref } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export interface StyledButtonProps {
  buttonSize?: ButtonSize;
  iconOnly?: boolean;
}

export interface BaseButtonProps {
  buttonSize?: ButtonSize;
  loading?: boolean;
  pressed?: boolean;
  tag?: React.ElementType;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  displayClass?: string;
}

export type AllowedTags = keyof Pick<JSX.IntrinsicElements, 'a' | 'button'>;
export type AllowedElements = HTMLButtonElement | HTMLAnchorElement;

export type ButtonProps<Tag extends AllowedTags> = BaseButtonProps &
  HTMLAttributes<AllowedElements> &
  JSX.IntrinsicElements[Tag];

export const Button: React.ForwardRefRenderFunction<
  AllowedElements,
  StyledButtonProps & ButtonProps<AllowedTags>
> = <TagName extends AllowedTags>(
  {
    loading,
    pressed,
    icon,
    rightIcon,
    buttonSize,
    children,
    tag: Tag = 'button',
    className,
    displayClass,
    ...props
  }: StyledButtonProps & ButtonProps<TagName>,
  ref?: Ref<HTMLButtonElement>,
) => {
  const iconOnly = icon && !children && !rightIcon;
  return (
    <Tag
      {...(props as StyledButtonProps)}
      aria-busy={loading}
      aria-pressed={pressed}
      ref={ref}
      className={classNames(
        { iconOnly },
        buttonSize,
        'btn relative flex-row items-center justify-center border typo-callout font-bold no-underline shadow-none cursor-pointer select-none focus-outline',
        displayClass || 'flex',
        className,
      )}
    >
      {icon}
      {children && <span>{children}</span>}
      {rightIcon}
      {loading && (
        <Loader
          data-testid="buttonLoader"
          className="btn-loader absolute left-0 right-0 top-0 bottom-0 m-auto hidden"
        />
      )}
    </Tag>
  );
};

export const ForwardedButton = forwardRef(Button);
