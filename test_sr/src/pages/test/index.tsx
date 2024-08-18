import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  // 定义计时状态
  const [seconds, setSeconds] = useState(10);

  // 使用useEffect来启动定时器
  useEffect(() => {
    let intervalId = null;
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      console.log('比赛开始');
    }

    // 清除定时器，防止内存泄漏
    return () => {
        if(intervalId){
            clearInterval(intervalId)
        }
    };
  }, [seconds]);

  // 渲染倒计时
  return (
    <div>
      {seconds > 0 ? (
        <h1>{seconds} 秒后开始</h1>
      ) : (
        <h1>比赛开始</h1>
      )}
    </div>
  );
}

export default CountdownTimer;