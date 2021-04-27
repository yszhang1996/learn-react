const Layout = (props) => {
    console.log(props);
    return (
        <div>
            <h2>Layout</h2>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;
