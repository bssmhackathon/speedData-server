const express = require("express");
const SpeedData = require("../models/SpeedData");
const BeforeSpeedData = require("../models/BeforeSpeedData");
const whyrano = require("../models/whyrano");
const before = require("../models/before");
const Stop = require("../models/Stop");
const router = express.Router();

// GET /
router.get('/main', async (req, res) => {
  try {
    const speedData = await SpeedData.findOne({ where: { speed_id: 1 } });
    const bspeedData = await BeforeSpeedData.findOne({ where: { bspeed_id: 1 } });
    if(bspeedData >= speedData +20){
        await before.create({ before_speed: speedData.speed });
    }
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

// POST /main
router.post('/main', async (req, res) => {
    const { value } = req.body;
    try {
      const whyranoRecord = await whyrano.findOne({ where: { whyrano_id: 1 } });
  
      if (whyranoRecord) {
        whyranoRecord.whyrano = value;
        await whyranoRecord.save();
        res.status(200).json({ whyrano: whyranoRecord.whyrano });
      } else {
        res.status(404).json({ message: 'whyrano_id가 1인 데이터를 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '데이터 업데이트 중 오류가 발생했습니다.' });
    }
  });

  router.post('/stop', async (req, res) => {
    const { value } = req.body;
    try {
      const StopRecord = await Stop.findOne({ where: { stop_id: 1 } });
  
      if (StopRecord) {
        StopRecord.stop = value;
        await StopRecord.save();
        res.status(200).json({ stop: StopRecord.stop });
      } else {
        res.status(404).json({ message: 'stop_id 1인 데이터를 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '데이터 업데이트 중 오류가 발생했습니다.' });
    }
  });

// router.get('/before', async (req, res) => {
//     try {
//       const beforeData = await Before.findAll();
//       if (beforeData.length > 0) {
//         res.status(200).json(beforeData);
//       } else {
//         res.status(404).json({ message: 'before 테이블에 데이터가 없습니다.' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '데이터 조회 중 오류가 발생했습니다.' });
//     }
//   });

module.exports = router;