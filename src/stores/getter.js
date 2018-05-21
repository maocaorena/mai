const getters = {
    loginstate: state => state.user.loginstate,
    userInfo: state => state.user.userInfo,
    visitMode: state => state.user.visitMode,
    userType: state => state.user.userType,
    roomList: state => state.user.roomList,
    height: state => state.user.height,
    homeListState: state => state.user.homeListState,
    roomPageNum: state => state.user.roomPageNum,
    roomDetail: state => state.user.roomDetail,
    otherRechargeList: state => state.user.otherRechargeList,
    wajiFreeCount: state => state.waji.wajiFreeCount,
    systemSet: state => state.waji.systemSet,
    logState: state => state.waji.logState,
    gameId: state => state.waji.gameId,
    fpsLogArray: state => state.waji.fpsLogArray,
    networkDelayLogArray: state => state.waji.networkDelayLogArray,
    operationLogArray: state => state.waji.operationLogArray,

};
export default getters
