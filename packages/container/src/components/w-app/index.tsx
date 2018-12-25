// We have to provide a Promise polyfill if we're targeting older browsers
// because import() returns a promise which resolves once the module is loaded
import "reflect-metadata";
import { WContainer } from "@wface/container";
import * as React from 'react';
import { store, UserContextActions, UserContext, AppContext } from '@wface/store';
import IOC, { IAuthService, IConfiguration, AuthServiceWrapper, IHttpService, HttpServiceWrapper } from '@wface/ioc';
import DefaultHttpService from './default-http-service';
import WLoginPage from '../w-login-page';

const onLogin = (username: string, displayName: string, token?: string) => store.dispatch(UserContextActions.login({username, displayName, token}));
const { userContext } = store.getState();

class WApp extends React.Component<{configuration: IConfiguration}, any> {
  constructor(props) {
    super(props);

    this.buildIOC();
    const configuration = this.getConfig(props);    

    this.state = {
      configuration: configuration
    }
  }

  buildIOC = () => {
    !IOC.isBound("onLogin") &&
    IOC.bind("onLogin").toFunction(onLogin); // Burasi değişmeli

    // Bind contextes
    !IOC.isBound("UserContext") &&
    IOC.bind<UserContext>("UserContext").toFactory(() => store.getState().userContext);
    !IOC.isBound("AppContext") &&
    IOC.bind<AppContext>("AppContext").toFactory(() => store.getState().appContext);    

    // Bind auth service
    !IOC.isBound("IAuthServiceInner") &&
    IOC.bind<IAuthService>("IAuthServiceInner").to(this.props.configuration.authService);
    !IOC.isBound("IAuthService") &&
    IOC.bind<IAuthService>("IAuthService").to(AuthServiceWrapper);

    // Bind http service
    !IOC.isBound("IHttpServiceInner") &&
    IOC.bind<IHttpService>("IHttpServiceInner").to(this.props.configuration.httpService || DefaultHttpService);
    !IOC.isBound("IHttpService") &&
    IOC.bind<IHttpService>("IHttpService").to(HttpServiceWrapper);
  }

  getConfig(props: {configuration: IConfiguration}): IConfiguration {    
    let config = {...props.configuration};
    config.loginScreen = props.configuration.loginScreen || WLoginPage;    
    return config;
  }

  public render() {

    return (
      <WContainer configuration={this.state.configuration} />
    );
  }

  public componentDidMount() {
    document.title = this.props.configuration.title;
  }
}

export default WApp