import React, { Component } from 'react';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import RowContainer from '../../hoc/rowContainer';
import CoppingGuide from '../../components/Resources/ResourceSubcomponents/CoppingGuides';
import ShippingRes from '../../components/Resources/ResourceSubcomponents/ShippingRes';
import Bots from '../../components/Resources/ResourceSubcomponents/Bots';
import ProSer from '../../components/Resources/ResourceSubcomponents/ProSer';
import Slang from '../../components/Resources/ResourceSubcomponents/Slang';
import '../../components/Resources/Resources.css';

class Resources extends Component {
    render() {
        return (
            <div>
                <AppNavbar history={this.props.history} />
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
    }
};

export default Resources;
