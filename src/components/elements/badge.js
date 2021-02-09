import React from 'react';
import styled from 'styled-components';

const Badge = ({className, children}) => (
    <label className={className}>
        {children}
    </label>
)
const StyledBadge = styled(Badge)`
    border-radius: 40px;
    padding: 0px 15px;
    display: inline-block;
    line-height: 26px;
    font-weight: bold;
    font-size: .7rem;
    background-color: rgba(100, 100, 100, .1);
    ${props =>
        props.error ? `
            background-color: rgba(255, 114, 133, .2);
        ` : ''
    }
    ${props =>
        props.success ? `
            background-color: rgba(105, 228, 166, .3);
        ` : ''
    }
`;

export default StyledBadge;