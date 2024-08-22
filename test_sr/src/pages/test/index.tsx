import React, { useState, useEffect, useLayoutEffect } from 'react';
import Children from './children';

function CountdownTimer() {
  // 定义计时状态
  const [seconds, setSeconds] = useState(10);

  // 使用useEffect来启动定时器
  useEffect(() => {
    console.log("触发useEffect");
    
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
      console.log("触发useEffect卸载");
        if(intervalId){
            clearInterval(intervalId)
        }
    };
  }, [seconds]);
  useEffect(()=>{
    console.log("触发useEffectfather");
  },[])
  useLayoutEffect(()=>{
    console.log("触发useLayoutEffect");
    
  },[])

  // 渲染倒计时
  return (
    <div>
      {seconds > 0 ? (
        <h1>{seconds} 秒后开始</h1>
      ) : (
        <h1>比赛开始</h1>
      )}
      <Children />
    </div>
  );
}

export default CountdownTimer;