"use client";

import { useEffect, useState } from "react";
import Cat3DModel from "./cat-3d-model";

type Locale = "en" | "ru";

const projects = [
  {
    code: "D-01",
    folderHref: "https://drive.google.com/drive/folders/1RXwIFvlev8hFutVr_ChGR4dIiZwCU6O4?usp=drive_link",
    title: { en: "Design", ru: "Дизайн" },
    discipline: {
      en: "BANNERS / IMAGES / OTHER",
      ru: "БАННЕРЫ / КАРТИНКИ / ПРОЧЕЕ",
    },
    year: "2022—",
    caption: {
      en: "Commercial banners, thumbnails and game visuals made in Photoshop.",
      ru: "Коммерческие баннеры, обложки и игровая графика, собранные в Photoshop.",
    },
    media: [
      { kind: "image", src: "/portfolio/design-army.webp", label: "ARMY", href: "https://drive.google.com/file/d/1c_ixlHBNe-pwm6io1F4uvlZ6XJ1gejCs/view" },
      { kind: "image", src: "/portfolio/design-collage.webp", label: "COLLAGE", href: "https://drive.google.com/file/d/1vdgM5_ttWeEAcs2O-lWA-qja1HTe9JqJ/view" },
      { kind: "image", src: "/portfolio/design-oceans.webp", label: "OCEAN'S", href: "https://drive.google.com/file/d/11rnwQjFMkt46dvarR4-GBYczRgI9WMFx/view" },
      { kind: "image", src: "/portfolio/design-manul.webp", label: "GHOST OF MANUL", href: "https://drive.google.com/file/d/1JN1POOxR6bjuCfdhVS6gux0c_F_V6RHA/view" },
    ],
  },
  {
    code: "A-02",
    folderHref: "https://drive.google.com/drive/folders/1zRo4pwItW4w9kJqYU9Zm_DbZzdViEKNK",
    title: { en: "Animation", ru: "Анимация" },
    discipline: { en: "2D / 3D / CHARACTERS", ru: "2D / 3D / ПЕРСОНАЖИ" },
    year: "2024—",
    caption: {
      en: "Character animation and cutout work made with Moho rigs.",
      ru: "Персонажная и перекладочная анимация, собранная на ригах в Moho.",
    },
    media: [
      { kind: "video", id: "1HaZl1eBRG7MW5f4OECALMn9Pku_cv8HY", poster: "/portfolio/animation-502.webp", label: "502", href: "https://drive.google.com/file/d/1HaZl1eBRG7MW5f4OECALMn9Pku_cv8HY/view" },
      { kind: "video", id: "1Dakf69j49eQ8wlHJqq-nf39cdO7lOdqC", poster: "/portfolio/animation-robots.webp", label: "DANCING ROBOTS", href: "https://drive.google.com/file/d/1Dakf69j49eQ8wlHJqq-nf39cdO7lOdqC/view" },
      { kind: "video", id: "1F6zmw4Y2Ebot8FnMCNbkh77Ros0_D2go", poster: "/portfolio/animation-universe.webp", label: "LIL UNIVERSE", href: "https://drive.google.com/file/d/1F6zmw4Y2Ebot8FnMCNbkh77Ros0_D2go/view" },
      { kind: "video", id: "1R7ejRrGf_ACvz1TNuQOJPVS6k7YOBJNt", poster: "/portfolio/animation-pes.webp", label: "PES", href: "https://drive.google.com/file/d/1R7ejRrGf_ACvz1TNuQOJPVS6k7YOBJNt/view" },
    ],
  },
  {
    code: "E-03",
    folderHref: "https://drive.google.com/drive/folders/1R_PkOazenv5rVU62Y3LGC_9qrwawX8nT?usp=drive_link",
    title: { en: "Editing", ru: "Монтаж" },
    discipline: { en: "VIDEO / SOUND / COLOR", ru: "ВИДЕО / ЗВУК / ЦВЕТ" },
    year: "2023—",
    caption: {
      en: "A fast-paced event promo assembled, graded and finished in DaVinci Resolve.",
      ru: "Динамичный проморолик: монтаж, цвет и финальная сборка в DaVinci Resolve.",
    },
    media: [
      { kind: "video", id: "1HDKsnNhNORYSc8hlgCUjhd7lK9kqP8Lf", poster: "/portfolio/editing-rave.webp", label: "RAVE PLANET", href: "https://drive.google.com/file/d/1HDKsnNhNORYSc8hlgCUjhd7lK9kqP8Lf/view" },
      { kind: "video", id: "11GHNxSKaQsXLaBjVN66vb8j2Jj0n5KEQ", poster: "/portfolio/editing-forum.webp", label: "FORUM 2023", href: "https://drive.google.com/file/d/11GHNxSKaQsXLaBjVN66vb8j2Jj0n5KEQ/view" },
      { kind: "video", id: "1nDkKIR5Bk9JIlmn2FqTuluA4m8YySFl_", poster: "/portfolio/editing-rocket.webp", label: "ROCKET", href: "https://drive.google.com/file/d/1nDkKIR5Bk9JIlmn2FqTuluA4m8YySFl_/view" },
      { kind: "video", id: "1ABRySv5n0J9e4Zfr_pYsuniR1nS9lqLy", poster: "/portfolio/editing-viking.webp", label: "VIKING", href: "https://drive.google.com/file/d/1ABRySv5n0J9e4Zfr_pYsuniR1nS9lqLy/view" },
    ],
  },
  {
    code: "AI-04",
    folderHref: "https://drive.google.com/drive/folders/1os5xcU7bABfoZfB1NcY0QBLDu-E0cvlK?usp=drive_link",
    title: { en: "AI Motion", ru: "ИИ-моушен" },
    discipline: {
      en: "AI VIDEO / VFX / ANIMATION",
      ru: "AI-ВИДЕО / VFX / АНИМАЦИЯ",
    },
    year: "2024—",
    caption: {
      en: "A collection of AI materials and my work with generative visuals.",
      ru: "Здесь собраны ИИ-материалы и мои работы с генеративным визуалом.",
    },
    media: [
      { kind: "video", id: "1OJDEug_YAt4xGglbP7wcEiOBOgpVKYKd", poster: "/portfolio/ai-mara.webp", label: "MARA / COLLAB", href: "https://drive.google.com/file/d/1OJDEug_YAt4xGglbP7wcEiOBOgpVKYKd/view" },
      { kind: "video", id: "1v-P4MSmtHe4Qto9X02QrPbLnqH7bmMYe", poster: "/portfolio/ai-aeon.webp", label: "AEON / COLLAB", href: "https://drive.google.com/file/d/1v-P4MSmtHe4Qto9X02QrPbLnqH7bmMYe/view" },
      { kind: "video", id: "1rsWeO6raeRCYoEjXCEYlMqCrbWF26DQe", poster: "/portfolio/ai-film.webp", label: "FILM", href: "https://drive.google.com/file/d/1rsWeO6raeRCYoEjXCEYlMqCrbWF26DQe/view" },
      { kind: "video", id: "1qepydv5WvlmBxXnteTDZdTcDrwbY5sjM", poster: "/portfolio/ai-study.webp", label: "AI STUDY", href: "https://drive.google.com/file/d/1qepydv5WvlmBxXnteTDZdTcDrwbY5sjM/view" },
    ],
  },
  {
    code: "X-05",
    folderHref: "https://drive.google.com/drive/folders/1__OhyH3Gdvv0N__A95QzfXMzDlH5VynY?usp=drive_link",
    title: { en: "Other", ru: "Прочее" },
    discipline: {
      en: "RIGGING / CHARACTERS / MOHO",
      ru: "РИГГИНГ / ПЕРСОНАЖИ / MOHO",
    },
    year: "—",
    caption: {
      en: "Rigging examples: character setup, controls and animation tests in Moho.",
      ru: "Примеры риггинга персонажей: настройка костей, контроллеров и тесты движения в Moho.",
    },
    media: [
      { kind: "video", id: "18hQ6Cbu-dK8bDm-PPQiMq9WREITngbL5", poster: "/portfolio/rig-character.webp", label: "CHARACTER RIG", href: "https://drive.google.com/file/d/18hQ6Cbu-dK8bDm-PPQiMq9WREITngbL5/view" },
      { kind: "video", id: "1j5JC5vt4s11ZywKqJOQyyKbm-S0shJUg", poster: "/portfolio/rig-black-cat.webp", label: "BLACK CAT RIG", href: "https://drive.google.com/file/d/1j5JC5vt4s11ZywKqJOQyyKbm-S0shJUg/view" },
    ],
  },
] as const;

