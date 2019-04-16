import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMuState } from '../action';

const mapStateToProps = ({ muState }, muStateKeys) => {
    // 默认返回整个数据对象
    if (!muStateKeys) return { muState };
    const _transferObj = {};
    MuStateKeys.forEach(key => {
        MuState[key] && (_transferObj[key] = MuState[key]);
    })
    return { ..._transferObj };
};
const mapDispatchToProps = dispatch => ({
    setMuState: bindActionCreators(setMuState, dispatch)
});

export default (muStateKeys) => connect(state => mapStateToProps(state, muStateKeys), mapDispatchToProps);
