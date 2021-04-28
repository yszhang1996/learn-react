import { FC } from 'react';

const Layout: FC = ({ children }) => {
    return (
        <div>
            <h2>Layout</h2>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Layout;
