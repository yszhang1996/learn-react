/**
 * api接口统一管理
 */
import axios from './'
import { listByPhoneData, ArticleType, IndexArticleData, TradeAnnoParams, NoticeListType, NewsDetailType, DictDetailType, ArticleListType, TradeAnnoListType, SumNewslistType, SumPolicylistType, CodeBase64Type, saveSuggestCommitParams, tradeAnnoTradeTypeParams, tradeAnnoTradeTypeList, tradeAnnoTradeTypeChildren, annoReceiveListType, AnnouncementT, getAnnoReceiveStatisticsType, todayT } from "../types"

// 获取登录时的图片验证码
export const getVerifyImg = () => axios.post<{ data: { yzm: string, auth: string } }>('/unified/sys/getVerifyImg', {})

// 登录
export const entryHome = (params: {
    account: string,
    password: string,
    useryzm: string,
    auth: string,
}) => axios.post<{ data: { token: string, phone: string, menuTree: [] } }>('/unified/sys/entryHome', params, true)

// 获取字典详情
export const getDictDetail = (params: { dictName: string }) => axios.get<{ content: DictDetailType[] }>('/api/dictDetail', params)

// 获取首页顶部（通知公告、工作动态、政策法规）文章列表
export const getIndexArticle = () => axios.post<IndexArticleData>('/api/frontData/getIndexArticle')
// 获取首页顶部轮播图信息
export const getPicNews = (params: { limit: number }) => axios.post<ArticleType[]>('/api/frontData/getPicNews', params, true)
// 获取首页 今日发布
export const getAnnoReceiveStatistics = () => axios.get<{ data: getAnnoReceiveStatisticsType<todayT> }>('api/annoReceive/getAnnoReceiveStatistics')
// 获取首页各种公告信息
export const tradeAnnoList = (params: TradeAnnoParams) => axios.post<{ content: NoticeListType[], totalElements: number }>('/api/tradeAnno/list', params)
export const annoReceiveList = (params: TradeAnnoParams) => axios.post<annoReceiveListType<AnnouncementT>>('/api/annoReceive/list ', params)
// 交易公开 - 左侧导航
export const tradeAnnoTradeType = (params: tradeAnnoTradeTypeParams) => axios.post<tradeAnnoTradeTypeList<tradeAnnoTradeTypeChildren[]>[]>('/api/tradeAnno/tradeType', params, true)

// 获取文章列表
export const getArticleList = (params: ArticleListType) => axios.post<{ content: NewsDetailType[], totalElements: number }>('/api/articleInfo/list', params)
// 获取汇总的新闻列表
export const sumNewslist = () => axios.post<SumNewslistType>('/api/articleInfo/sumNewslist')
// 获取汇总的政策法规列表
export const sumPolicylist = () => axios.post<SumPolicylistType>('/api/articleInfo/sumPolicylist')
// 获取文章（新闻）详情
export const getNewsDetail = (params: { id: number }) => axios.post<NewsDetailType>('/api/articleInfo/getOne', params, true)
// 获取文章（公告）详情
export const getNoticeDetail = (params: { id: number }) => axios.post<NewsDetailType>('/api/tradeAnno/getOneDetail', params, true)

// 交易查询-交易公开
export const getTradeAnnoList = (params: TradeAnnoListType) => axios.post<{ content: ArticleType[], totalElements: number }>('/api/tradeAnno/list', params)

// 投诉异议处理-获取验证码（base64图片）
export const getCodeBase64 = () => axios.get<CodeBase64Type>('/api/code/code')
// 投诉异议处理-提交我的投诉
export const saveSuggestCommit = (params: saveSuggestCommitParams) => axios.post('/api/suggestCommit/save', params)
// 投诉异议处理-查询我的投诉列表
export const listByPhone = (params: { size: number, page: number, phone: string }) => axios.post<{ content: listByPhoneData[], totalElements: number }>('/api/suggestCommit/listByPhone', params)


