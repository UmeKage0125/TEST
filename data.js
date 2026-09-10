const DIMENSIONS = {
  social: {
    name: "社交能量"
  },

  expression: {
    name: "情緒外顯"
  },

  attachment: {
    name: "依附需求"
  },

  strategy: {
    name: "觀察掌控"
  },

  instinct: {
    name: "即興直覺"
  },

  defense: {
    name: "防禦嘴硬"
  },

  care: {
    name: "關懷責任"
  }
};


const PERSONAS = {

  cold: {
    name: "高冷",

    target: {
      social: 25,
      expression: 20,
      attachment: 35,
      strategy: 62,
      instinct: 38,
      defense: 58,
      care: 56
    },

    quote:
      "「不是不在意，只是不想表現出來。」",

    hook:
      "別人看到的是距離感，熟人才拿得到完整版。",

    description:
      "你不太習慣把情緒直接攤在所有人面前，也很重視自己的私人空間。你不是沒有關心，而是比起一直掛在嘴上，更傾向用安靜、穩定而不張揚的方式表現。",

    theme: {
      start: "#7fa9ee",
      end: "#8588df",
      soft: "#f1f6ff",
      soft2: "#f0f0ff",
      text: "#637bb6",
      deep: "#4e618e",
      rgbStart: "127,169,238",
      rgbEnd: "133,136,223"
    }
  },


  natural: {
    name: "天然系",

    target: {
      social: 62,
      expression: 72,
      attachment: 48,
      strategy: 20,
      instinct: 92,
      defense: 18,
      care: 58
    },

    quote:
      "「欸？我剛剛有說什麼奇怪的嗎？」",

    hook:
      "你最大的殺傷力，通常發生在你根本沒自覺的時候。",

    description:
      "你比較常跟著感覺走，而不是把每個反應都事先計算好。很多事情你自己覺得再正常不過，旁人卻可能覺得你的反應意外直球甚至有點犯規。",

    theme: {
      start: "#f2b675",
      end: "#e99abf",
      soft: "#fff8ef",
      soft2: "#fff2f8",
      text: "#b87e53",
      deep: "#8d6249",
      rgbStart: "242,182,117",
      rgbEnd: "233,154,191"
    }
  },


  tsundere: {
    name: "傲嬌",

    target: {
      social: 45,
      expression: 32,
      attachment: 68,
      strategy: 48,
      instinct: 42,
      defense: 94,
      care: 72
    },

    quote:
      "「才、才不是特別在意你。」",

    hook:
      "嘴上：隨便。心裡：她怎麼還沒回。",

    description:
      "你越在乎某件事，反而越可能裝得若無其事。真正的你通常比語氣柔軟很多，只是要直接承認自己的心思，對你而言多少有點難度。",

    theme: {
      start: "#ed8daf",
      end: "#9485ec",
      soft: "#fff3f8",
      soft2: "#f1f1ff",
      text: "#8d63aa",
      deep: "#6b4d83",
      rgbStart: "237,141,175",
      rgbEnd: "148,133,236"
    }
  },


  scheming: {
    name: "腹黑",

    target: {
      social: 58,
      expression: 48,
      attachment: 42,
      strategy: 95,
      instinct: 40,
      defense: 42,
      care: 48
    },

    quote:
      "「我什麼都沒做啊，是你自己上鉤的。」",

    hook:
      "你不是沒想法，只是通常比別人晚一點讓人知道。",

    description:
      "你擅長注意語氣、細節和人際氣氛，也習慣先弄清楚局面再決定自己要不要出手。你不一定真的喜歡算計，但確實很會掌握節奏。",

    theme: {
      start: "#aa83dc",
      end: "#df83b4",
      soft: "#faf3ff",
      soft2: "#fff2f8",
      text: "#855eab",
      deep: "#694985",
      rgbStart: "170,131,220",
      rgbEnd: "223,131,180"
    }
  },


  clingy: {
    name: "黏人",

    target: {
      social: 66,
      expression: 72,
      attachment: 94,
      strategy: 38,
      instinct: 58,
      defense: 28,
      care: 72
    },

    quote:
      "「我沒有黏你，我只是剛好一直都在。」",

    hook:
      "不是不能自己待著，只是有人陪明明比較好。",

    description:
      "你很重視陪伴與存在感。真正熟起來之後，比起久久才聯絡一次，你更喜歡持續分享生活裡那些看似很小的事情。",

    theme: {
      start: "#f29cad",
      end: "#eba975",
      soft: "#fff4f6",
      soft2: "#fff7ef",
      text: "#b86a7c",
      deep: "#8a5364",
      rgbStart: "242,156,173",
      rgbEnd: "235,169,117"
    }
  },


  yandere: {
    name: "病嬌",

    target: {
      social: 38,
      expression: 50,
      attachment: 98,
      strategy: 76,
      instinct: 38,
      defense: 54,
      care: 72
    },

    quote:
      "「我只是……比一般人更在意一點而已。」",

    hook:
      "重要的人一旦進榜，直接常駐最高優先級。",

    description:
      "你的情感集中度很高。當某個人真正成為你的重要對象，你會比一般人更注意關係裡的細微變化，也很看重穩定感與專屬感。",

    theme: {
      start: "#c9799b",
      end: "#8b72ce",
      soft: "#fff2f7",
      soft2: "#f3f0ff",
      text: "#925974",
      deep: "#70485e",
      rgbStart: "201,121,155",
      rgbEnd: "139,114,206"
    }
  },


  shy: {
    name: "社恐",

    target: {
      social: 8,
      expression: 28,
      attachment: 54,
      strategy: 58,
      instinct: 28,
      defense: 56,
      care: 60
    },

    quote:
      "「不是討厭你，我只是不知道現在應該說什麼。」",

    hook:
      "陌生人面前省電，熟人面前解除封印。",

    description:
      "你不是沒有話，而是面對不熟悉的人時，需要花更多能量去判斷怎麼接話與融入。真正熟起來後，你的反差可能大得很誇張。",

    theme: {
      start: "#94acd1",
      end: "#9d8bd1",
      soft: "#f2f6fb",
      soft2: "#f4f1fc",
      text: "#68759f",
      deep: "#515d7f",
      rgbStart: "148,172,209",
      rgbEnd: "157,139,209"
    }
  },


  sharp: {
    name: "毒舌",

    target: {
      social: 50,
      expression: 64,
      attachment: 40,
      strategy: 64,
      instinct: 52,
      defense: 84,
      care: 45
    },

    quote:
      "「我只是把大家不敢講的講出來而已。」",

    hook:
      "你的嘴可能比你的惡意快很多。",

    description:
      "你對荒謬的事情容忍度不算高，而且往往很快就能找到最精準的吐槽點。問題通常不是你想傷人，而是你的語言壓縮效率有點太高。",

    theme: {
      start: "#8f92d8",
      end: "#c078b0",
      soft: "#f4f4ff",
      soft2: "#fff2f9",
      text: "#7071aa",
      deep: "#575884",
      rgbStart: "143,146,216",
      rgbEnd: "192,120,176"
    }
  },


  energetic: {
    name: "元氣",

    target: {
      social: 95,
      expression: 90,
      attachment: 60,
      strategy: 22,
      instinct: 86,
      defense: 18,
      care: 65
    },

    quote:
      "「走啦走啦，到了再想！」",

    hook:
      "你的人生常常比行程表快一步。",

    description:
      "你容易把自己的能量帶進整個場合裡。遇到新鮮事，比起先想十種失敗可能，你通常更願意先動起來再說。",

    theme: {
      start: "#f4bd65",
      end: "#f08c9e",
      soft: "#fff9e9",
      soft2: "#fff2f4",
      text: "#b87e3e",
      deep: "#8d5e39",
      rgbStart: "244,189,101",
      rgbEnd: "240,140,158"
    }
  },


  devil: {
    name: "小惡魔",

    target: {
      social: 82,
      expression: 74,
      attachment: 58,
      strategy: 82,
      instinct: 65,
      defense: 45,
      care: 42
    },

    quote:
      "「欸？我有欺負你嗎？」",

    hook:
      "比起贏，你更喜歡看對方露出有趣的反應。",

    description:
      "你很會玩氣氛，也知道什麼話在什麼時候說最有效果。你不一定是認真想控制局面，只是看見有趣的反應時，往往忍不住再推一下。",

    theme: {
      start: "#d982ca",
      end: "#8c78db",
      soft: "#fff2fd",
      soft2: "#f2efff",
      text: "#945ba7",
      deep: "#70467d",
      rgbStart: "217,130,202",
      rgbEnd: "140,120,219"
    }
  },


  gentle: {
    name: "溫柔",

    target: {
      social: 58,
      expression: 68,
      attachment: 58,
      strategy: 50,
      instinct: 48,
      defense: 15,
      care: 96
    },

    quote:
      "「你不用現在回答，我可以等你整理好。」",

    hook:
      "你不是什麼都順著別人，只是習慣先替人留一點空間。",

    description:
      "你對他人的情緒變化相當敏感，也習慣把對方的感受納入自己的決定。你的溫柔不是一味退讓，而是很自然地知道什麼時候該靠近、什麼時候該留白。",

    theme: {
      start: "#8fcfbd",
      end: "#a798df",
      soft: "#effbf7",
      soft2: "#f4f1ff",
      text: "#5d9988",
      deep: "#47776b",
      rgbStart: "143,207,189",
      rgbEnd: "167,152,223"
    }
  },


  reliable: {
    name: "可靠",

    target: {
      social: 58,
      expression: 48,
      attachment: 42,
      strategy: 76,
      instinct: 28,
      defense: 25,
      care: 94
    },

    quote:
      "「先把事情處理完，剩下的等等再說。」",

    hook:
      "別人慌的時候，你的大腦反而容易開始上線。",

    description:
      "遇到問題時，你比較容易先整理狀況、確認優先順序，再想接下來怎麼處理。你並不一定喜歡當領導者，但很容易成為大家最後會依靠的人。",

    theme: {
      start: "#75b5c9",
      end: "#8296d9",
      soft: "#eff9fc",
      soft2: "#f0f3ff",
      text: "#578799",
      deep: "#436b79",
      rgbStart: "117,181,201",
      rgbEnd: "130,150,217"
    }
  }

};


