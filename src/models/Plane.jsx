import { useEffect, useRef, useCallback, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import debounce from "lodash.debounce";

import planeScene from "../assets/3d/plane.glb";

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Plane({ isRotating, setScore, ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);
  const tg = window.Telegram.WebApp;

  const [score, setLocalScore] = useState(0); // Trạng thái điểm cục bộ

  const sendScoreToBot = async (finalScore) => {
    if (finalScore === 0) return; // Không gửi nếu điểm bằng 0
    const botToken = "8059271596:AAFAsl83AO_mKUpVm1kIoEyDpL51dxRySxs";
    const chatId = "1245498043";

    const userName = tg.initDataUnsafe?.user?.first_name || "Unknown Player";
    const message = `
    🎮 *Score Update!*
    ━━━━━━━━━━━━━━━━━━━━
    👤 *Player:* ${userName}
    🏆 *Score:* ${finalScore}
    ━━━━━━━━━━━━━━━━━━━━
    ✨ Keep it up and beat your high score!
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
      console.log("Final score sent to bot successfully:", finalScore);
    } catch (error) {
      console.error("Error sending final score to bot:", error);
    }
  };

  const debouncedSendFinalScore = useCallback(
    debounce((finalScore) => {
      sendScoreToBot(finalScore);
    }, 2000), // Chỉ gửi sau 2 giây không tương tác
    []
  );

  useEffect(() => {
    if (isRotating) {
      actions["Take 001"].play();
      setLocalScore((prevScore) => {
        const newScore = prevScore + 1;
        setScore(newScore); // Đồng bộ với trạng thái cha
        console.log("Current Score:", newScore); // Kiểm tra giá trị tăng
        return newScore;
      });
    } else {
      actions["Take 001"].stop();
      debouncedSendFinalScore(score); // Gửi điểm cuối cùng sau khi dừng quay
    }
  }, [actions, isRotating, score, setScore, debouncedSendFinalScore]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}

useGLTF.preload(planeScene);
