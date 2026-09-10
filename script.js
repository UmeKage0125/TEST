const homeScreen =
  document.getElementById("home-screen");

const quizScreen =
  document.getElementById("quiz-screen");

const resultScreen =
  document.getElementById("result-screen");

const startBtn =
  document.getElementById("start-btn");

const restartBtn =
  document.getElementById("restart-btn");

const retryBtn =
  document.getElementById("retry-btn");

const scenarioName =
  document.getElementById("scenario-name");

const scenarioText =
  document.getElementById("scenario-text");

const questionNumber =
  document.getElementById("question-number");

const progressBar =
  document.getElementById("progress-bar");

const questionText =
  document.getElementById("question-text");

const answersContainer =
  document.getElementById("answers-container");

const mainResult =
  document.getElementById("main-result");

const mainPercent =
  document.getElementById("main-percent");

const resultHook =
  document.getElementById("result-hook");

const resultQuote =
  document.getElementById("result-quote");

const secondaryResult =
  document.getElementById("secondary-result");

const thirdResult =
  document.getElementById("third-result");

const resultDescription =
  document.getElementById("result-description");

const radarCanvas =
  document.getElementById("radar-canvas");

const shareRadarCanvas =
  document.getElementById("share-radar-canvas");

const statsContainer =
  document.getElementById("stats-container");

const shareCard =
  document.getElementById("share-card");

const shareMainResult =
  document.getElementById("share-main-result");

const sharePercent =
  document.getElementById("share-percent");

const shareHook =
  document.getElementById("share-hook");

const shareQuote =
  document.getElementById("share-quote");

const shareSecondResult =
  document.getElementById("share-second-result");

const shareThirdResult =
  document.getElementById("share-third-result");

const saveImageBtn =
  document.getElementById("save-image-btn");

const copyResultBtn =
  document.getElementById("copy-result-btn");


const DIMENSION_KEYS =
  Object.keys(DIMENSIONS);

const PERSONA_KEYS =
  Object.keys(PERSONAS);


let currentQuestionIndex = 0;

let currentQuestions = [];

let rawTraits =
  createEmptyTraits();

let currentProfile = null;

let currentMatches = null;


function createEmptyTraits() {

  const result = {};

  DIMENSION_KEYS.forEach((key) => {
    result[key] = 0;
  });

  return result;
}


function shuffleArray(array) {

  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}


function showScreen(screen) {

  [
    homeScreen,
    quizScreen,
    resultScreen
  ].forEach((item) => {
    item.classList.remove("active");
  });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function startQuiz() {

  currentQuestionIndex = 0;

  rawTraits =
    createEmptyTraits();

  currentQuestions =
    QUESTIONS.map((question) => ({
      ...question,

      answers:
        shuffleArray(
          question.answers
        )
    }));

  showScreen(
    quizScreen
  );

  renderQuestion();
}


function renderQuestion() {

  const question =
    currentQuestions[
      currentQuestionIndex
    ];

  scenarioName.textContent =
    question.scenarioName;

  scenarioText.textContent =
    question.scenario;

  questionNumber.textContent =
    `${String(
      currentQuestionIndex + 1
    ).padStart(2, "0")} / ${currentQuestions.length}`;

  const progress =
    (
      (
        currentQuestionIndex + 1
      ) /
      currentQuestions.length
    ) * 100;

  progressBar.style.width =
    `${progress}%`;

  questionText.textContent =
    question.question;

  answersContainer.innerHTML =
    "";

  question.answers.forEach(
    (answer) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "answer-btn";

      button.textContent =
        answer.text;

      button.addEventListener(
        "click",
        () => {
          chooseAnswer(answer);
        }
      );

      answersContainer.appendChild(
        button
      );
    }
  );
}


function chooseAnswer(answer) {

  const buttons =
    answersContainer.querySelectorAll(
      ".answer-btn"
    );

  buttons.forEach(
    (button) => {
      button.disabled = true;
    }
  );

  Object.entries(
    answer.traits
  ).forEach(
    ([key, value]) => {

      rawTraits[key] += value;

    }
  );

  currentQuestionIndex++;

  setTimeout(
    () => {

      if (
        currentQuestionIndex <
        currentQuestions.length
      ) {

        renderQuestion();

      } else {

        showResult();

      }

    },
    100
  );
}


