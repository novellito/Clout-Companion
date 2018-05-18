import React from 'react';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import CoppingGuide from './ResourceSubcomponents/CoppingGuides';
import WTBS from './ResourceSubcomponents/WTBS';
import RowContainer from '../../hoc/rowContainer';
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
          <CollapsibleItem header="Where to buy/sell">
            <WTBS />
          </CollapsibleItem>
          <CollapsibleItem header="Bots">
            {/* <CoppingGuide /> */}
          </CollapsibleItem>
          <CollapsibleItem header="Proxies & Servers">
            {/* <CoppingGuide /> */}
          </CollapsibleItem>
          <CollapsibleItem header="Shipping Resources">
            {/* <CoppingGuide /> */}
          </CollapsibleItem>
          <CollapsibleItem header="Slang">
            {/* <CoppingGuide /> */}
          </CollapsibleItem>
        </Collapsible>
      </RowContainer>
    </div>
  );
};

export default Resources;
