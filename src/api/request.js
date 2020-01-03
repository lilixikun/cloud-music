import { axiosInstance } from "./config";

//获取轮播图
export const getBannerRequest = () => {
    return axiosInstance.get('/banner');
}

//获取推荐歌曲列表
export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized');
}


//获取热门歌手列表
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

//歌手分类列表
export const getSingerListRequest = (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

//所有榜单内容摘要
export const getRankListRequest = () => {
    return axiosInstance.get (`/toplist/detail`);
  };