/* =========================
   自動計算每個維度
   理論最低與最高分
========================= */

function calculateDimensionRanges() {

  const ranges = {};

  DIMENSION_KEYS.forEach((key) => {

    ranges[key] = {
      min: 0,
      max: 0
    };

  });


  QUESTIONS.forEach((question) => {

    DIMENSION_KEYS.forEach((key) => {

      const values =
        question.answers.map(
          (answer) =>
            answer.traits[key] || 0
        );

      ranges[key].min +=
        Math.min(...values);

      ranges[key].max +=
        Math.max(...values);

    });

  });

  return ranges;
}


const DIMENSION_RANGES =
  calculateDimensionRanges();


function normalizeProfile() {

  const profile = {};

  DIMENSION_KEYS.forEach((key) => {

    const min =
      DIMENSION_RANGES[key].min;

    const max =
      DIMENSION_RANGES[key].max;

    const value =
      rawTraits[key];

    if (max === min) {

      profile[key] = 50;

      return;
    }

    const normalized =
      (
        (value - min) /
        (max - min)
      ) * 100;

    profile[key] =
      Math.round(
        Math.max(
          0,
          Math.min(
            100,
            normalized
          )
        )
      );
  });

  return profile;
}


/* =========================
   Persona Matching

   使用七維空間距離。
========================= */

function calculatePersonaMatches(profile) {

  const results = [];

  PERSONA_KEYS.forEach((key) => {

    const persona =
      PERSONAS[key];

    let squaredDistance = 0;

    DIMENSION_KEYS.forEach(
      (dimension) => {

        const diff =
          profile[dimension] -
          persona.target[dimension];

        squaredDistance +=
          diff * diff;
      }
    );

    const rmsDistance =
      Math.sqrt(
        squaredDistance /
        DIMENSION_KEYS.length
      );

    /*
      RMS = 0
      代表完全貼合。

      將距離轉成契合度。
    */

    let similarity =
      100 -
      rmsDistance * 1.15;

    similarity =
      Math.max(
        1,
        Math.min(
          99,
          Math.round(similarity)
        )
      );

    results.push({
      key,
      similarity
    });
  });

  results.sort(
    (a, b) =>
      b.similarity -
      a.similarity
  );

  return results;
}


function applyTheme(personaKey) {

  const theme =
    PERSONAS[
      personaKey
    ].theme;

  const root =
    document.documentElement;

  root.style.setProperty(
    "--theme-start",
    theme.start
  );

  root.style.setProperty(
    "--theme-end",
    theme.end
  );

  root.style.setProperty(
    "--theme-soft",
    theme.soft
  );

  root.style.setProperty(
    "--theme-soft-2",
    theme.soft2
  );

  root.style.setProperty(
    "--theme-text",
    theme.text
  );

  root.style.setProperty(
    "--theme-deep",
    theme.deep
  );

  root.style.setProperty(
    "--theme-rgb-start",
    theme.rgbStart
  );

  root.style.setProperty(
    "--theme-rgb-end",
    theme.rgbEnd
  );
}


function showResult() {

  currentProfile =
    normalizeProfile();

  currentMatches =
    calculatePersonaMatches(
      currentProfile
    );

  const main =
    currentMatches[0];

  const second =
    currentMatches[1];

  const third =
    currentMatches[2];

  const mainInfo =
    PERSONAS[
      main.key
    ];

  applyTheme(
    main.key
  );

  mainResult.textContent =
    mainInfo.name;

  mainPercent.textContent =
    `契合度 ${main.similarity}%`;

  resultHook.textContent =
    mainInfo.hook;

  resultQuote.textContent =
    mainInfo.quote;

  secondaryResult.textContent =
    PERSONAS[
      second.key
    ].name;

  thirdResult.textContent =
    PERSONAS[
      third.key
    ].name;

  resultDescription.textContent =
    createResultDescription(
      main,
      second
    );

  renderMatchStats();

  renderShareCard();

  showScreen(
    resultScreen
  );

  requestAnimationFrame(() => {

    drawRadarChart(
      radarCanvas,
      currentProfile,
      main.key,
      false
    );

    drawRadarChart(
      shareRadarCanvas,
      currentProfile,
      main.key,
      true
    );

  });
}


