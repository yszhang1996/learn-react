export type PropsMenu = {
    pageUrl: string;
    icon?: React.ReactNode; // 可选的图标
    powerName: string;
    children?: PropsMenu[]; // 可能有子菜单
};

export type DeptItems = { deptCode: string, deptName: string }[] // 科室列表的结构

export type getCrowdTimeChartParams = {
    center: string; // 院区默认全部
    deptStr: string; // 从其他地方获取的部门字符串
    size: "all" | number; // top数量，默认全部
    startTime?: Date | null; // 开始时间
    endTime?: Date | null; // 结束时间
    timeType?: "year" | "month"; // 年度或月度
    timePeriod?: 0 | 1; // 是否自定义统计时间段
    patientStatus?: 1 | 2; // 统计维度：病例或患者
    treatmentType?: 1 | 2 | 3; // 统计维度：门诊、住院、混合/全部
}

export interface DictDetailType {
    createBy: string;
    createTime: string;
    dictSort: number;
    id: number;
    label: string;
    updateBy: string;
    updateTime: string;
    value: string;
}

export interface ArticleType {
    id: number,
    categoryId?: number,
    categoryType?: number,
    picUrl?: string,
    pubFlag?: number | null,
    title: string,
    updateTime?: string,
    recentUpdate?: number,
    tradeRegion?: string,
    publishTime?: string,
}

// 特殊情况使用interface会有bug
export type IndexArticleData = {
    notice: ArticleType[],
    work: ArticleType[],
    policy: ArticleType[],
}

export interface TradeAnnoParams {
    annoType: string;
    endTime?: string;
    limit: number;
    page: number;
    projectType?: string;
    pubTime?: number;
    startTime?: string;
    title?: string;
    tradeRegionCode?: string;
}
export interface tradeAnnoTradeTypeParams {
    code: string
}
export interface tradeAnnoTradeTypeChildren {
    dictCode: string,
    id: number,
    name: string,
    parentId: number,
    sort: number,
    value: string,
    childrenData?: [] | null,
}
export interface tradeAnnoTradeTypeList<T> {
    name: string,
    dictCode: string,
    id: number,
    sort: number,
    parentId: number,
    value: string,
    childrenData: T,
}

export interface NoticeListType {
    id: number,
    publishTime: string,
    title: string,
    tradeRegion: string,
    content: string,
    fileList: { fileName: string, fileUrl: string }[],
}
export interface getAnnoReceiveStatisticsType<T> {
    today: T,
    total?: []
}
export interface todayT {
    bidWinningResult: number,
    candidatesForBid: number,
    correctionAnnouncement: number,
    prequalification: number,
    tenderAnnouncement: number,
    total: number
}
export interface annoReceiveListType<T> {
    tenderAnnouncement: Array<T>,
    bidAnnouncement: Array<T>,
    correctionAnnouncement: Array<T>
}

export interface AnnouncementT {
    id: number,
    publishTime: string,
    title: string,
    url: string
}
export interface NewsDetailType {
    categoryId: number,
    categoryType: number,
    id: number,
    picUrl: string,
    pubFlag: number,
    title: string,
    content: string,
    updateTime: string,
    fileList: { fileName: string, fileUrl: string }[],
}

export interface ArticleListType {
    categoryId: number,
    categoryType: number,
    limit: number,
    page: number,
    title: string,
}

export interface TradeAnnoListType {
    annoType: string;
    endTime: string;
    limit: number;
    page: number;
    projectType: string;
    pubTime: number | null;
    startTime: string;
    title: string;
    tradeRegionCode: string;
}

export interface SumNewslistType {
    noticeAnnouncement: NewsDetailType[],
    picNews: NewsDetailType[],
    trendsInOtherProvinces: NewsDetailType[],
    workTrends: NewsDetailType[],
}

export interface SumPolicylistType {
    nationalPolicy: NewsDetailType[],
    provincialPolicy: NewsDetailType[],
}

export interface CodeBase64Type {
    uuid: string,
    enabled: number,
    img: string,
}

export interface saveSuggestCommitParams {
    title: string;
    content: string;
    phone: string;
    name: string;
    verifyCode: string;
    verifyCodeId: string;
}

export interface listByPhoneData {
    content: string;
    contentReply: string;
    createTime: string;
    id: number;
    name: string;
    phone: string;
    replyState: number;
    replyTime: string;
    title: string;
}

// 发现一个type和interface的区别，范例如下

// interface interfaceA {
//     b: number,
//     c: number,
// }

// interface interfaceB {
//     [key: string | number | symbol]: number
// }

// let a: interfaceA = {
//     b: 1,
//     c: 1,
// }

// let b: interfaceB = a

// type typeA = {
//     b: number,
//     c: number,
// }

// type typeB = {
//     [key: string | number | symbol]: number
// }

// let a: typeA = {
//     b: 1,
//     c: 1,
// }

// let b: typeB = a