const lanes: [string, Record<Locale, string>, Record<Locale, string>, string][] = [
  ["01", { en: "DESIGN", ru: "ДИЗАЙН" }, { en: "Photoshop · Figma", ru: "Photoshop · Figma" }, "lane-edit"],
  ["02", { en: "ANIMATION", ru: "АНИМАЦИИ" }, { en: "Moho · Adobe Animate", ru: "Moho · Adobe Animate" }, "lane-motion"],
  ["03", { en: "EDITING", ru: "МОНТАЖ" }, { en: "DaVinci Resolve", ru: "DaVinci Resolve" }, "lane-ai"],
  ["04", { en: "AI MOTION", ru: "ИИ-МОУШЕН" }, { en: "Kling · Seedance · Magnific · Grok · Flow", ru: "Kling · Seedance · Magnific · Grok · Flow" }, "lane-2d"],
  ["05", { en: "OTHER", ru: "ПРОЧЕЕ" }, { en: "Concepts · Scripts · References", ru: "Концепты · Сценарии · Референсы" }, "lane-finish"],
];

const introCopy = "MILKMAN";
const questionSequence = [1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2];
const skillPanels = [
  {
    kind: "design",
    label: { en: "PHOTOSHOP IS HOME", ru: "PHOTOSHOP — ОСНОВА" },
    text: {
      en: "Adobe Photoshop is where I started and where I handle everything image-related. Figma is my additional tool for website layouts.",
      ru: "Adobe Photoshop — то, с чего я начинал и где делаю всё, что связано с изображениями. Figma использую как дополнительный инструмент для макетов сайтов.",
    },
  },
  {
    kind: "animation",
    label: { en: "RIG AND KEYS", ru: "РИГ И КЛЮЧИ" },
    text: {
      en: "I create cutout animation in Moho — from children’s content to serious projects. Adobe Animate is my additional animation tool.",
      ru: "Создаю перекладочную анимацию в Moho — от детского контента до серьёзных проектов. Adobe Animate использую как дополнительный инструмент.",
    },
  },
  {
    kind: "editing",
    label: { en: "MY MAIN TOOL", ru: "ОСНОВНОЙ ИНСТРУМЕНТ" },
    text: {
      en: "DaVinci Resolve is my favorite and primary video tool. Everything imaginable — and a few impossible things — happens to footage here.",
      ru: "DaVinci Resolve — мой любимый и основной инструмент для редактирования видео. Здесь с роликами делаются все мыслимые и немыслимые вещи.",
    },
  },
  {
    kind: "ai",
    label: { en: "ENGINEERED MAGIC", ru: "ИНЖЕНЕРНОЕ ЧУДО" },
    text: {
      en: "A short prompt, ready references, prepared backgrounds and lots of experience with different neural tools — this is where engineering turns into magic. Kling, Seedance and Magnific are my favorites; Grok and Flow are the more budget-friendly options.",
      ru: "Короткий промпт, готовые референсы, заготовленные фоны и большой опыт с разными нейросетями — здесь творится чудо инженерии. Kling, Seedance и Magnific — мои любимые инструменты; Grok и Flow использую как более бюджетные варианты.",
    },
  },
  {
    kind: "other",
    label: { en: "BEFORE PRODUCTION", ru: "ДО НАЧАЛА ПРОДАКШЕНА" },
    text: {
      en: "Beyond visuals, I develop concepts, write scripts, collect references and turn an initial idea into a clear project structure.",
      ru: "Кроме визуальной части, я создаю концепты, пишу сценарии, собираю референсы и превращаю исходную идею в понятную структуру проекта.",
    },
  },
] as const;