function createResultDescription(
  main,
  second
) {

  const mainInfo =
    PERSONAS[
      main.key
    ];

  const secondInfo =
    PERSONAS[
      second.key
    ];

  return (
    `${mainInfo.description} ` +
    `同時，你的第二高輪廓是「${secondInfo.name}」，` +
    `所以真正相處起來通常不會只是單一人設，而會帶有兩者混合後的反差。`
  );
}


function renderMatchStats() {

  statsContainer.innerHTML =
    "";

  /*
    分享契合度前 6 名即可，
    避免結果頁太長。
  */

  currentMatches
    .slice(0, 6)
    .forEach((result) => {

      const info =
        PERSONAS[
          result.key
        ];

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "stat-row";

      row.innerHTML = `
        <div class="stat-top">
          <span>${info.name}</span>
          <strong>${result.similarity}%</strong>
        </div>

        <div class="stat-track">
          <div
            class="stat-fill"
            style="width:${result.similarity}%"
          ></div>
        </div>
      `;

      statsContainer.appendChild(
        row
      );
    });
}


function renderShareCard() {

  const main =
    currentMatches[0];

  const second =
    currentMatches[1];

  const third =
    currentMatches[2];

  const info =
    PERSONAS[
      main.key
    ];

  shareMainResult.textContent =
    info.name;

  sharePercent.textContent =
    `契合度 ${main.similarity}%`;

  shareHook.textContent =
    info.hook;

  shareQuote.textContent =
    info.quote;

  shareSecondResult.textContent =
    PERSONAS[
      second.key
    ].name;

  shareThirdResult.textContent =
    PERSONAS[
      third.key
    ].name;
}


/* =========================
   七邊形雷達圖
========================= */

