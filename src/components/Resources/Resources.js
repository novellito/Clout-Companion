import React from 'react';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import CoppingGuide from './ResourceSubcomponents/CoppingGuides';
import ShippingRes from './ResourceSubcomponents/ShippingRes';
import RowContainer from '../../hoc/rowContainer';
import Bots from './ResourceSubcomponents/Bots';
import ProSer from './ResourceSubcomponents/ProSer';
import Slang from './ResourceSubcomponents/Slang';
import './Resources.css';

const Resources = () => {
  return (
    <div>
      <AppNavbar />
      <RowContainer>
        <h1 className="comp-title">Resources</h1>
        <Collapsible>
          <CollapsibleItem header="Copping Guides">
            <CoppingGuide />
          </CollapsibleItem>
          <CollapsibleItem header="Shipping Resources">
            <ShippingRes />
          </CollapsibleItem>
          <CollapsibleItem header="Bots">
            <Bots />
          </CollapsibleItem>
          <CollapsibleItem header="Proxies & Servers">
            <ProSer />
          </CollapsibleItem>
          <CollapsibleItem header="Slang">
            <Slang />
          </CollapsibleItem>
        </Collapsible>
      </RowContainer>
    </div>
  );
};

export default Resources;
