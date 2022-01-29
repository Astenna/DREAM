import React, {CSSProperties} from 'react';
import {Layout} from 'antd';

/**
 * Default layout, taking whole height by default.
 */
const DefaultLayout = (props: { children?: React.ReactNode, style?: CSSProperties }) => {
    return (
        <Layout style={{...props.style, minHeight: '100vh'}}>
            {props.children}
        </Layout>
    );
};

export default DefaultLayout;