function drawRadarChart(
  canvas,
  profile,
  mainKey,
  compact
) {

  const ctx =
    canvas.getContext("2d");

  const width =
    canvas.width;

  const height =
    canvas.height;

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  const centerX =
    width / 2;

  const centerY =
    height / 2;

  const radius =
    width *
    (
      compact
        ? 0.29
        : 0.30
    );

  const keys =
    DIMENSION_KEYS;

  const count =
    keys.length;

  const levels =
    5;

  const startAngle =
    -Math.PI / 2;

  const theme =
    PERSONAS[
      mainKey
    ].theme;


  function pointAt(
    index,
    ratio
  ) {

    const angle =
      startAngle +
      (
        Math.PI *
        2 *
        index
      ) /
      count;

    return {
      x:
        centerX +
        Math.cos(angle) *
        radius *
        ratio,

      y:
        centerY +
        Math.sin(angle) *
        radius *
        ratio
    };
  }


  for (
    let level = 1;
    level <= levels;
    level++
  ) {

    const ratio =
      level /
      levels;

    ctx.beginPath();

    keys.forEach(
      (_, index) => {

        const point =
          pointAt(
            index,
            ratio
          );

        if (index === 0) {

          ctx.moveTo(
            point.x,
            point.y
          );

        } else {

          ctx.lineTo(
            point.x,
            point.y
          );

        }
      }
    );

    ctx.closePath();

    ctx.strokeStyle =
      level === levels
        ? "rgba(100,85,115,0.24)"
        : "rgba(100,85,115,0.11)";

    ctx.lineWidth =
      level === levels
        ? 1.4
        : 1;

    ctx.stroke();
  }


  keys.forEach(
    (_, index) => {

      const point =
        pointAt(
          index,
          1
        );

      ctx.beginPath();

      ctx.moveTo(
        centerX,
        centerY
      );

      ctx.lineTo(
        point.x,
        point.y
      );

      ctx.strokeStyle =
        "rgba(100,85,115,0.11)";

      ctx.stroke();
    }
  );


  ctx.beginPath();

  keys.forEach(
    (key, index) => {

      const ratio =
        Math.max(
          0.05,
          profile[key] /
          100
        );

      const point =
        pointAt(
          index,
          ratio
        );

      if (index === 0) {

        ctx.moveTo(
          point.x,
          point.y
        );

      } else {

        ctx.lineTo(
          point.x,
          point.y
        );

      }
    }
  );

  ctx.closePath();

  ctx.fillStyle =
    `rgba(${theme.rgbStart},0.22)`;

  ctx.fill();

  const gradient =
    ctx.createLinearGradient(
      centerX - radius,
      centerY - radius,
      centerX + radius,
      centerY + radius
    );

  gradient.addColorStop(
    0,
    theme.start
  );

  gradient.addColorStop(
    1,
    theme.end
  );

  ctx.strokeStyle =
    gradient;

  ctx.lineWidth =
    compact
      ? 3
      : 3.5;

  ctx.stroke();


  keys.forEach(
    (key, index) => {

      const point =
        pointAt(
          index,
          Math.max(
            0.05,
            profile[key] /
            100
          )
        );

      ctx.beginPath();

      ctx.arc(
        point.x,
        point.y,
        compact
          ? 4
          : 4.5,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        theme.end;

      ctx.fill();

      ctx.strokeStyle =
        "#ffffff";

      ctx.lineWidth =
        2;

      ctx.stroke();
    }
  );


  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  keys.forEach(
    (key, index) => {

      const angle =
        startAngle +
        (
          Math.PI *
          2 *
          index
        ) /
        count;

      const labelRadius =
        radius *
        (
          compact
            ? 1.31
            : 1.34
        );

      const x =
        centerX +
        Math.cos(angle) *
        labelRadius;

      const y =
        centerY +
        Math.sin(angle) *
        labelRadius;

      ctx.fillStyle =
        "#665c6d";

      ctx.font =
        compact
          ? "700 13px Microsoft JhengHei"
          : "700 15px Microsoft JhengHei";

      ctx.fillText(
        DIMENSIONS[key].name,
        x,
        y - 6
      );

      ctx.fillStyle =
        theme.text;

      ctx.font =
        compact
          ? "800 11px Microsoft JhengHei"
          : "800 12px Microsoft JhengHei";

      ctx.fillText(
        `${profile[key]}%`,
        x,
        y + 11
      );

    }
  );
}


/* =========================
   Copy
========================= */

async function copyResult() {

  const main =
    currentMatches[0];

  const second =
    currentMatches[1];

  const third =
    currentMatches[2];

  const info =
    PERSONAS[
      main.key
    ];

  const text = `我的二次元人格：

主人設｜${info.name} ${main.similarity}%
副人設｜${PERSONAS[second.key].name}
隱藏人設｜${PERSONAS[third.key].name}

${info.hook}

七維人格：
社交能量 ${currentProfile.social}%
情緒外顯 ${currentProfile.expression}%
依附需求 ${currentProfile.attachment}%
觀察掌控 ${currentProfile.strategy}%
即興直覺 ${currentProfile.instinct}%
防禦嘴硬 ${currentProfile.defense}%
關懷責任 ${currentProfile.care}%

你也來測看看。`;

  try {

    await navigator.clipboard.writeText(
      text
    );

    copyResultBtn.textContent =
      "已複製 ✓";

    setTimeout(
      () => {

        copyResultBtn.textContent =
          "複製結果文字";

      },
      1600
    );

  } catch (error) {

    alert(
      "複製失敗，可以直接截圖分享。"
    );

  }
}


/* =========================
   Save Image
========================= */

async function saveResultImage() {

  saveImageBtn.disabled =
    true;

  saveImageBtn.textContent =
    "生成中……";

  try {

    const main =
      currentMatches[0];

    drawRadarChart(
      shareRadarCanvas,
      currentProfile,
      main.key,
      true
    );

    await new Promise(
      (resolve) => {

        requestAnimationFrame(
          () =>
            requestAnimationFrame(
              resolve
            )
        );

      }
    );

    const canvas =
      await html2canvas(
        shareCard,
        {
          scale: 3,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false
        }
      );

    const link =
      document.createElement(
        "a"
      );

    link.download =
      "我的人格屬性.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();

    saveImageBtn.textContent =
      "圖片已生成 ✓";

  } catch (error) {

    console.error(error);

    alert(
      "圖片生成失敗，可以先直接截圖。"
    );

  }

  saveImageBtn.disabled =
    false;

  setTimeout(
    () => {

      saveImageBtn.textContent =
        "生成分享圖片";

    },
    1800
  );
}


startBtn.addEventListener(
  "click",
  startQuiz
);

restartBtn.addEventListener(
  "click",
  startQuiz
);

retryBtn.addEventListener(
  "click",
  startQuiz
);

copyResultBtn.addEventListener(
  "click",
  copyResult
);

saveImageBtn.addEventListener(
  "click",
  saveResultImage
);
