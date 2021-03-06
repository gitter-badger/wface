import * as React from 'react';
import classNames from 'classnames';
import { WChip } from '../../others/w-chip';
import { WIcon } from '../../medias/w-icon';
import { WMenuItem } from '../../lists/w-menu/w-menu-item'
import { WPaper } from '../../layouts/w-paper';
import { WTypography } from '../../others/w-typography';
import { TextField } from '@material-ui/core';
import { WIconButton } from '../../buttons/w-icon-button';
import { components } from 'react-select';

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props}/>;

const Control = (props:any) => 
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />

// Dialogun z-index'i 1300 olarak ayarlanmıs. Bunun da 1400 alarak üzerine cıkması lazım. 
const Menu = (props:any) => 
  <WPaper square className={props.selectProps.classes.paper} {...props.innerProps} style={{zIndex: 9400}}>
    {props.children}
  </WPaper>

const MultiValue = (props:any) => 
  <WChip
    tabIndex={-1}
    label={props.children}
    className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused,
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<WIcon {...props.removeProps}>cancel</WIcon>}
  />

const NoOptionsMessage = (props:any) =>
  <WTypography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </WTypography>

const Option = (props) => 
  <WMenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    {props.children}
  </WMenuItem>

const Placeholder = (props:any) => 
  <WTypography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </WTypography>

const SingleValue = (props:any) => 
  <WTypography className={props.selectProps.classes.singleValue} {...props.innerProps}>
    {props.children}
  </WTypography>

const ValueContainer = (props:any) => <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;

const DropdownIndicator = (props:any) => 
  <components.DropdownIndicator {...props}>
    <WIcon color="disabled" style={{margin: '-20px !important'}}>expand_more</WIcon>
  </components.DropdownIndicator>;

const selectComponents = {
  Control,
  // DropdownIndicator,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};    

export default selectComponents;