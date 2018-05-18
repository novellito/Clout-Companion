import React from 'react';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import CoppingGuide from './CoppingGuides';
import RowContainer from '../../hoc/rowContainer';
const Resources = () => {
  return (
    <div>
      <AppNavbar />
      <RowContainer>
        <h1 className="comp-title">Resources</h1>
        <Collapsible>
          <CollapsibleItem header="Copping Guides">
            Item1
            <CoppingGuide />
          </CollapsibleItem>
          <CollapsibleItem header="Where to buy/sell">
            Item1
            <CoppingGuide />
          </CollapsibleItem>
          <CollapsibleItem header="Bots">
            Item1
            <CoppingGuide />
          </CollapsibleItem>
          <CollapsibleItem header="Proxies & Servers">
            Item1
            <CoppingGuide />
          </CollapsibleItem>
          <CollapsibleItem header="Shipping Resources">
            Item1
            <CoppingGuide />
          </CollapsibleItem>
          <CollapsibleItem header="Slang">
            Item1
            <CoppingGuide />
          </CollapsibleItem>
        </Collapsible>
      </RowContainer>
    </div>
  );
};

export default Resources;
