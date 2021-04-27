import dva from 'dva';
import './index.css';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// 1. Initialize
const app = dva({
    history: createBrowserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/products').default);

//引入models
require("./models").default.forEach(key => {
    app.model(key.default);
});


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
