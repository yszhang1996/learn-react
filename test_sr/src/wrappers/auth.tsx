import React from 'react'
import { Navigate, Outlet, connect } from 'umi';

const auth = (props:{operateJson:{DataSetExport:boolean}}) => {
    if (props.operateJson.DataSetExport) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

const mapStateToProps = (state: { login: { operateJson:{DataSetExport:boolean}; }; }) => {
    return {
        operateJson: state.login.operateJson
    }
}

export default connect(mapStateToProps)(auth);
