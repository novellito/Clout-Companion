import React from 'react';
import AppNavbar from '../AppNavbar/AppNavbar';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import CoppingGuide from './CoppingGuides';
const Resources = () => {
  return (
    <div>
      <AppNavbar />
      <div className="row">
        <div className="col s12 m10 l6 offset-l3 offset-m1 ">
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
        </div>
      </div>
    </div>
  );
};

export default Resources;
