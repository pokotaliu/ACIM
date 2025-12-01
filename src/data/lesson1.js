// Lesson 1: Nothing I see means anything.
// 完整的沉浸式劇本 - 每個場景都有精心設計的出場時機和節奏

export const lesson1 = {
  id: 1,
  title: {
    en: "Nothing I see means anything.",
    zh: "我看到的一切都沒有意義。"
  },

  scenes: [
    // ===== 第一幕：標題 =====
    {
      id: "title",
      type: "title",
      elements: [
        {
          type: "text",
          content: "Nothing I see means anything.",
          style: "title-en",
          delay: 0
        },
        {
          type: "text",
          content: "我看到的一切都沒有意義。",
          style: "title-zh",
          delay: 2000
        }
      ],
      pauseAfter: 3000
    },

    // ===== 第二幕：開場 =====
    {
      id: "opening",
      type: "commentary",
      elements: [
        { type: "text", content: "這是練習手冊的第一句話。", delay: 0 },
        { type: "text", content: "課程沒有從「愛」開始。", delay: 1500 },
        { type: "text", content: "沒有從「上主」開始。", delay: 1000 },
        { type: "text", content: "而是從否定開始。從瓦解開始。", delay: 1000 }
      ]
    },

    // ===== 第三幕：Nothing =====
    {
      id: "word-nothing",
      type: "word-focus",
      word: "Nothing",
      elements: [
        { type: "word", content: "「Nothing」", style: "word-highlight", delay: 0 },
        { type: "text", content: "沒有任何東西。", delay: 2000 },
        { type: "text", content: "不是「大部分東西沒有意義」。", delay: 1500 },
        { type: "text", content: "不是「某些東西沒有意義」。", delay: 800 },
        { type: "text", content: "是「沒有任何東西」有意義。", delay: 800 },
        { type: "pause", duration: 2000 },
        { type: "text", content: "這是一個全稱否定。", delay: 0 },
        { type: "text", content: "一個極端的聲明。", delay: 800 }
      ]
    },

    // ===== 第四幕：形上學背景 =====
    {
      id: "metaphysics",
      type: "commentary",
      elements: [
        { type: "text", content: "奇蹟課程的世界觀是這樣的——", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "只有兩個層次。", delay: 0 },
        { type: "text", content: "上主的層次：永恆不變，絕對真實。", delay: 1000 },
        { type: "text", content: "世界的層次：不斷變化，終將消逝。", delay: 1000 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "會改變的，不是上主創造的。", delay: 0 },
        { type: "text", content: "會消逝的，不是真實的。", delay: 1000 },
        { type: "pause", duration: 2000 },
        { type: "text", content: "你看到的這個世界，每一樣東西都在變。", delay: 0 },
        { type: "text", content: "所以⋯⋯", delay: 1500 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "它不是真實的。", delay: 0 },
        { type: "text", content: "它沒有真正的意義。", delay: 1000 }
      ]
    },

    // ===== 第五幕：課文引用 - 練習指導 =====
    {
      id: "quote-practice",
      type: "quote",
      elements: [
        {
          type: "quote-block",
          en: "Now look slowly around you, and practice applying this idea very specifically to whatever you see.",
          zh: "現在緩緩環顧四周，將這個觀念具體地應用到你看見的任何事物上。",
          delay: 0
        },
        { type: "pause", duration: 2000 }
      ]
    },

    // ===== 第六幕：練習示範 =====
    {
      id: "practice-demo",
      type: "practice",
      elements: [
        {
          type: "practice-line",
          en: "This table does not mean anything.",
          zh: "這張桌子沒有任何意義。",
          delay: 0
        },
        { type: "pause", duration: 1500 },
        {
          type: "practice-line",
          en: "This chair does not mean anything.",
          zh: "這張椅子沒有任何意義。",
          delay: 0
        },
        { type: "pause", duration: 1500 },
        {
          type: "practice-line",
          en: "This hand does not mean anything.",
          zh: "這隻手沒有任何意義。",
          delay: 0
        }
      ]
    },

    // ===== 第七幕：小我的反應 =====
    {
      id: "ego-reaction",
      type: "commentary",
      elements: [
        { type: "text", content: "現在，你的小我可能在說——", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "「這太荒謬了。」", style: "ego-voice", delay: 0 },
        { type: "text", content: "「桌子當然有意義，我在上面吃飯。」", style: "ego-voice", delay: 800 },
        { type: "text", content: "「我的手當然有意義，我用它做事。」", style: "ego-voice", delay: 800 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "這正是重點。", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "課程要你質疑的，正是這種「當然」。", delay: 0 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "「當然」是小我的防線。", delay: 0 },
        { type: "text", content: "一旦你開始質疑「當然」，小我就開始動搖。", delay: 1000 }
      ]
    },

    // ===== 第八幕：I see =====
    {
      id: "word-i-see",
      type: "word-focus",
      elements: [
        { type: "word", content: "「I see」", style: "word-highlight", delay: 0 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "我看到的。", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "這個「我」是誰？", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "這個「看」是什麼？", delay: 0 },
        { type: "pause", duration: 2000 },
        { type: "text", content: "課程會慢慢告訴我們——", delay: 0 },
        { type: "text", content: "那個以為自己在「看」的「我」，是小我。", delay: 1200 },
        { type: "text", content: "而小我的「看」，從來不是真正的看。", delay: 1200 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "小我的看，是投射。", delay: 0 },
        { type: "pause", duration: 2000 },
        { type: "text", content: "你看著一張桌子。", delay: 0 },
        { type: "text", content: "你以為你看到的是桌子。", delay: 1200 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "但你看到的是——", delay: 0 },
        { type: "text", content: "你過去對「桌子」的所有記憶。", delay: 1000 },
        { type: "text", content: "你對這張特定桌子的情感。", delay: 800 },
        { type: "text", content: "你的判斷。你的分類。", delay: 800 },
        { type: "pause", duration: 2000 },
        { type: "text", content: "你看到的是你的心，不是桌子。", delay: 0 }
      ]
    },

    // ===== 第九幕：課文 - 不分順序 =====
    {
      id: "quote-no-order",
      type: "quote",
      elements: [
        {
          type: "quote-block",
          en: "Notice that these statements are not arranged in any order, and make no allowance for differences in the kinds of things to which they are applied.",
          zh: "注意，這些陳述沒有特定順序，也不考慮所應用事物之間的差異。",
          delay: 0
        },
        { type: "pause", duration: 2000 },
        { type: "text", content: "沒有順序。不分種類。", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "因為在這個練習裡，一個東西跟另一個東西是一樣的。", delay: 0 },
        { type: "pause", duration: 1500 },
        {
          type: "quote-block",
          en: "One thing is like another as far as the application of the idea is concerned.",
          zh: "就這個觀念的應用而言，一個東西和另一個東西是一樣的。",
          delay: 0
        }
      ]
    },

    // ===== 第十幕：練習的態度 =====
    {
      id: "practice-attitude",
      type: "quote",
      elements: [
        {
          type: "quote-block",
          en: "Do not attempt to apply it to everything you see, for these exercises should not become ritualistic.",
          zh: "不要試圖把它應用到你看見的每樣東西，因為這些練習不應該變成儀式。",
          delay: 0
        },
        { type: "pause", duration: 2000 },
        { type: "text", content: "小我很擅長把靈性練習變成另一種執著。", delay: 0 },
        { type: "pause", duration: 1000 },
        { type: "text", content: "「我要做好這個練習。」", style: "ego-voice", delay: 0 },
        { type: "text", content: "「我要對每個東西都說。」", style: "ego-voice", delay: 600 },
        { type: "text", content: "「我要做得正確。」", style: "ego-voice", delay: 600 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "這就是小我接管了。", delay: 0 }
      ]
    },

    // ===== 第十一幕：從容 =====
    {
      id: "leisure",
      type: "climax",
      elements: [
        {
          type: "quote-block",
          en: "A comfortable sense of leisure is essential.",
          zh: "從容不迫的感覺是必要的。",
          style: "emphasis",
          delay: 0
        },
        { type: "pause", duration: 3000 },
        { type: "text", content: "課程用這句話結束第一課。", delay: 0 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "從容。不迫。", delay: 0 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "練習的品質比數量重要。", delay: 0 },
        { type: "text", content: "帶著輕鬆的心做一分鐘，", delay: 1200 },
        { type: "text", content: "比帶著緊張的心做十分鐘有效。", delay: 800 }
      ]
    },

    // ===== 第十二幕：收尾 =====
    {
      id: "closing",
      type: "closing",
      elements: [
        { type: "fade-out-all", duration: 2000 },
        {
          type: "text",
          content: "Nothing I see means anything.",
          style: "title-en",
          delay: 0
        },
        {
          type: "text",
          content: "我看到的一切都沒有意義。",
          style: "title-zh",
          delay: 1000
        },
        { type: "pause", duration: 3000 },
        { type: "text", content: "這是一個邀請。", delay: 0 },
        { type: "pause", duration: 1500 },
        { type: "text", content: "你願不願意開始質疑你的知覺？", delay: 0 },
        { type: "pause", duration: 3000 },
        { type: "text", content: "如果你願意，我們就可以開始這趟旅程。", delay: 0 }
      ]
    },

    // ===== 導航 =====
    {
      id: "navigation",
      type: "nav",
      elements: [
        { type: "button", label: "進入練習模式", action: "practice-mode" },
        { type: "button", label: "下一課 →", action: "next-lesson" }
      ]
    }
  ],

  // Practice prompts for practice mode
  practicePrompts: [
    "緩緩環顧四周...",
    "選一個物品...",
    "對它說：這個東西沒有任何意義...",
    "不要急，保持從容...",
    "再選另一個物品...",
    "它也沒有任何意義...",
    "讓這個想法輕輕地存在..."
  ]
};

// Style definitions for different element types
export const styles = {
  "title-en": "text-4xl md:text-5xl font-serif text-center leading-relaxed",
  "title-zh": "text-2xl md:text-3xl text-center mt-4 leading-relaxed",
  "word-highlight": "text-3xl md:text-4xl font-serif text-center",
  "ego-voice": "italic text-[var(--color-text-muted)]",
  "emphasis": "text-2xl md:text-3xl font-serif"
};
