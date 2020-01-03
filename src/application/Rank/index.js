import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getRankList } from './store/actionCreators'
import { filterIndex } from "../../api/utils"
import Scroll from "../../baseUI/scroll"
import Loading from '../../baseUI/loading';
import { EnterLoading } from './../Singers/style';
import { renderRoutes } from 'react-router-config';
import { Container, List, ListItem, SongList } from './style';

function Rank(props) {
    const { rankList, loading } = props;

    const { getRankListDataDispatch } = props;

    useEffect(() => {
        getRankListDataDispatch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let rankListJS = rankList ? rankList.toJS() : [];
    let globalStartIndex = filterIndex(rankListJS);
    let officialList = rankListJS.slice(0, globalStartIndex);
    let globalList = rankListJS.slice(globalStartIndex);


    // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.trackUpdateTime + index} tracks={item.tracks} >
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="decorate"></div>
                                    <span className="update_frequecy">{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={item.trackUpdateTime}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null;
    }

    // 榜单数据未加载出来之前都给隐藏
    let displayStyle = loading ? { "display": "none" } : { "display": "" };

    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}> 官方榜 </h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList, true)}
                    {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading']),
});

const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList());
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));