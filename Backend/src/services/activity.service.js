import activityModel from "../models/activityModel.js"

export const createActivity = async({userId,courseId=null,type,metadeta={}})=>{
await activityModel.create({
    userId,courseId,type,metadeta
})
}
export const getRecentActivities = async (userId) => {
    return await activityModel.find({ userId })
        .populate("courseId", "title thumbnail")
        .sort({ createdAt: -1 })
        .limit(6)
}