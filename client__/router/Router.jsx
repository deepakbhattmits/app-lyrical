import {lazy, Suspense} from 'react';
import {HashRouter,Route,Switch,useHistory} from 'react-router-dom';
import LoadingSpinner from '../components/reusable/LoadingSpinner';
const SongList =lazy(()=>import('../components/SongList'));
const SongCreate =lazy(()=>import('../components/SongCreate'));
const NotFound=lazy(() => import('../components/NotFound'));
const SongDetail =lazy(()=>import('../components/SongDetail'));
const Router=() => {
    const history=useHistory();
    return <Suspense fallback={<LoadingSpinner/>}>

    <HashRouter history={history} >
        <div className='container'>
        <Switch>
        <Route exact path='/' component={SongList} />
        <Route exact path='/songs/new' component={SongCreate} />
        <Route exact path='/songs/:id' component={SongDetail} />
        <Route exact path='**' component={NotFound}/>
        </Switch>
          </div>
      </HashRouter>
    </Suspense>
}
export default Router