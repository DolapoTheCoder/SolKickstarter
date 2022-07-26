//layout component

//called at each page

import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Menu.Item>CrowdConrtact</Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>Campaign</Menu.Item>
                <Menu.Item >+</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;