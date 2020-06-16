import {createStore, combineReducers,applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {createForms} from 'react-redux-form';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {Comments} from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store= createStore(
        combineReducers({
            dishes : Dishes,
            comments:Comments,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback : InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}