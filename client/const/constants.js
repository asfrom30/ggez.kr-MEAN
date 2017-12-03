import RESOURCE from './resource/resource.const';

import HERO_MAP from './heromap/heromap.const';
import DIFF_GAMES_MAP from './analyzer-map/diff-games/diff.games.analyzer.map.const';


/* Labels */
import summaryPageLabel from './label/lang/ko-kr/summary.page.label';

export default {
    label : {
        summaryPageLabel : summaryPageLabel,
    },

    config : {
        log : {
            isActivate : false,
            
            /* Log level */
            // logLevel : ['info', 'success', 'warn', 'error'],
            logLevel : ['info', 'success', 'warn', 'error'],
            
            /* Module Name */
            logScope : ['hero.detail'],
        }
    },
    resource : {

    },

    RESOURCE : RESOURCE,

    /* Const Map */
    HERO_MAP : HERO_MAP,
    DIFF_GAMES_MAP : DIFF_GAMES_MAP

};