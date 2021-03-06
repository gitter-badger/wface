import * as React from 'react';
import { WTabs, WTabsProps } from '../w-tabs';
import { WTab, WTabProps } from '../w-tabs/w-tab';
import { WTabPage } from './w-tab-page';
import { Omit } from '@material-ui/core'

type WTabsPropsBase = Omit<WTabsProps, "defaultValue">

export interface WTabContainerProps extends WTabsPropsBase {
  defaultValue?: number;
  children: React.ReactElement<WTabPage> | React.ReactElement<WTabPage>[]
}

export class WTabContainer extends React.Component<WTabContainerProps, any> {
  static defaultProps = {
    indicatorColor: 'primary',
    textColor: 'primary'
  } as WTabContainerProps

  constructor(props) {
    super(props);
    this.state = {
      tabSelected: this.props.value || this.props.defaultValue || 0,
      title: this.props.title
    }
  }

  public render() {
    const tabSelected = this.props.value || this.state.tabSelected
    // @ts-ignore
    const children = Array.isArray(this.props.children) ? this.props.children[tabSelected].props.children : this.props.children.props.children;
    // @ts-ignore
    const tabs = Array.isArray(this.props.children) ? this.props.children.map((tab, index) => <WTab {...tab.props as WTabProps} />) :
      <WTab {...this.props.children.props as WTabProps} />

    return (
      <React.Fragment>
        {this.state.title}
        {this.props.title}
        <WTabs
          {...this.props as WTabsPropsBase}
          value={tabSelected}
          onChange={(e, value) => this.setState({ tabSelected: value })}>
          {tabs}          
        </WTabs>
        <span key={tabSelected}>
          {children}
        </span>
      </React.Fragment>
    );
  }
}
