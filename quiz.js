let correctCount = 0;

const quiz = [
    {
      question: "金城はどれですか？",
      image: "https://github.com/kiyo12345/quiz-game/blob/main/1E%E7%B7%A8%E9%9B%86%E5%BE%8C.jpg?raw=true",
      options: ["1", "2", "3", "4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"],
      answer: "4",
      explanation: "金城は4番目です。",
      explanationImage: "https://github.com/kiyo12345/quiz-game/blob/main/IMG_1361.jpg?raw=true"
    },
    {
      question: "金城はどれですか？",
      image: "https://github.com/kiyo12345/quiz-game/blob/main/3E%E6%96%87%E5%8C%96%E7%A5%AD%E7%B7%A8%E9%9B%86%E5%BE%8C.jpg?raw=true",
      options: ["1", "2", "3", "4","5","6","7","8","9","10","11","12","13"],
      answer: "13",
      explanation: "金城は13番目です。",
      explanationImage: "https://github.com/kiyo12345/quiz-game/blob/main/3e%E6%96%87%E5%8C%96%E7%A5%AD%E7%B7%A8%E9%9B%86%E5%89%8D.jpg?raw=true"
    },
    {
      question: "金城はどれですか？",
      image: "https://github.com/kiyo12345/quiz-game/blob/main/3E%E8%94%B5%E3%83%86%E3%82%A3%E3%83%BC%E7%B7%A8%E9%9B%86%E5%BE%8C%E3%80%8C.jpg?raw=true",
      options: ["1", "2", "3", "4","5","6","7","8","9","10","11","12","13","14"],
      answer: "8",
      explanation: "金城は8番目です。",
      explanationImage: "https://github.com/kiyo12345/quiz-game/blob/main/3E%E3%81%A6%E3%81%83%E3%83%BC%E7%B7%A8%E9%9B%86%E5%89%8D.jpg?raw=true"
    },
    {
      question: "金城はどれですか？",
      image: "https://github.com/kiyo12345/quiz-game/blob/main/D%E7%B7%A8%E9%9B%86%E5%BE%8C.jpg?raw=true",
      options: ["1", "2", "3", "4","5","6","7","8","9","10","11","12","13","14"],
      answer: "10",
      explanation: "金城は10番目です。",
      explanationImage: "https://github.com/kiyo12345/quiz-game/blob/main/D%E7%B7%A8%E9%9B%86%E5%89%8D.jpg?raw=true"
    }
  ];
  
  let currentQuizIndex = 0;
  
  function displayQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // 前の内容を消す
  
    const currentQuiz = quiz[currentQuizIndex];
  
    const questionElement = document.createElement("p");
    questionElement.textContent = currentQuiz.question;
    questionElement.classList.add("quiz-question");
    quizContainer.appendChild(questionElement);
  
    const imageElement = document.createElement("img");
    imageElement.src = currentQuiz.image;
    imageElement.alt = "クイズの画像";
    quizContainer.appendChild(imageElement);
  
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");
  
    currentQuiz.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => checkAnswer(option));
      optionsContainer.appendChild(button);
    });
  
    quizContainer.appendChild(optionsContainer);
  }
  
  const correctSound = new Audio("https://github.com/kiyo12345/quiz-game/blob/main/%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF.mp3?raw=true");
  function checkAnswer(selectedOption) {
    const currentQuiz = quiz[currentQuizIndex];
    const isCorrect = selectedOption === currentQuiz.answer;
  
    const popupMessage = isCorrect ? `正解！ ${currentQuiz.explanation}` : `不正解。 ${currentQuiz.explanation}`;
    const popupImage = currentQuiz.explanationImage;
  
    showPopup(popupMessage, popupImage);
    correctSound.play();
    if (isCorrect) {
      correctCount++; // ←これをcheckAnswer関数に入れておく！
  }
}
  function showPopup(message, imageUrl) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const popupImage = document.getElementById("popup-image");
  
    popupMessage.textContent = message;
    popupImage.src = imageUrl;
    popup.style.display = 'flex';
  }
  
  const celebrationSound = new Audio("https://github.com/kiyo12345/quiz-game/blob/main/%E9%80%A3%E7%B6%9A%E6%89%93%E3%81%A1%E4%B8%8A%E3%81%92%E8%8A%B1%E7%81%AB.mp3?raw=true");
  function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = 'none';
  
    currentQuizIndex++;
  
    if (currentQuizIndex < quiz.length) {
      displayQuiz();
    } else {
      const total = quiz.length;
      const percent = Math.round((correctCount / total) * 100);
    
      let message = "";
      if (percent === 100) {
        message = "君は金城マスターだ！誕生日おめでとう！";
      } else if (percent >= 75) {
        message = "君は金城玄人だ！誕生日おめでとう！ただ全問正解してほしかったな！";
      } else if (percent >= 50) {
        message = "君は金城エアプだ！誕生日おめでとう！次は頑張れ";
      } else {
        message = "お前、金城じゃないな？";
      }
    
      document.getElementById("quiz-container").innerHTML = `
      <h2 class="final-message">全問終了！</h2>
      <p class="final-message">正解数：${correctCount} / ${total}</p>
      <p class="final-message">正答率：${percent}%</p>
      <p class="final-message">${message}</p>
    `;
    celebrationSound.play();
        // 最後の花火！
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight / 2;
        launchFirework(x, y);
        }
    }
  }

  // 花火を打ち上げる関数
  function launchFirework(x, y) {
    const container = document.getElementById("fireworks-container");
    const firework = document.createElement("div");
    firework.className = "firework";
      // ランダムカラー追加！
    const colors = ['red', 'yellow', 'blue', 'lime', 'magenta', 'cyan', 'orange', 'white'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    firework.style.backgroundColor = randomColor;
    firework.style.boxShadow = `0 0 10px 3px ${randomColor}`;
    const size = Math.random() * 12 + 8; // 8px 〜 20px
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    container.appendChild(firework);
  
    setTimeout(() => {
      container.removeChild(firework);
    }, 1000);
  }


  window.onload = displayQuiz;