const copy = {
  en: {
    introAria: "Loading Milkman portfolio",
    introOps: "MILKMAN",
    skipIntro: "SKIP INTRO",
    loading: "LOADING MY ACTUALLY COOL PORTFOLIO",
    loadingCorrection: "I MEAN... JUST LOADING",
    skipWork: "Skip to selected work",
    brandMeta: "MILKMAN",
    nav: ["EXPERIENCE", "SKILLS", "PORTFOLIO", "CONTACTS"],
    resumeShort: "RESUME ↓",
    resume: "RESUME .DOCX ↓",
    resumeAria: "Download Sergey Aleksikov’s CV as a DOCX file",
    available: "AVAILABLE",
    heroRole: "AI MOTION DESIGNER · EDITOR · ANIMATOR",
    reelPlaceholder: "SHOWREEL PLACEHOLDER",
    reelHeadline: ["YOUR BEST FRAMES", "WILL LIVE HERE"],
    pause: "PAUSE",
    play: "PLAY",
    manifesto: "01 / MANIFESTO",
    manifestoFirst: "I MAKE",
    manifestoAccent: "DIFFERENT",
    manifestoSecond: "THINGS.",
    scroll: "SCROLL TO CUT",
    ticker: ["MOTION DESIGN", "3D", "VFX", "AI VIDEO", "EDITING"],
    tickerGlitch: "THINGS",
    workKicker: "PORTFOLIO / SELECTED WORK",
    mediaOffline: "MEDIA OFFLINE",
    videoHere: "VIDEO WILL BE LINKED HERE",
    liveMedia: "PORTFOLIO MATERIAL",
    openWork: "OPEN FULL ↗",
    selectedProjects: "Selected projects",
    pipelineKicker: "SKILLS / WHAT I DO",
    frameByFrame: "CLICK A TRACK",
    trackHint: "CLICKABLE",
    rawInput: "NO BIG CLAIMS",
    skillsQuestion: "HOW DO I MAKE THINGS",
    capabilities: "Creative capabilities",
    human: "03 / EXPERIENCE",
    calm: ["MAKE.", "REMAKE.", "DELIVER."],
    aboutOne:
      "I’m Milkman — a motion designer, editor and animator working where traditional craft meets generative tools.",
    aboutTwo:
      "I frame the shot, assemble the brief and turn raw footage or an empty prompt into something that looks genuinely real 🆒.",
    factValues: ["03", "RU", "RU — native\nEN — B1"],
    facts: ["YEARS EXPERIENCE", "LOCATION", "LANGUAGES"],
    experience: "Experience",
    roles: ["AI MOTION DESIGNER", "MOTION DESIGNER", "EDITOR / DESIGNER"],
    freelance: "FREELANCE",
    contact: "04 / CONTACTS",
    collaborations: "OPEN FOR COLLABORATIONS",
    footerLead: ["LET’S MAKE", "SOMETHING"],
    move: "MOVE.",
    email: "EMAIL ↗",
    backTop: "BACK TO TOP ↑",
    footerMeta: "DESIGNED TO BE REPLACED BY NOTHING",
  },
  ru: {
    introAria: "Загрузка портфолио Milkman",
    introOps: "MILKMAN",
    skipIntro: "ПРОПУСТИТЬ",
    loading: "ЗАГРУЗКА РЕАЛЬНО МОЕГО КРУТОГО ПОРТФОЛИО",
    loadingCorrection: "ТО ЕСТЬ... ПРОСТО ЗАГРУЗКА",
    skipWork: "Перейти к избранным работам",
    brandMeta: "MILKMAN",
    nav: ["ОПЫТ", "НАВЫКИ", "ПОРТФОЛИО", "КОНТАКТЫ"],
    resumeShort: "РЕЗЮМЕ ↓",
    resume: "РЕЗЮМЕ .DOCX ↓",
    resumeAria: "Скачать резюме Сергея Алексикова в формате DOCX",
    available: "СВОБОДЕН",
    heroRole: "AI-МОУШН-ДИЗАЙНЕР · МОНТАЖЁР · АНИМАТОР",
    reelPlaceholder: "МЕСТО ДЛЯ ШОУРИЛА",
    reelHeadline: ["ЗДЕСЬ БУДУТ", "ЛУЧШИЕ КАДРЫ"],
    pause: "ПАУЗА",
    play: "ПУСК",
    manifesto: "01 / МАНИФЕСТ",
    manifestoFirst: "Я СОЗДАЮ",
    manifestoAccent: "РАЗНЫЕ",
    manifestoSecond: "ШТУКИ.",
    scroll: "ЛИСТАТЬ К РАБОТАМ",
    ticker: ["МОУШН-ДИЗАЙН", "3D", "VFX", "AI-ВИДЕО", "МОНТАЖ"],
    tickerGlitch: "ШТУКИ",
    workKicker: "ПОРТФОЛИО / ИЗБРАННЫЕ РАБОТЫ",
    mediaOffline: "МЕДИА ОФЛАЙН",
    videoHere: "ЗДЕСЬ БУДЕТ ВИДЕО",
    liveMedia: "МАТЕРИАЛ ИЗ ПОРТФОЛИО",
    openWork: "ОТКРЫТЬ ПОЛНОСТЬЮ ↗",
    selectedProjects: "Избранные проекты",
    pipelineKicker: "НАВЫКИ / ЧТО Я ДЕЛАЮ",
    frameByFrame: "НАЖМИ НА ДОРОЖКУ",
    trackHint: "КЛИКАБЕЛЬНО",
    rawInput: "БЕЗ ГРОМКИХ СЛОВ",
    skillsQuestion: "КАК Я ДЕЛАЮ ШТУКИ",
    capabilities: "Творческие компетенции",
    human: "03 / ОПЫТ",
    calm: ["ДЕЛАЮ.", "ПЕРЕДЕЛЫВАЮ.", "СДАЮ."],
    aboutOne:
      "Я Milkman — моушн-дизайнер, монтажёр и аниматор на стыке традиционного ремесла и генеративных инструментов.",
    aboutTwo:
      "Выстраиваю кадр, собираю заказ и превращаю сырой материал или пустой промпт в то, что выглядит реально 🆒.",
    factValues: ["03", "РФ", "RU — родной\nEN — B1"],
    facts: ["ГОДА ОПЫТА", "ЛОКАЦИЯ", "ЯЗЫКИ"],
    experience: "Опыт",
    roles: ["AI-МОУШН-ДИЗАЙНЕР", "МОУШН-ДИЗАЙНЕР", "МОНТАЖ / ДИЗАЙН"],
    freelance: "ФРИЛАНС",
    contact: "04 / КОНТАКТЫ",
    collaborations: "ОТКРЫТ К СОТРУДНИЧЕСТВУ",
    footerLead: ["ДАВАЙ СДЕЛАЕМ", "ЧТО-ТО"],
    move: "ЖИВОЕ.",
    email: "ПОЧТА ↗",
    backTop: "НАВЕРХ ↑",
    footerMeta: "СДЕЛАНО, ЧТОБЫ НЕ ОСТАТЬСЯ НЕЗАМЕЧЕННЫМ",
  },
} as const;

