/**
 * api接口统一管理
 */
import axios from './'
import { listByPhoneData, ArticleType, IndexArticleData, TradeAnnoParams, NoticeListType, NewsDetailType, DictDetailType, ArticleListType, TradeAnnoListType, SumNewslistType, SumPolicylistType, CodeBase64Type, saveSuggestCommitParams, tradeAnnoTradeTypeParams, tradeAnnoTradeTypeList, tradeAnnoTradeTypeChildren, annoReceiveListType, AnnouncementT, getAnnoReceiveStatisticsType, todayT, DeptItems, getCrowdTimeChartParams } from "../types"

// 获取登录时的图片验证码
export const getVerifyImg = () => axios.post<{ data: { yzm: string, auth: string } }>('/unified/sys/getVerifyImg', {})

// 登录
export const entryHome = (params: {
    account: string,
    password: string,
    useryzm: string,
    auth: string,
}) => axios.post<{ data: { token: string, phone: string, menuTree: [], operateJson: object } }>('/unified/sys/entryHome', params, true)

// 获取是否有当前路由权限
export const viewVisitRecord = (params: { moduleName: string, modulePath: string }) => axios.post<{ content: DictDetailType[] }>('/unified/sys/viewVisitRecord', params)

// 获取科室列表
export const getDepartmentInfos = () => axios.post<{ data: DeptItems }>('/portal/resourceOverview/getDepartmentInfos', {})

// 获取统计信息
export const getCrowdTimeChart = (params: getCrowdTimeChartParams) => axios.post<{ data: any }>('/portal/dataanalysis/getCrowdTimeChart', params)

// 获取门诊和住院统计百分比
export const getCrowdDataIncrement = (params: any) => axios.post<{ data: any }>('/portal/dataanalysis/getCrowdDataIncrement', params)

// 获取顶部门诊数据统计和住院数据统计
export const patientStatistics = (params: any) => axios.post<{ data: any }>('/portal/resourceOverview/patientStatistics', params)

// 获取地图数据
export const getCrowdProvinceChart = (params: any) => axios.post<{ data: any }>('/portal/dataanalysis/getCrowdProvinceChart', params)

// 获取当前疾病列表
export const selectDiseaseSpecTrumTypeList = (params: any) => axios.post<{ data: any }>('/portal/diseasetype/selectDiseaseSpecTrumTypeList', params)

// 获取当前疾病排名TOP10
export const getDiseaseTop = (params: any) => axios.post<{ data: any }>('/portal/dataanalysis/getDiseaseTop', params)

// 获取数据统计
export const getPatientCount = (params: any) => axios.post<{ data: any }>('/portal/dataanalysis/getPatientCount', params)

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


