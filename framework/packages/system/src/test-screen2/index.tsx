import * as React from 'react';
import * as WFace from '@wface/components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom'

interface TestScreen2State {
}

export class TestScreen2 extends React.Component<WFace.BaseScreenProps, TestScreen2State> {
  constructor(props) {
    super(props);

    this.state = this.props.screenData.state || {
    }
  }

  public render() {
    var components = [];
    for(var i=0;i<50;i++){
        components.push(<div> {i}. Line</div>);  
    }

    return (
      <div>
        {components}
      </div>
    )
  }
}