import { Redirect, Route, Switch } from 'react-router-dom';
import ShortLinkPage from './pages/ShortLinkPage/ShortLinkPage';
import CreateLinkPage from './pages/CreateLinkPage/CreateLinkPage';
import LinkViews from './components/LinkViews/LinkViews';
import LinksStat from './components/LinksStat/LinksStat';

const AppRouter = () => (
    <Switch>
        <Route path="/stat/:statisticLink" exact>
            <LinkViews/>
        </Route>
        <Route path="/stat" exact>
            <LinksStat/>
        </Route>
        <Route path="/:shortLink" exact>
            <ShortLinkPage/>
        </Route>
        <Route path="/" exact>
            <CreateLinkPage/>
        </Route>
        <Route path="*">
            <Redirect to="/"/>
        </Route>
    </Switch>
);

export default AppRouter;
