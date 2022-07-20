const catchAsync = require("../utils/catchAsync");
const revenueStatisticService = require("../services/revenueStatistic.service");
const { sendSuccess } = require("../libs/response");
const { revenueStatisticMsg } = require("../utils/Message");

const getRevenueStatistic = catchAsync(async(req, res) => {
    const revenueStatistic = await revenueStatisticService.getRevenueStatistic(req.body);
    sendSuccess({res, data: revenueStatistic, message: revenueStatisticMsg.success});
});

module.exports = {
    getRevenueStatistic,
};