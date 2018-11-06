import * as React from 'react';
import * as WFace from '@wface/components';
import CommandHighlight from '../docs/cli/commands/CommandHighlight'

export default class Usage extends React.Component<any, any> {
  public render() {
    return (
      <WFace.WCard style={{height:'100%'}}>
        <WFace.WCardHeader 
          title={<WFace.WTypography variant="headline" >Kullanım</WFace.WTypography> } 
          avatar={<WFace.WIcon color="primary" style={{fontSize:25}}>check_circle_outline</WFace.WIcon>}/>
        <WFace.WCardContent>
          <WFace.WList>
            <CommandHighlight command="wface create project" dscr="Yeni proje oluştur"/>            
            <CommandHighlight command="cd <proje-adi>" dscr="Proje dizinine git"/>            
            <CommandHighlight command="npm start" dscr="Oluşturduğumuz ekranı tarayıcıda görmek için wface uygulamasını çalıştır"/>
          </WFace.WList>
          <WFace.WTypography variant="caption">
            Bundan sonra kendi ekranlarınızı geliştirebilirsiniz. 
          </WFace.WTypography>
        </WFace.WCardContent>
      </WFace.WCard>
    );
  }
}

