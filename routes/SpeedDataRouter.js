const express = require("express");
const SpeedData = require("../models/SpeedData");
const router = express.Router();

// GET /
router.get('/', async (req, res) => {
  try {
    const speedData = await SpeedData.findOne({ where: { speed_id: 1 } });
    if (speedData) {
      res.status(200).json(speedData.speed);
    } else {
      res.status(404).json({ message: 'speed_id가 1인 데이터를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