function formatTimecode(frame: number) {
  const fps = 24;
  const seconds = Math.floor(frame / fps);
  const minutes = Math.floor(seconds / 60);
  return `00:${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(
    2,
    "0",
  )}:${String(frame % fps).padStart(2, "0")}`;
}

function PanelCat({ mode }: { mode: string }) {
  const variant =
    mode === "animation" ? "look-mode" :
    mode === "editing" ? "edit-mode" :
    "static-mode";

  return (
    <div className={`work-cat work-cat-${mode}`}>
      <img src={`/cat-interface.svg#${variant}`} alt="" />
    </div>
  );
}

function AppChrome({ app, file }: { app: string; file: string }) {
  return (
    <div className="mini-app-chrome">
      <b>{app}</b>
      <span>{file}</span>
      <em>— □ ×</em>
    </div>
  );
}

function SkillPanelVisual({ kind }: { kind: string }) {
  const [generationRun, setGenerationRun] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isGenerating) return;

    const duration = 4200;
    const startedAt = window.performance.now();
    let frameId = 0;

    const updateProgress = (now: number) => {
      const nextProgress = Math.min(100, ((now - startedAt) / duration) * 100);
      setGenerationProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = window.requestAnimationFrame(updateProgress);
      } else {
        setIsGenerating(false);
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frameId);
  }, [generationRun, isGenerating]);

  const startGeneration = () => {
    setGenerationProgress(0);
    setGenerationRun((current) => current + 1);
    setIsGenerating(true);
  };

  useEffect(() => {
    if (kind !== "ai" || isGenerating) return;

    const delay = generationProgress >= 100 ? 1400 : 900;
    const autoGenerationTimer = window.setTimeout(() => {
      setGenerationProgress(0);
      setGenerationRun((current) => current + 1);
      setIsGenerating(true);
    }, delay);

    return () => window.clearTimeout(autoGenerationTimer);
  }, [generationProgress, isGenerating, kind]);

  if (kind === "design") {
    return (
      <div className="skill-visual skill-visual-design" aria-hidden="true">
        <AppChrome app="Ps" file="MILKMAN_DESIGN.PSD  @  66.7%" />
        <div className="ps-toolbar">
          {["↖", "□", "◯", "⌁", "T", "◒"].map((tool) => <i key={tool}>{tool}</i>)}
        </div>
        <div className="ps-canvas">
          <div className="ps-image">
            <PanelCat mode="design" />
            <i className="ps-color-sweep" />
            <i className="ps-brush-cursor" />
          </div>
        </div>
        <div className="ps-layers">
          <strong>LAYERS</strong>
          {["EYES", "MILKMAN", "SHADOW", "BACKGROUND"].map((layer, index) => (
            <i className={index === 1 ? "is-active" : ""} key={layer}>
              <span>◉</span>{layer}
            </i>
          ))}
        </div>
        <div className="ps-status"><span>RGB / 8</span><i /></div>
      </div>
    );
  }

  if (kind === "animation") {
    return (
      <div className="skill-visual skill-visual-animation" aria-hidden="true">
        <AppChrome app="MOHO" file="MILKMAN.MOHO" />
        <div className="moho-tools">{["S", "B", "R", "K", "P"].map((tool) => <i key={tool}>{tool}</i>)}</div>
        <div className="moho-stage">
          <div className="moho-character">
            <PanelCat mode="animation" />
            <i className="moho-paw moho-paw-left" />
            <i className="moho-paw moho-paw-right" />
            <div className="cat-rig">
              <i className="rig-spine" />
              <i className="rig-arm rig-arm-left" />
              <i className="rig-arm rig-arm-right" />
              <i className="rig-node rig-node-head" />
              <i className="rig-node rig-node-body" />
              <i className="rig-node rig-node-left" />
              <i className="rig-node rig-node-right" />
            </div>
          </div>
          <span className="stage-axis">X&nbsp;&nbsp;Y</span>
        </div>
        <div className="moho-layers">
          {["HEAD", "BODY", "PAW_L", "PAW_R", "TAIL"].map((layer, index) => (
            <i className={index === 2 ? "is-active" : ""} key={layer}>{layer}</i>
          ))}
        </div>
        <div className="moho-timeline">
          <span>00</span>
          <div className="moho-frames">
            {[8, 28, 51, 76].map((position) => <i style={{ left: `${position}%` }} key={position} />)}
            <b />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "editing") {
    return (
      <div className="skill-visual skill-visual-editing" aria-hidden="true">
        <AppChrome app="DaVinci Resolve" file="MILKMAN_REEL_01" />
        <div className="resolve-media">
          <strong>MEDIA POOL</strong>
          {["MILKMAN_001", "MILKMAN_002", "MILKMAN_003"].map((clip, index) => (
            <i key={clip}><b className={`media-cat media-cat-${index + 1}`} />{clip}</i>
          ))}
        </div>
        <div className="resolve-viewer">
          <span>01:00:03:12</span>
          <PanelCat mode="editing" />
          <i className="viewer-crop viewer-crop-a" />
          <i className="viewer-crop viewer-crop-b" />
        </div>
        <div className="resolve-scopes">
          <strong>SCOPES</strong>
          <i /><i /><i /><i />
        </div>
        <div className="resolve-timeline">
          <div className="edit-playhead" />
          {[0, 1, 2].map((track) => (
            <div className={`edit-track edit-track-${track + 1}`} key={track}>
              <span>V{track + 1}</span><i /><i /><i />
            </div>
          ))}
          <b className="resolve-timecode">00:00:00:00</b>
        </div>
      </div>
    );
  }

  if (kind === "ai") {
    const generationState =
      isGenerating ? "is-generating" :
      generationProgress >= 100 ? "is-complete" :
      "is-idle";

    return (
      <div className="skill-visual skill-visual-ai">
        <AppChrome app="KLING AI" file="TEXT → IMAGE" />
        <div className="kling-prompt">
          <strong>PROMPT</strong>
          <p>A cinematic purple Milkman mascot, amber eyes, studio light...</p>
          <div><span>16:9</span><span>PRO</span></div>
          <button className="kling-generate" type="button" onClick={startGeneration}>
            GENERATE <i>↗</i>
          </button>
        </div>
        <div className="kling-output">
          <div className={`kling-card ${generationState}`} key={generationRun}>
            <PanelCat mode="ai-source" />
            <img className="ai-milkman-cutout" src="/milkman-ai-cutout.png" alt="" />
            <i className="generation-scan" />
            <span className="generation-noise" />
          </div>
          <div className="generation-progress">
            <i style={{ width: `${generationProgress}%` }} />
            <span>GENERATING КРАСИВО&nbsp; {Math.round(generationProgress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-visual skill-visual-other" aria-hidden="true">
      <AppChrome app="FILES" file={"C:\\MILKMAN\\PREPROD"} />
      <div className="files-sidebar">
        <span>▰ DESKTOP</span>
        <span>▱ DOWNLOADS</span>
        <span>★ FAVORITES</span>
      </div>
      <div className="files-stage">
        <div className="junk junk-a">IDEA</div>
        <div className="junk junk-b">SCRIPT</div>
        <div className="junk junk-c">REF</div>
        <div className="file-milkman">
          <img src="/cat-interface.svg#right-mode" alt="" />
          <i className="file-milkman-front-paw" />
        </div>
        <div className="junk-folder"><i /><b>PREPROD</b></div>
      </div>
      <div className="files-status">IDEA&nbsp;&nbsp; / &nbsp;&nbsp;SCRIPT&nbsp;&nbsp; / &nbsp;&nbsp;REFERENCES</div>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeMedia, setActiveMedia] = useState(0);
  const [playingMedia, setPlayingMedia] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [frame, setFrame] = useState(0);
  const [introPhase, setIntroPhase] = useState<
    "typing" | "ready" | "morphing" | "done"
  >("typing");
  const [typedIntro, setTypedIntro] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);
  const [locale, setLocale] = useState<Locale>("en");
  const [tickerGlitches, setTickerGlitches] = useState<boolean[]>(
    () => Array(copy.en.ticker.length).fill(false),
  );
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [questionStep, setQuestionStep] = useState(0);
  const t = copy[locale];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedIntro(introCopy);
      setLoadProgress(100);
      setIntroPhase("done");
      return;
    }

    let character = 0;
    const typingTimer = window.setInterval(() => {
      character += 1;
      setTypedIntro(introCopy.slice(0, character));
      if (character >= introCopy.length) {
        window.clearInterval(typingTimer);
      }
    }, 42);

    const startedAt = window.performance.now();
    let progressFrame = 0;
    const animateProgress = (now: number) => {
      const nextProgress = Math.min(
        100,
        Math.floor(((now - startedAt) / 2950) * 100),
      );
      setLoadProgress(nextProgress);
      if (nextProgress < 100) {
        progressFrame = window.requestAnimationFrame(animateProgress);
      }
    };
    progressFrame = window.requestAnimationFrame(animateProgress);

    const readyTimer = window.setTimeout(
      () =>
        setIntroPhase((currentPhase) =>
          currentPhase === "done" ? "done" : "ready",
        ),
      3000,
    );
    const morphTimer = window.setTimeout(
      () =>
        setIntroPhase((currentPhase) =>
          currentPhase === "done" ? "done" : "morphing",
        ),
      3380,
    );

    return () => {
      window.clearInterval(typingTimer);
      window.cancelAnimationFrame(progressFrame);
      window.clearTimeout(readyTimer);
      window.clearTimeout(morphTimer);
    };
  }, []);

  useEffect(() => {
    const shouldLockIntro = introPhase !== "done";
    document.body.classList.toggle("intro-lock", shouldLockIntro);
    return () => document.body.classList.remove("intro-lock");
  }, [introPhase]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("milkman-locale");
    if (savedLocale === "en" || savedLocale === "ru") {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % (24 * 60 * 4));
    }, 1000 / 24);

    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const glitchTimer = window.setInterval(() => {
      setTickerGlitches(
        copy.en.ticker.map(() => Math.random() < 0.04),
      );
    }, 1500);

    return () => window.clearInterval(glitchTimer);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const questionTimer = window.setInterval(() => {
      setQuestionStep((current) => (current + 1) % questionSequence.length);
    }, 180);

    return () => window.clearInterval(questionTimer);
  }, []);

  const selected = projects[activeProject];
  const selectedMedia = selected.media[activeMedia];
  const selectProject = (index: number) => {
    setActiveProject(index);
    setActiveMedia(0);
    setPlayingMedia(null);
  };
  const moveMedia = (direction: number) => {
    setActiveMedia((current) =>
      (current + direction + selected.media.length) % selected.media.length
    );
    setPlayingMedia(null);
  };
  const isLoadingCorrection = loadProgress >= 45;
  const selectLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    window.localStorage.setItem("milkman-locale", nextLocale);
  };

  return (
    <main className={`site-shell intro-${introPhase} locale-${locale}`} id="top">
      {introPhase !== "done" && (
        <div
          className={`intro-loader intro-loader-${introPhase}`}
          aria-label={t.introAria}
          aria-live="polite"
          onAnimationEnd={(event) => {
            if (
              introPhase === "morphing" &&
              event.animationName === "intro-collapse"
            ) {
              setIntroPhase("done");
            }
          }}
        >
          <div className="intro-grid" />
          <div className="intro-topline">
            <span>{t.introOps}</span>
            <button
              type="button"
              onClick={() => setIntroPhase("done")}
              aria-label={t.skipIntro}
            >
              {t.skipIntro}
            </button>
          </div>

          <div className="intro-bottom">
            <div className="intro-counter">
              <strong>{String(loadProgress).padStart(3, "0")}</strong>
              <span>%</span>
            </div>
            <div className="intro-progress">
              <span key={isLoadingCorrection ? "correction" : "main"}>
                {isLoadingCorrection ? t.loadingCorrection : t.loading}
              </span>
              <div>
                {Array.from({ length: 20 }).map((_, index) => (
                  <i
                    className={loadProgress >= (index + 1) * 5 ? "is-loaded" : ""}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <a className="skip-link" href="#portfolio">
        {t.skipWork}
      </a>

      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Milkman home">
          <span className="brand-word">{t.brandMeta}</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#experience">{t.nav[0]}</a>
          <a href="#skills">{t.nav[1]}</a>
          <a href="#portfolio">{t.nav[2]}</a>
          <a href="#contact">{t.nav[3]}</a>
        </nav>
        <div className="top-actions">
          <a
            className="resume-download"
            href="/Milkman_CV.docx"
            download
            aria-label={t.resumeAria}
          >
            {t.resumeShort}
          </a>
          <div className="language-switch" role="group" aria-label="Language">
            {(["en", "ru"] as const).map((language) => (
              <button
                type="button"
                className={locale === language ? "is-active" : ""}
                aria-pressed={locale === language}
                onClick={() => selectLocale(language)}
                key={language}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="availability" href="https://t.me/whatsgoooood">
            <span className="status-dot" />
            {t.available}
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-intro">
          <p>{t.heroRole}</p>
        </div>

        <div
          className={`hero-title hero-title-${introPhase}`}
          aria-label="Milkman"
        >
          <span className="hero-word hero-word-solid" aria-hidden="true">
            {introPhase === "done" ? "MILK" : typedIntro.slice(0, 4)}
            {introPhase !== "done" && typedIntro.length <= 4 && (
              <i className="typing-cursor" />
            )}
          </span>
          <span className="hero-word hero-word-outline" aria-hidden="true">
            {introPhase === "done" ? "MAN" : typedIntro.slice(4)}
            {introPhase !== "done" && typedIntro.length > 4 && (
              <i className="typing-cursor" />
            )}
          </span>
        </div>

        <div
          className={`reel-window ${playing ? "is-playing" : "is-paused"}`}
          aria-label="Showreel placeholder"
        >
          <div className="reel-grid" />
          <div className="reel-noise" />
          <div className="reel-object reel-object-a" />
          <div className="reel-object reel-object-b" />
          <div className="reel-slice reel-slice-a" />
          <div className="reel-slice reel-slice-b" />
          <div className="reel-hud reel-hud-top">
            <span><i className="record-dot" /> REC_01</span>
            <span>{formatTimecode(frame)}</span>
          </div>
          <div className="reel-hud reel-hud-bottom">
            <button
              className="play-toggle"
              type="button"
              onClick={() => setPlaying((current) => !current)}
              aria-label={playing ? t.pause : t.play}
            >
              <span className={playing ? "pause-icon" : "play-icon"} />
              {playing ? t.pause : t.play}
            </button>
            <span>1920 × 1080 / 24 FPS</span>
          </div>
        </div>

        <div className="hero-statement">
          <span>{t.manifesto}</span>
          <p>
            {t.manifestoFirst}
            <br />
            <em>{t.manifestoAccent}</em>
            <br />
            {t.manifestoSecond}
          </p>
        </div>

        <a className="scroll-cue" href="#portfolio">
          <span>{t.scroll}</span>
          <i />
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1, 2, 3, 4, 5].map((sequence) => (
            <div className="ticker-sequence" key={sequence}>
              {t.ticker.map((item, index) => (
                <span className="ticker-item" key={`${sequence}-${index}`}>
                  <span
                    className={`ticker-label ${
                      tickerGlitches[index] ? "is-glitched" : ""
                    }`}
                  >
                    <span>{item}</span>
                    <span className="ticker-glitch">{t.tickerGlitch}</span>
                  </span>
                  <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="work-section" id="portfolio">
        <div className="section-kicker">
          <span>01</span>
          <p>{t.workKicker}</p>
          <p>2024—2026</p>
        </div>

        <div className="work-layout">
          <div className="project-preview">
            <div className="project-scene project-scene-media">
              <div className="project-media" key={`${selected.code}-${activeMedia}`}>
                {selectedMedia.kind === "image" && (
                  <img
                    src={selectedMedia.src}
                    alt={`${selected.title[locale]} — ${selectedMedia.label}`}
                  />
                )}
                {selectedMedia.kind === "video" && playingMedia === selectedMedia.id && (
                  <iframe
                    src={`https://drive.google.com/file/d/${selectedMedia.id}/preview`}
                    title={`${selected.title[locale]} — ${selectedMedia.label}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
                {selectedMedia.kind === "video" && playingMedia !== selectedMedia.id && (
                  <button
                    className="project-video-poster"
                    type="button"
                    onClick={() => setPlayingMedia(selectedMedia.id)}
                    aria-label={locale === "ru" ? `Смотреть ${selectedMedia.label}` : `Play ${selectedMedia.label}`}
                  >
                    <img
                      src={selectedMedia.poster}
                      alt=""
                      aria-hidden="true"
                    />
                    <span className="project-video-play">
                      <i />
                      {locale === "ru" ? "СМОТРЕТЬ" : "PLAY"}
                    </span>
                  </button>
                )}
              </div>
              <div className="project-frame-label">
                <span>{selected.code}</span>
                <span>{selectedMedia.label}</span>
              </div>
            </div>
            <div className="preview-caption">
              <div className="project-carousel-controls">
                <button type="button" onClick={() => moveMedia(-1)} aria-label="Previous work">←</button>
                <span>{String(activeMedia + 1).padStart(2, "0")} / {String(selected.media.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => moveMedia(1)} aria-label="Next work">→</button>
              </div>
              <p><strong>{selectedMedia.label}</strong>{selected.caption[locale]}</p>
              <a href={selectedMedia.href} target="_blank" rel="noreferrer">{t.openWork}</a>
            </div>
          </div>

          <div className="project-list" role="list" aria-label={t.selectedProjects}>
            {projects.map((project, index) => (
              <div
                className={`project-row ${index === activeProject ? "is-active" : ""}`}
                key={project.code}
                role="listitem"
              >
                <button
                  className="project-row-select"
                  type="button"
                  onClick={() => selectProject(index)}
                  aria-pressed={index === activeProject}
                >
                  <span className="project-code">{project.code}</span>
                  <span className="project-name">{project.title[locale]}</span>
                  <span className="project-discipline">{project.discipline[locale]}</span>
                  <span className="project-year">{project.year}</span>
                </button>
                <a
                  className="project-folder-link"
                  href={project.folderHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${locale === "ru" ? "Открыть папку" : "Open folder"}: ${project.title[locale]}`}
                >
                  ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pipeline-section" id="skills">
        <div className="section-kicker section-kicker-dark">
          <span>02</span>
          <p>{t.pipelineKicker}</p>
          <p>{t.frameByFrame}</p>
        </div>

        <div className="pipeline-heading">
          <p>{t.rawInput}</p>
          <h2>
            {t.skillsQuestion}
            <span className="question-marks">
              {"?".repeat(questionSequence[questionStep])}
            </span>
          </h2>
        </div>

        <div className="timeline-hint" aria-hidden="true">
          <span>{t.trackHint}</span>
          <strong>↓</strong>
        </div>

        <div className="timeline-ruler" aria-hidden="true">
          {Array.from({ length: 13 }).map((_, index) => (
            <span key={index}>{String(index * 5).padStart(2, "0")}</span>
          ))}
        </div>

        <div className="timeline" aria-label={t.capabilities}>
          {lanes.map(([number, name, tools, className], index) => (
            <div
              className={`timeline-row ${
                activeSkill === index ? "is-open" : ""
              }`}
              key={number}
            >
              <span>{number}</span>
              <button
                className={`timeline-bar ${className}`}
                type="button"
                aria-expanded={activeSkill === index}
                aria-controls={`skill-panel-${index}`}
                onClick={() =>
                  setActiveSkill((current) => current === index ? null : index)
                }
              >
                <strong>{name[locale]}</strong>
                <small>{tools[locale]}</small>
              </button>
              {activeSkill === index && (
                <div
                  className={`skill-panel skill-panel-${skillPanels[index].kind}`}
                  id={`skill-panel-${index}`}
                >
                  <div className="skill-panel-copy">
                    <span>{skillPanels[index].label[locale]}</span>
                    <p>{skillPanels[index].text[locale]}</p>
                  </div>
                  <SkillPanelVisual kind={skillPanels[index].kind} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" id="experience">
        <div className="about-lead">
          <Cat3DModel />
          <span>{t.human}</span>
          <h2>{t.calm.map((line) => <span key={line}>{line}</span>)}</h2>
        </div>

        <div className="about-copy">
          <p>{t.aboutOne}</p>
          <p>{t.aboutTwo}</p>
          <div className="facts">
            {t.facts.map((fact, index) => (
              <div key={fact}>
                <strong>{t.factValues[index]}</strong>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-strip" aria-label={t.experience}>
        <div><span>2025—2026</span><strong>{t.roles[0]}</strong><em>MATRESHKA</em></div>
        <div><span>2023—2024</span><strong>{t.roles[1]}</strong><em>LILVERSE</em></div>
        <div><span>2021—2023</span><strong>{t.roles[2]}</strong><em>{t.freelance}</em></div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-topline">
          <span>{t.contact}</span>
          <span>{t.collaborations}</span>
        </div>
        <p className="footer-title">
          {t.footerLead[0]}
          <br />
          {t.footerLead[1]} <em>{t.move}</em>
        </p>
        <div className="footer-links">
          <a href="https://t.me/whatsgoooood">TELEGRAM ↗</a>
          <a href="mailto:kajen.kajen@yandex.ru">{t.email}</a>
          <a href="/Milkman_CV.docx" download>
            {t.resume}
          </a>
          <a href="#top">{t.backTop}</a>
        </div>
        <div className="footer-meta">
          <span>MILKMAN © 2026</span>
          <span>{t.footerMeta}</span>
        </div>
      </footer>
    </main>
  );
}
