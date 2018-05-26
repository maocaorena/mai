import API from '@/api/API.js';
const api = new API();

const waji = {
    state: {
        rightBarFun: null
    },
    mutations: {
        setRightBar: (state, data) => {
            state.rightBarFun = data;
        }
    }
};

export default waji;
