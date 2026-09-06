/* =====================================================
   DOM
===================================================== */

const homeScreen =
  document.getElementById(
    "home-screen"
  );

const quizScreen =
  document.getElementById(
    "quiz-screen"
  );

const resultScreen =
  document.getElementById(
    "result-screen"
  );


const startBtn =
  document.getElementById(
    "start-btn"
  );

const restartBtn =
  document.getElementById(
    "restart-btn"
  );

const retryBtn =
  document.getElementById(
    "retry-btn"
  );


const questionNumber =
  document.getElementById(
    "question-number"
  );

const progressBar =
  document.getElementById(
    "progress-bar"
  );

const questionText =
  document.getElementById(
    "question-text"
  );

const answersContainer =
  document.getElementById(
    "answers-container"
  );


const mainResult =
  document.getElementById(
    "main-result"
  );

const mainPercent =
  document.getElementById(
    "main-percent"
  );

const resultHook =
  document.getElementById(
    "result-hook"
  );

const resultQuote =
  document.getElementById(
    "result-quote"
  );

const secondaryResult =
  document.getElementById(
    "secondary-result"
  );

const thirdResult =
  document.getElementById(
    "third-result"
  );

const resultDescription =
  document.getElementById(
    "result-description"
  );


const statsContainer =
  document.getElementById(
    "stats-container"
  );


const radarCanvas =
  document.getElementById(
    "radar-canvas"
  );

const shareRadarCanvas =
  document.getElementById(
    "share-radar-canvas"
  );


const shareCard =
  document.getElementById(
    "share-card"
  );

const shareMainResult =
  document.getElementById(
    "share-main-result"
  );

const sharePercent =
  document.getElementById(
    "share-percent"
  );

const shareHook =
  document.getElementById(
    "share-hook"
  );

const shareQuote =
  document.getElementById(
    "share-quote"
  );

const shareSecondResult =
  document.getElementById(
    "share-second-result"
  );

const shareThirdResult =
  document.getElementById(
    "share-third-result"
  );

const shareBars =
  document.getElementById(
    "share-bars"
  );


const saveImageBtn =
  document.getElementById(
    "save-image-btn"
  );

const copyResultBtn =
  document.getElementById(
    "copy-result-btn"
  );


/* =====================================================
   Attribute
===================================================== */

const ATTRIBUTE_KEYS = [
  "cold",
  "natural",
  "tsundere",
  "scheming",
  "clingy",
  "yandere",
  "shy"
];


/*
  雷達圖順序。

  注意：
  七個屬性 = 七個頂點。
*/

const RADAR_KEYS = [
  "cold",
  "natural",
  "tsundere",
  "scheming",
  "clingy",
  "yandere",
  "shy"
];


/* =====================================================
   State
===================================================== */

let currentQuestionIndex = 0;

let scores =
  createEmptyScores();

let currentQuestions = [];


/* =====================================================
   Score initialization
===================================================== */

function createEmptyScores() {

  const result = {};

  ATTRIBUTE_KEYS.forEach(
    (key) => {

      result[key] = 0;

    }
  );

  return result;

}


/* =====================================================
   Shuffle
===================================================== */

function shuffleArray(array) {

  const copy =
    [...array];

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


/* =====================================================
   Screens
===================================================== */

function showScreen(screen) {

  [
    homeScreen,
    quizScreen,
    resultScreen
  ].forEach(
    (item) => {

      item.classList.remove(
        "active"
      );

    }
  );

  screen.classList.add(
    "active"
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   Start
===================================================== */

function startQuiz() {

  currentQuestionIndex = 0;

  scores =
    createEmptyScores();


  /*
    題目順序目前固定，
    但每一題的選項都會重新洗牌。

    保留題目順序是為了讓節奏比較穩定。
  */

  currentQuestions =
    QUESTIONS.map(
      (question) => ({
        ...question,

        answers:
          shuffleArray(
            question.answers
          )
      })
    );


  showScreen(
    quizScreen
  );

  renderQuestion();

}


/* =====================================================
   Render question
===================================================== */

function renderQuestion() {

  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  questionNumber.textContent =
    `${String(
      currentQuestionIndex + 1
    ).padStart(
      2,
      "0"
    )} / ${currentQuestions.length}`;


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

          chooseAnswer(
            answer
          );

        }
      );


      answersContainer.appendChild(
        button
      );

    }
  );

}


