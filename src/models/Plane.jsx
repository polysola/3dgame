import { useEffect, useRef, useCallback, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import debounce from "lodash.debounce";

import planeScene from "../assets/3d/plane.glb";

// 3D Model từ: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Plane({ isRotating, setScore, ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);
  const tg = window.Telegram.WebApp;
  const [localScore, setLocalScore] = useState(() => {
    const savedScore = localStorage.getItem('userScore');
    return savedScore ? parseInt(savedScore) : 0;
  });

  // Hàm gửi điểm đến Telegram bot
  const sendScoreToBot = async (finalScore) => {
    if (finalScore === 0) return; // Không gửi nếu điểm bằng 0
    const botToken = "8059271596:AAFAsl83AO_mKUpVm1kIoEyDpL51dxRySxs";
    const chatId = "-1002462829019";
    const userName = tg.initDataUnsafe?.user?.first_name || "Unknown Player";
    const previousHighScore = localStorage.getItem('highScore') || 0;
    const isNewHighScore = finalScore > previousHighScore;

    if (isNewHighScore) {
      localStorage.setItem('highScore', finalScore.toString());
    }

    const message = `
🎮 *${isNewHighScore ? 'NEW HIGH SCORE!' : 'Score Update'}*
━━━━━━━━━━━━━━━━━━━━
👤 *Player*: ${userName}
🎯 *Current Score*: ${finalScore}
🏆 *High Score*: ${isNewHighScore ? finalScore : previousHighScore}
${isNewHighScore ? '🌟 Congratulations on the new record!' : ''}
━━━━━━━━━━━━━━━━━━━━
✨ Keep pushing your limits!
    `;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown", // Sử dụng định dạng Markdown
        }),
      });
    } catch (error) {
      console.error("Error sending score to bot:", error);
    }
  };

  // Hàm debounce để gửi điểm cuối cùng sau khi dừng quay
  const debouncedSendFinalScore = useCallback(
    debounce((finalScore) => {
      sendScoreToBot(finalScore);
    }, 2000),
    []
  );

  // Hiệu ứng khi trạng thái isRotating thay đổi
  useEffect(() => {
    if (isRotating) {
      actions["Take 001"].play();
      setLocalScore((prevScore) => {
        const newScore = prevScore + 1;
        localStorage.setItem('userScore', newScore.toString());
        setScore(newScore); // Đồng bộ với trạng thái cha
        return newScore;
      });
    } else {
      actions["Take 001"].stop();
      debouncedSendFinalScore(localScore); // Gửi điểm cuối cùng sau khi dừng quay
    }

    // Cleanup function để hủy debounce khi component unmount hoặc isRotating thay đổi
    return () => {
      debouncedSendFinalScore.cancel();
    };
  }, [actions, isRotating, debouncedSendFinalScore, setScore]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}

useGLTF.preload(planeScene);