const QUESTIONS = [

  {
    scenarioName: "情境一｜新的班級",

    scenario:
      "開學第一週，你被安排到一個幾乎沒有熟人的新班。座位附近的人已經開始聊起來，而你旁邊的人剛好也一個人坐著。",

    question:
      "早自習還沒開始，你比較可能？",

    answers: [

      {
        text:
          "先整理自己的東西。有自然的話題再聊，不特別勉強自己開場。",

        traits: {
          social: -2,
          expression: -1,
          strategy: 1,
          instinct: -1
        }
      },

      {
        text:
          "看到對方也一個人，就隨便找個很普通的話題聊兩句。",

        traits: {
          social: 2,
          expression: 1,
          instinct: 2,
          care: 1
        }
      },

      {
        text:
          "其實想講話，但會先等對方有沒有什麼容易接的動作或話題。",

        traits: {
          social: -1,
          strategy: 2,
          defense: 1,
          care: 1
        }
      },

      {
        text:
          "如果附近的人正在聊有趣的東西，我可能直接跟著吐槽一句。",

        traits: {
          social: 2,
          expression: 2,
          instinct: 1,
          defense: 1
        }
      },

      {
        text:
          "先觀察一下誰跟誰比較熟，大概弄清楚班上的氣氛再說。",

        traits: {
          strategy: 3,
          social: -1,
          instinct: -1
        }
      }

    ]
  },


  {
    scenarioName: "情境一｜新的班級",

    scenario:
      "第二節下課，旁邊的人突然轉過來問你：「你是不是很難聊天啊？」語氣聽起來不像惡意，反而有點像故意逗你。",

    question:
      "你第一句最可能回什麼？",

    answers: [

      {
        text:
          "「你現在不是就在跟我聊天嗎？」",

        traits: {
          defense: 2,
          strategy: 1,
          expression: 1
        }
      },

      {
        text:
          "「可能吧，我不知道要跟不熟的人講什麼。」",

        traits: {
          expression: 1,
          social: -2,
          defense: -1
        }
      },

      {
        text:
          "「那是你的問題。」然後自己先笑。",

        traits: {
          defense: 2,
          instinct: 1,
          social: 1
        }
      },

      {
        text:
          "「那你可以負責變熟啊。」",

        traits: {
          social: 2,
          attachment: 1,
          expression: 2,
          instinct: 1
        }
      },

      {
        text:
          "先看她是不是認真的，再決定到底要不要回擊。",

        traits: {
          strategy: 3,
          expression: -1
        }
      }

    ]
  },


  {
    scenarioName: "情境一｜新的班級",

    scenario:
      "午休前，幾個同學準備一起去合作社，順口問你要不要一起。你其實沒有特別想買東西。",

    question:
      "你比較可能？",

    answers: [

      {
        text:
          "沒有要買就不去了，留在教室也滿舒服。",

        traits: {
          social: -2,
          attachment: -1,
          instinct: -1
        }
      },

      {
        text:
          "反正也沒事，就跟著一起去看看。",

        traits: {
          social: 2,
          instinct: 2,
          expression: 1
        }
      },

      {
        text:
          "如果剛好有一個比較熟的人會去，我就去。",

        traits: {
          attachment: 2,
          social: 1,
          defense: 1
        }
      },

      {
        text:
          "看大家是不是只是在客套，如果是真的邀請才去。",

        traits: {
          strategy: 2,
          social: -1,
          defense: 1
        }
      },

      {
        text:
          "嘴上說「你們好麻煩」，結果還是站起來跟著走。",

        traits: {
          defense: 3,
          attachment: 1,
          care: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境一｜新的班級",

    scenario:
      "放學時，那個早上跟你聊天的人突然說：「其實你跟第一印象差滿多的。」",

    question:
      "你比較在意的是？",

    answers: [

      {
        text:
          "她第一印象到底把我想成什麼。",

        traits: {
          strategy: 2,
          defense: 1
        }
      },

      {
        text:
          "她居然有注意我前後的差別。",

        traits: {
          attachment: 1,
          expression: 1,
          care: 1
        }
      },

      {
        text:
          "沒什麼特別感覺，人熟了本來就會不一樣。",

        traits: {
          defense: -1,
          instinct: 1,
          attachment: -1
        }
      },

      {
        text:
          "想問她現在的印象是不是比較好，但大概不會真的問。",

        traits: {
          attachment: 2,
          defense: 2,
          social: -1
        }
      },

      {
        text:
          "直接笑著問：「所以現在有比較喜歡我嗎？」",

        traits: {
          social: 2,
          expression: 3,
          instinct: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境二｜小組報告",

    scenario:
      "你被分進五人小組。距離報告只剩三天，其中一個組員負責的部分卻完全沒有動靜。",

    question:
      "你會先怎麼處理？",

    answers: [

      {
        text:
          "直接問進度，先確認對方到底卡在哪裡。",

        traits: {
          care: 2,
          strategy: 2,
          expression: 1
        }
      },

      {
        text:
          "先把其他能做的部分整理好，等真的需要時再處理。",

        traits: {
          strategy: 2,
          care: 2,
          expression: -1
        }
      },

      {
        text:
          "在群組提醒一句，但如果對方還是沒反應，我會開始不爽。",

        traits: {
          defense: 2,
          expression: 2,
          care: 1
        }
      },

      {
        text:
          "先私訊問是不是發生什麼事，不想一開始就在群組點名。",

        traits: {
          care: 3,
          attachment: 1,
          strategy: 1
        }
      },

      {
        text:
          "先觀察其他組員有沒有也注意到，看大家的反應再決定怎麼講。",

        traits: {
          strategy: 3,
          social: -1,
          expression: -1
        }
      }

    ]
  },


  {
    scenarioName: "情境二｜小組報告",

    scenario:
      "對方終於把檔案傳來，但你一看就發現其中有一個很重要的地方弄錯了。",

    question:
      "你最可能怎麼提醒？",

    answers: [

      {
        text:
          "直接指出哪裡有問題，再附上怎麼改最快。",

        traits: {
          care: 3,
          strategy: 2,
          expression: 1
        }
      },

      {
        text:
          "先問她是不是這樣理解題目，再慢慢把錯誤帶出來。",

        traits: {
          care: 2,
          strategy: 2,
          expression: -1
        }
      },

      {
        text:
          "「你這裡是不是直接把題目看反了？」",

        traits: {
          defense: 2,
          expression: 2,
          strategy: 1
        }
      },

      {
        text:
          "如果改起來很快，我可能直接先修掉再跟她說。",

        traits: {
          care: 3,
          expression: -2,
          strategy: 1
        }
      },

      {
        text:
          "先開個玩笑讓她知道有問題，再一起修。",

        traits: {
          social: 2,
          instinct: 2,
          expression: 2,
          care: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境二｜小組報告",

    scenario:
      "報告當天，老師突然問了一個你們事前完全沒準備的問題，全組一瞬間都安靜了。",

    question:
      "你的反應比較像？",

    answers: [

      {
        text:
          "先整理題目邏輯，能回答多少就回答多少。",

        traits: {
          strategy: 3,
          care: 2,
          instinct: -1
        }
      },

      {
        text:
          "想到什麼先講，邊講邊把答案拼完整。",

        traits: {
          instinct: 3,
          expression: 2,
          social: 1
        }
      },

      {
        text:
          "如果沒有人要講，我最後還是會硬著頭皮開口。",

        traits: {
          care: 2,
          social: -1,
          defense: 1,
          expression: 1
        }
      },

      {
        text:
          "先看老師真正想問的核心是什麼，再避開不確定的部分。",

        traits: {
          strategy: 3,
          expression: -1
        }
      },

      {
        text:
          "可能直接說：「老師這題不在我們劇本裡欸。」先救一下氣氛。",

        traits: {
          social: 2,
          instinct: 2,
          defense: 2
        }
      }

    ]
  },


  {
    scenarioName: "情境二｜小組報告",

    scenario:
      "報告結束後，有組員傳訊息說：「今天還好有你。」",

    question:
      "你比較可能怎麼回？",

    answers: [

      {
        text:
          "「大家都有做啦。」",

        traits: {
          care: 2,
          expression: -1,
          defense: -1
        }
      },

      {
        text:
          "「你們下次不要再嚇我就好。」",

        traits: {
          defense: 2,
          care: 1,
          expression: 1
        }
      },

      {
        text:
          "回個貼圖，然後其實心情很好。",

        traits: {
          attachment: 1,
          expression: -1,
          instinct: 1
        }
      },

      {
        text:
          "「所以要不要請我喝飲料？」",

        traits: {
          social: 2,
          instinct: 1,
          strategy: 1
        }
      },

      {
        text:
          "看到後會記很久，但當下可能只回一句「沒事」。",

        traits: {
          attachment: 2,
          expression: -2,
          defense: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境三｜群組聊天",

    scenario:
      "晚上班群正在聊天。你回了一句，但沒有人接，話題很快被別人帶走。",

    question:
      "你比較可能？",

    answers: [

      {
        text:
          "沒差，本來就不一定每句都有人回。",

        traits: {
          attachment: -2,
          defense: -1,
          social: -1
        }
      },

      {
        text:
          "覺得有點尷尬，但過一下也就算了。",

        traits: {
          social: -2,
          defense: 1,
          expression: -1
        }
      },

      {
        text:
          "等下一個適合的話題，再重新加入。",

        traits: {
          strategy: 2,
          social: 1,
          defense: 1
        }
      },

      {
        text:
          "自己再補一句：「好，沒人理我。」",

        traits: {
          expression: 2,
          defense: 2,
          social: 1
        }
      },

      {
        text:
          "如果有熟人也在群裡，我可能會私訊她吐槽。",

        traits: {
          attachment: 2,
          defense: 1,
          social: -1
        }
      }

    ]
  },


  {
    scenarioName: "情境三｜群組聊天",

    scenario:
      "過了一陣子，有人私訊問你剛才在群組講的事情。",

    question:
      "你會怎麼回？",

    answers: [

      {
        text:
          "正常回答，剛才群組有沒有人理其實不重要。",

        traits: {
          attachment: -1,
          care: 1,
          defense: -1
        }
      },

      {
        text:
          "「你們剛剛不是都沒看到嗎？」但還是回答。",

        traits: {
          defense: 3,
          care: 1,
          attachment: 1
        }
      },

      {
        text:
          "把資訊整理得比剛才更清楚再傳給她。",

        traits: {
          care: 3,
          strategy: 2
        }
      },

      {
        text:
          "回答完順便開始聊別的。",

        traits: {
          social: 2,
          attachment: 1,
          instinct: 2
        }
      },

      {
        text:
          "其實有點開心她特別跑來問我，但不會表現得太明顯。",

        traits: {
          attachment: 2,
          expression: -2,
          defense: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境三｜群組聊天",

    scenario:
      "同一個人之後開始常常私訊你，有時甚至只是傳一些很無聊的小事。",

    question:
      "你會怎麼看？",

    answers: [

      {
        text:
          "如果聊得來就聊，沒什麼特別需要定義的。",

        traits: {
          instinct: 2,
          attachment: 1,
          defense: -1
        }
      },

      {
        text:
          "開始習慣她出現在通知裡，哪天突然沒傳反而可能會注意。",

        traits: {
          attachment: 3,
          care: 1
        }
      },

      {
        text:
          "會慢慢觀察她是不是只對我這樣。",

        traits: {
          strategy: 3,
          attachment: 2
        }
      },

      {
        text:
          "表面嫌她一天到晚傳廢話，但每次基本上都會回。",

        traits: {
          defense: 3,
          attachment: 2,
          care: 1
        }
      },

      {
        text:
          "只要不是要我一直想話題，我其實滿喜歡這種聊天。",

        traits: {
          social: -1,
          attachment: 2,
          expression: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境三｜群組聊天",

    scenario:
      "有一天她整晚都沒出現。隔天才說自己只是太累直接睡著。",

    question:
      "你的反應比較像？",

    answers: [

      {
        text:
          "正常啊，累了就睡。",

        traits: {
          attachment: -2,
          strategy: -1,
          defense: -1
        }
      },

      {
        text:
          "「喔。」但其實昨天多少有注意到。",

        traits: {
          defense: 2,
          attachment: 2,
          expression: -2
        }
      },

      {
        text:
          "會問她最近是不是太累，有沒有發生什麼事。",

        traits: {
          care: 3,
          attachment: 1,
          expression: 1
        }
      },

      {
        text:
          "昨天大概就已經想過幾種她沒出現的原因了。",

        traits: {
          strategy: 3,
          attachment: 2
        }
      },

      {
        text:
          "直接吐槽：「害我少收到一堆廢話。」",

        traits: {
          defense: 2,
          social: 1,
          attachment: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境四｜臨時出遊",

    scenario:
      "週末原本沒有安排。朋友早上突然傳訊息：「下午要不要去一個我們都沒去過的地方？」",

    question:
      "你的第一反應？",

    answers: [

      {
        text:
          "先問地點、交通和大概要幹嘛。",

        traits: {
          strategy: 3,
          instinct: -2
        }
      },

      {
        text:
          "好啊，到了再研究。",

        traits: {
          instinct: 3,
          social: 2,
          expression: 1
        }
      },

      {
        text:
          "本來有點懶，但如果是很熟的人約，最後大概會去。",

        traits: {
          attachment: 2,
          defense: 1,
          social: -1
        }
      },

      {
        text:
          "先查評價跟照片，確定不是什麼奇怪的地方。",

        traits: {
          strategy: 3,
          defense: 1,
          instinct: -1
        }
      },

      {
        text:
          "直接問還有誰一起，這比地點重要。",

        traits: {
          attachment: 2,
          social: 1,
          strategy: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境四｜臨時出遊",

    scenario:
      "到了之後才發現朋友看錯營業時間，原本要去的店今天休息。",

    question:
      "你最可能？",

    answers: [

      {
        text:
          "立刻找附近其他選項，先把下一步決定好。",

        traits: {
          care: 2,
          strategy: 3,
          instinct: -1
        }
      },

      {
        text:
          "笑她一頓，然後隨便找個地方逛。",

        traits: {
          defense: 2,
          instinct: 3,
          social: 1
        }
      },

      {
        text:
          "其實無所謂，重點本來就是一起出來。",

        traits: {
          attachment: 3,
          instinct: 1,
          care: 1
        }
      },

      {
        text:
          "嘴上說「我就知道」，其實也沒真的生氣。",

        traits: {
          defense: 3,
          attachment: 1,
          strategy: 1
        }
      },

      {
        text:
          "先看看她是不是很自責，如果是的話就不吐槽了。",

        traits: {
          care: 3,
          strategy: 1,
          expression: -1
        }
      }

    ]
  },


  {
    scenarioName: "情境四｜臨時出遊",

    scenario:
      "走到一半突然下雨，你們只有一把傘。",

    question:
      "比較像你的反應是？",

    answers: [

      {
        text:
          "先找最近可以躲雨的地方。",

        traits: {
          strategy: 2,
          care: 2,
          instinct: -1
        }
      },

      {
        text:
          "直接一起撐啊，不然勒。",

        traits: {
          attachment: 2,
          instinct: 2,
          expression: 1
        }
      },

      {
        text:
          "會稍微有點不自在，但也不會特別說什麼。",

        traits: {
          social: -2,
          expression: -2,
          attachment: 1
        }
      },

      {
        text:
          "如果她站太遠，我可能嘴上嫌她：「妳是想淋濕是不是？」",

        traits: {
          defense: 3,
          care: 2,
          attachment: 1
        }
      },

      {
        text:
          "故意把傘偏過去一點，看她什麼時候發現。",

        traits: {
          strategy: 2,
          social: 2,
          instinct: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境四｜臨時出遊",

    scenario:
      "回家後，朋友傳了一句：「今天雖然一直出包，但我覺得滿好玩的。」",

    question:
      "你最可能回？",

    answers: [

      {
        text:
          "「嗯，我也覺得。」",

        traits: {
          expression: -2,
          attachment: 1
        }
      },

      {
        text:
          "「下次換我決定去哪。」",

        traits: {
          strategy: 2,
          care: 1,
          expression: 1
        }
      },

      {
        text:
          "「主要是看妳出包很好玩。」",

        traits: {
          defense: 2,
          social: 1,
          instinct: 1
        }
      },

      {
        text:
          "「那下次再去別的地方啊。」",

        traits: {
          attachment: 2,
          social: 2,
          expression: 2
        }
      },

      {
        text:
          "其實看到「下次」這個念頭會比今天去哪裡更開心。",

        traits: {
          attachment: 3,
          expression: -1,
          care: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境五｜朋友鬧彆扭",

    scenario:
      "你很熟的朋友今天突然明顯比平常冷淡，但你不知道原因。",

    question:
      "你第一步會？",

    answers: [

      {
        text:
          "先讓她自己待一下，不想在她不想說時逼問。",

        traits: {
          care: 2,
          attachment: -1,
          strategy: 1
        }
      },

      {
        text:
          "直接問：「妳今天怎麼了？」",

        traits: {
          expression: 2,
          attachment: 2,
          care: 2
        }
      },

      {
        text:
          "先回想自己最近是不是哪裡惹到她。",

        traits: {
          strategy: 3,
          attachment: 2
        }
      },

      {
        text:
          "她冷我也先冷，看看到底是什麼情況。",

        traits: {
          defense: 3,
          strategy: 1,
          expression: -2
        }
      },

      {
        text:
          "找一個平常會聊的話題試探，看她是不是只是在心情不好。",

        traits: {
          strategy: 2,
          attachment: 1,
          social: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境五｜朋友鬧彆扭",

    scenario:
      "後來你才知道，她其實誤會了你前幾天說的一句話。",

    question:
      "你比較可能？",

    answers: [

      {
        text:
          "把事情說清楚，先解決誤會再說。",

        traits: {
          strategy: 2,
          care: 2,
          defense: -1
        }
      },

      {
        text:
          "「妳怎麼會理解成那樣啦。」然後趕快解釋。",

        traits: {
          defense: 2,
          expression: 2,
          care: 1
        }
      },

      {
        text:
          "會有點難過她居然悶著不跟我說。",

        traits: {
          attachment: 3,
          expression: 1
        }
      },

      {
        text:
          "先確認她真正介意的是哪一部分，不想只解釋表面。",

        traits: {
          strategy: 3,
          care: 2
        }
      },

      {
        text:
          "可能一開始不知道怎麼講，但最後還是會很認真解釋。",

        traits: {
          social: -1,
          defense: 1,
          care: 2,
          attachment: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境五｜朋友鬧彆扭",

    scenario:
      "事情講開後，她說：「我還以為妳根本不在乎。」",

    question:
      "你最接近哪個反應？",

    answers: [

      {
        text:
          "「我要是不在乎，我現在幹嘛跟妳解釋。」",

        traits: {
          defense: 3,
          attachment: 2,
          care: 1
        }
      },

      {
        text:
          "直接告訴她自己其實很在乎。",

        traits: {
          expression: 3,
          attachment: 2,
          defense: -2
        }
      },

      {
        text:
          "會沉默一下，不太知道這句話應該怎麼接。",

        traits: {
          social: -2,
          expression: -2,
          attachment: 1
        }
      },

      {
        text:
          "先問她到底是從哪裡得出這個結論。",

        traits: {
          strategy: 3,
          expression: -1
        }
      },

      {
        text:
          "開個玩笑把氣氛拉回來，但之後會記得自己要表現得更明顯一點。",

        traits: {
          social: 2,
          instinct: 2,
          care: 2
        }
      }

    ]
  },


  {
    scenarioName: "情境六｜意外空出的一天",

    scenario:
      "原本安排好的事情臨時取消，你突然多出整整一個下午，而且沒有任何人找你。",

    question:
      "你最可能怎麼使用這段時間？",

    answers: [

      {
        text:
          "太好了，終於可以完全自己待著。",

        traits: {
          social: -3,
          attachment: -2,
          instinct: 1
        }
      },

      {
        text:
          "想到什麼做什麼，可能最後跟原本預想完全不同。",

        traits: {
          instinct: 3,
          strategy: -2
        }
      },

      {
        text:
          "開始整理之前一直沒處理的事情。",

        traits: {
          strategy: 3,
          care: 1,
          instinct: -2
        }
      },

      {
        text:
          "看看有沒有熟人也沒事，問她要不要出來。",

        traits: {
          social: 2,
          attachment: 3,
          expression: 1
        }
      },

      {
        text:
          "先耍廢一陣子，然後突然覺得自己是不是浪費了一下午。",

        traits: {
          instinct: 1,
          defense: 1,
          strategy: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境六｜意外空出的一天",

    scenario:
      "晚上有人突然問你：「妳今天都在幹嘛？」",

    question:
      "哪個回答最像你？",

    answers: [

      {
        text:
          "「沒幹嘛。」即使其實做了一堆事。",

        traits: {
          expression: -3,
          defense: 1
        }
      },

      {
        text:
          "從下午第一件事開始全部講一遍。",

        traits: {
          expression: 3,
          social: 2,
          attachment: 1
        }
      },

      {
        text:
          "挑一兩件有趣的講，沒必要全部報告。",

        traits: {
          strategy: 1,
          expression: 1,
          attachment: -1
        }
      },

      {
        text:
          "先反問她：「妳怎麼突然想知道？」",

        traits: {
          strategy: 2,
          attachment: 1,
          defense: 1
        }
      },

      {
        text:
          "如果是很熟的人，我可能直接傳照片或截圖，比打字快。",

        traits: {
          attachment: 2,
          instinct: 2,
          expression: 1
        }
      }

    ]
  },


  {
    scenarioName: "情境六｜意外空出的一天",

    scenario:
      "睡前回頭想今天，你發現自己其實最容易記住的不是做了什麼，而是一些很小的互動。",

    question:
      "下面哪一句最接近你？",

    answers: [

      {
        text:
          "我喜歡有人陪，但我也很需要自己的空間。",

        traits: {
          attachment: 1,
          social: -1,
          defense: -1,
          care: 1
        }
      },

      {
        text:
          "真正重要的人，我確實會投入得比自己想像中更多。",

        traits: {
          attachment: 3,
          care: 2
        }
      },

      {
        text:
          "有些情緒自己知道就好，講出來反而很怪。",

        traits: {
          expression: -3,
          defense: 2
        }
      },

      {
        text:
          "我通常會先觀察清楚，再決定自己真正要做什麼。",

        traits: {
          strategy: 3,
          instinct: -2
        }
      },

      {
        text:
          "我不太喜歡預設自己應該是什麼樣的人，當下舒服比較重要。",

        traits: {
          instinct: 3,
          defense: -2,
          strategy: -1
        }
      }

    ]
  }

];