/* =====================================================
   Answer
===================================================== */

function chooseAnswer(answer) {

  /*
    防止非常快的連點
  */

  const buttons =
    answersContainer.querySelectorAll(
      ".answer-btn"
    );

  buttons.forEach(
    (button) => {

      button.disabled =
        true;

    }
  );


  Object.entries(
    answer.scores
  ).forEach(
    (
      [
        key,
        value
      ]
    ) => {

      scores[key] +=
        value;

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
    120
  );

}


/* =====================================================
   Maximum possible score

   每個屬性都自動計算理論最高分。

   例：
   某題的 5 個答案中：
   cold 分別 = 2, 0, 1, 0, 0

   那這題 cold 理論最高就是 2。

   最後把 15 題的最高值全部加起來。

   所以不必人工猜 42、45 等數字。
===================================================== */

function calculateMaxScores() {

  const maxScores =
    createEmptyScores();


  QUESTIONS.forEach(
    (question) => {

      ATTRIBUTE_KEYS.forEach(
        (key) => {

          let questionMax = 0;


          question.answers.forEach(
            (answer) => {

              const value =
                answer.scores[key] || 0;


              if (
                value >
                questionMax
              ) {

                questionMax =
                  value;

              }

            }
          );


          maxScores[key] +=
            questionMax;

        }
      );

    }
  );


  return maxScores;

}


const MAX_SCORES =
  calculateMaxScores();


/* =====================================================
   Percentages
===================================================== */

function getPercentages() {

  const percentages = {};


  ATTRIBUTE_KEYS.forEach(
    (key) => {

      const max =
        MAX_SCORES[key];


      if (
        max === 0
      ) {

        percentages[key] =
          0;

        return;

      }


      const raw =
        (
          scores[key] /
          max
        ) * 100;


      /*
        稍微做視覺校正。

        這不是學術心理測驗，
        所以我們希望結果有區別，
        但不要動不動全部只有 10%。

        先保留真實比率，
        再做非常小的底值調整。
      */

      const adjusted =
        8 +
        raw * 0.92;


      percentages[key] =
        Math.min(
          99,
          Math.max(
            4,
            Math.round(
              adjusted
            )
          )
        );

    }
  );


  return percentages;

}


/* =====================================================
   Sort score

   主屬性使用「標準化百分比」排序，
   而不是原始分數。

   因為各屬性的理論最高值可能不同。
===================================================== */

function getSortedAttributes(
  percentages
) {

  return Object.entries(
    percentages
  ).sort(
    (
      a,
      b
    ) =>
      b[1] - a[1]
  );

}


/* =====================================================
   Theme
===================================================== */

function applyTheme(mainKey) {

  const theme =
    ATTRIBUTE_INFO[
      mainKey
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


/* =====================================================
   Result
===================================================== */

function showResult() {

  const percentages =
    getPercentages();


  const sorted =
    getSortedAttributes(
      percentages
    );


  const mainKey =
    sorted[0][0];

  const secondKey =
    sorted[1][0];

  const thirdKey =
    sorted[2][0];


  const mainInfo =
    ATTRIBUTE_INFO[
      mainKey
    ];


  applyTheme(
    mainKey
  );


  mainResult.textContent =
    mainInfo.name;


  mainPercent.textContent =
    `${mainInfo.name}純度 ${percentages[mainKey]}%`;


  resultHook.textContent =
    mainInfo.hook;


  resultQuote.textContent =
    mainInfo.quote;


  secondaryResult.textContent =
    ATTRIBUTE_INFO[
      secondKey
    ].name;


  thirdResult.textContent =
    ATTRIBUTE_INFO[
      thirdKey
    ].name;


  resultDescription.textContent =
    createCombinedDescription(
      mainKey,
      secondKey
    );


  renderStats(
    percentages
  );


  renderShareCard(
    mainKey,
    secondKey,
    thirdKey,
    percentages
  );


  showScreen(
    resultScreen
  );


  /*
    Canvas 必須在畫面顯示後再畫，
    避免某些瀏覽器尺寸異常。
  */

  requestAnimationFrame(
    () => {

      drawRadarChart(
        radarCanvas,
        percentages,
        mainKey,
        false
      );


      drawRadarChart(
        shareRadarCanvas,
        percentages,
        mainKey,
        true
      );

    }
  );

}


/* =====================================================
   Combined descriptions
===================================================== */

function createCombinedDescription(
  mainKey,
  secondKey
) {

  const main =
    ATTRIBUTE_INFO[
      mainKey
    ];

  const second =
    ATTRIBUTE_INFO[
      secondKey
    ];


  const combinations = {

    "cold-shy":
      "你很容易被誤認為高冷，但真相可能只是你不喜歡把能量花在不熟的人身上。熟悉之後，你的反差往往比第一印象大很多。",

    "cold-tsundere":
      "冷靜和嘴硬同時存在，會讓你看起來比實際上更難讀懂。真正重要的人通常能慢慢發現，你的行動其實比語氣誠實。",

    "cold-clingy":
      "你屬於非常典型的限定解鎖型。大部分人得到的是距離感，但被你認定的重要對象，能看到完全不同的一面。",

    "cold-scheming":
      "你不只習慣保持距離，也很擅長觀察。很多事情其實早就被你看懂，只是你不一定覺得有必要講出來。",

    "cold-yandere":
      "你很少讓大量的人進入自己的核心圈子，因此一旦真的重視某個人，那份注意力往往比表面看起來集中得多。",

    "cold-natural":
      "平常看起來有距離感，但偶爾又會突然做出非常天然的反應。這種毫無預警的反差通常特別明顯。",


    "natural-clingy":
      "你跟熟人之間很容易自然地消除距離感。很多你自己覺得很普通的親近行為，旁人看起來可能已經相當明顯。",

    "natural-shy":
      "你不是一直都外向，而是需要先進入安全區。放鬆之後，你原本被社交緊張壓住的天然屬性就很容易全部跑出來。",

    "natural-tsundere":
      "你的情緒偶爾會比自己理解得更快。可能嘴上還在否認，行動卻早已非常自然地暴露真正的想法。",

    "natural-scheming":
      "這是一種很難判斷的組合。你有時真的只是隨性，有時卻精準得讓人懷疑剛才那一切是不是早就在你的計畫裡。",

    "natural-yandere":
      "平常的你可能相當隨性，但遇到真正重要的人後，注意力會突然集中很多，形成意外明顯的反差。",


    "tsundere-clingy":
      "你的核心矛盾相當明顯：嘴上可能嫌人煩，真正太久沒互動時卻又會第一個開始在意。",

    "tsundere-shy":
      "你的嘴硬有一部分其實來自不知所措。越重要的人，反而越容易讓你不知道怎麼自然地把真正的想法說出口。",

    "tsundere-scheming":
      "你平常其實很擅長控制自己的反應，但真正遇到在意的人時，那套冷靜系統偶爾還是會出現破綻。",

    "tsundere-yandere":
      "你真正的在意程度往往遠高於表現出來的程度。很多嘴上說沒差的細節，實際上可能全部都被你記住了。",


    "scheming-clingy":
      "你確實需要陪伴，但不一定會用最直接的方式表現。比起一句「陪我」，你更可能自然地創造一個讓對方留下來的理由。",

    "scheming-shy":
      "你在陌生環境裡可能話不多，卻不代表你沒有在觀察。相反地，你通常已經默默注意到了大量細節。",

    "scheming-yandere":
      "你對人際細節本來就敏感，而當某個人變得特別重要時，那份觀察力會進一步集中在彼此關係的變化上。",


    "clingy-shy":
      "你不是不需要人，而是不需要很多人。陌生環境會讓你迅速省電，但熟悉的人卻可能得到完全不同版本的你。",

    "clingy-yandere":
      "陪伴感對你而言非常重要。當一個人真正進入你的核心圈子後，你會自然地投入大量時間與注意力。"

  };


  const direct =
    `${mainKey}-${secondKey}`;

  const reverse =
    `${secondKey}-${mainKey}`;


  if (
    combinations[
      direct
    ]
  ) {

    return combinations[
      direct
    ];

  }


  if (
    combinations[
      reverse
    ]
  ) {

    return combinations[
      reverse
    ];

  }


  return (
    `${main.description} ` +
    `同時，你身上也帶有明顯的「${second.name}」傾向，因此真正相處起來通常比單一標籤更有反差。`
  );

}


/* =====================================================
   Statistics
===================================================== */

function renderStats(
  percentages
) {

  statsContainer.innerHTML =
    "";


  const sorted =
    getSortedAttributes(
      percentages
    );


  sorted.forEach(
    (
      [
        key,
        percentage
      ]
    ) => {

      const info =
        ATTRIBUTE_INFO[
          key
        ];


      const row =
        document.createElement(
          "div"
        );


      row.className =
        "stat-row";


      row.innerHTML = `

        <div class="stat-top">

          <span>
            ${info.name}
          </span>

          <strong>
            ${percentage}%
          </strong>

        </div>

        <div class="stat-track">

          <div
            class="stat-fill"
            style="width: ${percentage}%"
          ></div>

        </div>

      `;


      statsContainer.appendChild(
        row
      );

    }
  );

}


/* =====================================================
   Share
===================================================== */

function renderShareCard(
  mainKey,
  secondKey,
  thirdKey,
  percentages
) {

  const mainInfo =
    ATTRIBUTE_INFO[
      mainKey
    ];


  shareMainResult.textContent =
    mainInfo.name;


  sharePercent.textContent =
    `${mainInfo.name}純度 ${percentages[mainKey]}%`;


  shareHook.textContent =
    mainInfo.hook;


  shareQuote.textContent =
    mainInfo.quote;


  shareSecondResult.textContent =
    ATTRIBUTE_INFO[
      secondKey
    ].name;


  shareThirdResult.textContent =
    ATTRIBUTE_INFO[
      thirdKey
    ].name;


  shareBars.innerHTML =
    "";


  const sorted =
    getSortedAttributes(
      percentages
    );


  sorted.forEach(
    (
      [
        key,
        percentage
      ]
    ) => {

      const info =
        ATTRIBUTE_INFO[
          key
        ];


      const row =
        document.createElement(
          "div"
        );


      row.innerHTML = `

        <div class="share-bar-top">

          <span>
            ${info.name}
          </span>

          <strong>
            ${percentage}%
          </strong>

        </div>

        <div class="share-bar-track">

          <div
            class="share-bar-fill"
            style="width: ${percentage}%"
          ></div>

        </div>

      `;


      shareBars.appendChild(
        row
      );

    }
  );

}


/* =====================================================
   Seven-sided Radar Chart
===================================================== */

function drawRadarChart(
  canvas,
  percentages,
  mainKey,
  compact = false
) {

  const ctx =
    canvas.getContext(
      "2d"
    );


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
    compact
      ? width * 0.31
      : width * 0.30;


  const levels =
    5;


  const count =
    RADAR_KEYS.length;


  const theme =
    ATTRIBUTE_INFO[
      mainKey
    ].theme;


  /*
    -90° 起點，
    讓第一個頂點朝正上方。
  */

  const startAngle =
    -Math.PI / 2;


  function getPoint(
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
        Math.cos(
          angle
        ) *
        radius *
        ratio,

      y:
        centerY +
        Math.sin(
          angle
        ) *
        radius *
        ratio

    };

  }


  /* =========================
     Background levels
  ========================= */

  for (
    let level = 1;
    level <= levels;
    level++
  ) {

    const ratio =
      level /
      levels;


    ctx.beginPath();


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const point =
        getPoint(
          i,
          ratio
        );


      if (
        i === 0
      ) {

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


    ctx.closePath();


    ctx.strokeStyle =
      level === levels
        ? "rgba(110, 95, 125, 0.24)"
        : "rgba(110, 95, 125, 0.11)";


    ctx.lineWidth =
      level === levels
        ? 1.4
        : 1;


    ctx.stroke();

  }


  /* =========================
     Axis lines
  ========================= */

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const point =
      getPoint(
        i,
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
      "rgba(110, 95, 125, 0.11)";


    ctx.lineWidth =
      1;


    ctx.stroke();

  }


  /* =========================
     Data polygon
  ========================= */

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


  ctx.beginPath();


  RADAR_KEYS.forEach(
    (
      key,
      index
    ) => {

      const percentage =
        percentages[key];


      /*
        雷達圖不讓極低值完全縮到中心，
        視覺會比較好看。

        4% 還是很低，
        但至少看得到圖形。
      */

      const ratio =
        Math.max(
          0.08,
          percentage / 100
        );


      const point =
        getPoint(
          index,
          ratio
        );


      if (
        index === 0
      ) {

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
    `rgba(${theme.rgbStart}, 0.22)`;


  ctx.fill();


  ctx.strokeStyle =
    gradient;


  ctx.lineWidth =
    compact
      ? 3
      : 3.5;


  ctx.stroke();


  /* =========================
     Data points
  ========================= */

  RADAR_KEYS.forEach(
    (
      key,
      index
    ) => {

      const ratio =
        Math.max(
          0.08,
          percentages[key] /
          100
        );


      const point =
        getPoint(
          index,
          ratio
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


      ctx.lineWidth =
        2;


      ctx.strokeStyle =
        "#ffffff";


      ctx.stroke();

    }
  );


  /* =========================
     Labels
  ========================= */

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";


  RADAR_KEYS.forEach(
    (
      key,
      index
    ) => {

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
            ? 1.25
            : 1.27
        );


      const x =
        centerX +
        Math.cos(
          angle
        ) *
        labelRadius;


      const y =
        centerY +
        Math.sin(
          angle
        ) *
        labelRadius;


      const info =
        ATTRIBUTE_INFO[
          key
        ];


      ctx.fillStyle =
        "#665c6d";


      ctx.font =
        compact
          ? "700 15px Microsoft JhengHei"
          : "700 16px Microsoft JhengHei";


      ctx.fillText(
        info.name,
        x,
        y - 6
      );


      ctx.fillStyle =
        theme.text;


      ctx.font =
        compact
          ? "800 12px Microsoft JhengHei"
          : "800 13px Microsoft JhengHei";


      ctx.fillText(
        `${percentages[key]}%`,
        x,
        y + 12
      );

    }
  );

}


/* =====================================================
   Copy result
===================================================== */

async function copyResult() {

  const percentages =
    getPercentages();


  const sorted =
    getSortedAttributes(
      percentages
    );


  const mainKey =
    sorted[0][0];

  const secondKey =
    sorted[1][0];

  const thirdKey =
    sorted[2][0];


  const mainInfo =
    ATTRIBUTE_INFO[
      mainKey
    ];


  const text = `我的二次元人格屬性：

主屬性｜${mainInfo.name} ${percentages[mainKey]}%
副屬性｜${ATTRIBUTE_INFO[secondKey].name}
隱藏屬性｜${ATTRIBUTE_INFO[thirdKey].name}

${mainInfo.hook}

高冷 ${percentages.cold}%
天然系 ${percentages.natural}%
傲嬌 ${percentages.tsundere}%
腹黑 ${percentages.scheming}%
黏人 ${percentages.clingy}%
病嬌 ${percentages.yandere}%
社恐 ${percentages.shy}%

你也來測測看自己是哪種屬性 👀`;


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

  } catch (
    error
  ) {

    alert(
      "複製失敗，可以直接截圖結果！"
    );

  }

}


/* =====================================================
   Download PNG
===================================================== */

async function saveResultImage() {

  saveImageBtn.disabled =
    true;


  saveImageBtn.textContent =
    "生成中……";


  try {

    /*
      再畫一次分享雷達圖，
      確保 Canvas 是最新的。
    */

    const percentages =
      getPercentages();


    const sorted =
      getSortedAttributes(
        percentages
      );


    const mainKey =
      sorted[0][0];


    drawRadarChart(
      shareRadarCanvas,
      percentages,
      mainKey,
      true
    );


    /*
      等瀏覽器完成 Canvas render
    */

    await new Promise(
      (resolve) => {

        requestAnimationFrame(
          () => {

            requestAnimationFrame(
              resolve
            );

          }
        );

      }
    );


    const canvas =
      await html2canvas(
        shareCard,
        {

          scale:
            3,

          backgroundColor:
            "#ffffff",

          useCORS:
            true,

          logging:
            false

        }
      );


    const image =
      canvas.toDataURL(
        "image/png"
      );


    const link =
      document.createElement(
        "a"
      );


    link.download =
      "我的人格屬性.png";


    link.href =
      image;


    link.click();


    saveImageBtn.textContent =
      "圖片已生成 ✓";

  } catch (
    error
  ) {

    console.error(
      error
    );


    alert(
      "圖片生成失敗，可以先直接截圖結果卡。"
    );


    saveImageBtn.textContent =
      "生成分享圖片";

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


/* =====================================================
   Events
===================================================== */

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