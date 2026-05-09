"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Period = "today" | "week" | "month";
type MidSectionView = "schedule" | "quest";

const scheduleByPeriod: Record<Period, { title: string; xp: string; tag: string; ago: string; href: string }[]> = {
  today: [
    { title: "면접 스터디 9회차", xp: "+1XP", tag: "todo", ago: "1시간 전", href: "/calendar" },
    { title: "네이버 자소서 제출", xp: "+10XP", tag: "공고", ago: "3시간 전", href: "/jobs" },
  ],
  week: [
    { title: "모의면접 2회", xp: "+5XP", tag: "todo", ago: "어제", href: "/calendar" },
    { title: "포트폴리오 업데이트", xp: "+8XP", tag: "공고", ago: "2일 전", href: "/jobs" },
  ],
  month: [
    { title: "취업 박람회 준비", xp: "+20XP", tag: "todo", ago: "5일 전", href: "/calendar" },
    { title: "기업 분석 리포트", xp: "+15XP", tag: "공고", ago: "1주 전", href: "/jobs" },
  ],
};

const quests = [
  { label: "커뮤니티에 댓글 달기", point: "+1BP", href: "/quest" },
  { label: "좋아요 누르기", point: "+1BP", href: "/quest" },
  { label: "게시글 작성하기", point: "+3BP", href: "/quest" },
  { label: "좋아요 5개 누르기", point: "+5BP", href: "/quest" },
  { label: "출석체크", point: "+2BP", href: "/quest" },
];

const jobSections = [
  {
    title: "인기 취업·인턴",
    icon: "↗",
    href: "/jobs/popular",
    cards: [
      {
        company: "삼성전자",
        title: "소프트웨어 엔지니어",
        dday: "D-17",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        alert: "보완이 필요해!",
        alertColor: "bg-[#FFEDD4] text-[#EF9F27]",
        image:
          "https://logo.clearbit.com/samsung.com",
      },
      {
        company: "네이버",
        title: "프론트엔드 인턴",
        dday: "D-9",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        image:
          "https://logo.clearbit.com/naver.com",
      },
      {
        company: "카카오",
        title: "백엔드 개발자 인턴",
        dday: "D-14",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        alert: "서류 마감 임박",
        alertColor: "bg-[#FFEDD4] text-[#EF9F27]",
        image:
          "https://logo.clearbit.com/kakaocorp.com",
      },
      {
        company: "쿠팡",
        title: "프로덕트 매니저(신입)",
        dday: "D-21",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        image:
          "https://logo.clearbit.com/coupang.com",
      },
      {
        company: "라인플러스",
        title: "데이터 엔지니어",
        dday: "D-11",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        alert: "추천 직무",
        alertColor: "bg-[#EEEDFE] text-[#534AB7]",
        image:
          "https://logo.clearbit.com/linepluscorp.com",
      },
    ],
  },
  {
    title: "대외활동·공모전·부트캠프",
    icon: "☆",
    href: "/jobs/camp",
    cards: [
      {
        company: "하나금융그룹",
        title: "제20기 하나금융그룹 SMART 홍보대사 모집",
        dday: "D-32",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        alert: "인기",
        alertColor: "bg-[#FFEDD4] text-[#EF9F27]",
        image:
          "https://logo.clearbit.com/hanafn.com",
      },
      {
        company: "패스트캠퍼스",
        title: "AI 서비스 개발 부트캠프",
        dday: "D-12",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        image:
          "https://logo.clearbit.com/fastcampus.co.kr",
      },
      {
        company: "멋쟁이사자처럼",
        title: "프론트엔드 스쿨 5기",
        dday: "D-19",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        image:
          "https://logo.clearbit.com/likelion.net",
      },
      {
        company: "스마일게이트",
        title: "게임 기획 공모전 2026",
        dday: "D-27",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        alert: "상금 500만원",
        alertColor: "bg-[#FFEDD4] text-[#EF9F27]",
        image:
          "https://logo.clearbit.com/smilegate.com",
      },
      {
        company: "원티드랩",
        title: "AI 커리어 점프 캠프",
        dday: "D-8",
        badge: "모집중",
        badgeColor: "bg-[#1D9E75]",
        image:
          "https://logo.clearbit.com/wantedlab.com",
      },
    ],
  },
  {
    title: "자격증·어학",
    icon: "⌬",
    href: "/jobs/license",
    plainBadge: true,
    cards: [
      {
        company: "Q-Net",
        title: "정보처리기사",
        dday: "D-57",
        badge: "자격증",
        badgeColor: "bg-[#534AB7]",
        alert: "취득 후 72개 기업에 지원해볼 수 있어!",
        alertColor: "bg-[#EEEDFE] text-[#534AB7]",
        image:
          "https://logo.clearbit.com/q-net.or.kr",
      },
      {
        company: "토익",
        title: "토익 정기시험",
        dday: "D-23",
        badge: "시험",
        badgeColor: "bg-[#534AB7]",
        image:
          "https://logo.clearbit.com/ets.org",
      },
      {
        company: "한국사능력검정시험",
        title: "한국사능력검정시험(심화)",
        dday: "D-30",
        badge: "시험",
        badgeColor: "bg-[#534AB7]",
        image:
          "https://logo.clearbit.com/historyexam.go.kr",
      },
      {
        company: "대한상공회의소",
        title: "컴퓨터활용능력 1급",
        dday: "D-18",
        badge: "자격증",
        badgeColor: "bg-[#534AB7]",
        alert: "실무 활용도 높음",
        alertColor: "bg-[#EEEDFE] text-[#534AB7]",
        image:
          "https://logo.clearbit.com/korcham.net",
      },
      {
        company: "JLPT",
        title: "JLPT N2 정기시험",
        dday: "D-41",
        badge: "어학",
        badgeColor: "bg-[#534AB7]",
        image:
          "https://logo.clearbit.com/jlpt.jp",
      },
    ],
  },
  {
    title: "정부 정책",
    icon: "◻",
    href: "/jobs/policy",
    plainBadge: true,
    cards: [
      {
        company: "고용노동부",
        title: "국민취업지원제도",
        dday: "D-23",
        badge: "금융",
        badgeColor: "bg-[#534AB7]",
        alert: "지금 신청 가능해!",
        alertColor: "bg-[#d4f2df] text-[#0a8f49]",
        image: "https://logo.clearbit.com/moel.go.kr",
      },
      {
        company: "국토교통부",
        title: "청년 전세자금 대출 지원",
        dday: "D-35",
        badge: "주거",
        badgeColor: "bg-[#534AB7]",
        image: "https://logo.clearbit.com/molit.go.kr",
      },
      {
        company: "중소벤처기업부",
        title: "청년창업사관학교 입교생 모집",
        dday: "D-16",
        badge: "창업",
        badgeColor: "bg-[#534AB7]",
        alert: "멘토링/공간 지원",
        alertColor: "bg-[#d4f2df] text-[#0a8f49]",
        image: "https://logo.clearbit.com/mss.go.kr",
      },
      {
        company: "서울시",
        title: "청년 월세 지원사업 2차",
        dday: "D-29",
        badge: "주거",
        badgeColor: "bg-[#534AB7]",
        image: "https://logo.clearbit.com/seoul.go.kr",
      },
      {
        company: "금융위원회",
        title: "청년도약계좌 가입 지원",
        dday: "D-13",
        badge: "금융",
        badgeColor: "bg-[#534AB7]",
        image: "https://logo.clearbit.com/fsc.go.kr",
      },
    ],
  },
];

const hotPosts = [
  { title: "삼성 인적성 후기 공유합니다", views: 1523, comments: 42 },
  { title: "네이버 면접 질문 정리", views: 1232, comments: 20 },
  { title: "토익 2주만에 200점 올린 방법", views: 1047, comments: 36 },
  { title: "카카오 코딩테스트 팁", views: 237, comments: 27 },
  { title: "자소서 첨삭 받고 합격했어요", views: 45, comments: 15 },
  { title: "대외활동 vs 인턴 고민", views: 30, comments: 10 },
  { title: "정보처리기사 실기 꿀팁", views: 22, comments: 2 },
  { title: "스타트업 vs 대기업", views: 15, comments: 1 },
  { title: "포트폴리오 피드백 부탁드려요", views: 10, comments: 1 },
  { title: "면접 탈락 후 재지원 성공", views: 5, comments: 0 },
];

const topUsers = [
  {
    name: "김철수",
    xp: 1200,
    rank: 1,
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=phoenix-1&backgroundColor=fff7e6",
  },
  {
    name: "이영희",
    xp: 1000,
    rank: 2,
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=phoenix-2&backgroundColor=fff7e6",
  },
  {
    name: "박민수",
    xp: 950,
    rank: 3,
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=phoenix-3&backgroundColor=fff7e6",
  },
  {
    name: "최수진",
    xp: 880,
    rank: 4,
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=phoenix-4&backgroundColor=fff7e6",
  },
  {
    name: "정다은",
    xp: 830,
    rank: 5,
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=phoenix-5&backgroundColor=fff7e6",
  },
];

type BottomTab = "calendar" | "jobs" | "home" | "ai-career" | "community";

const bottomNav: { id: BottomTab; label: string }[] = [
  { id: "calendar", label: "달력" },
  { id: "jobs", label: "공고" },
  { id: "home", label: "홈" },
  { id: "ai-career", label: "AI 커리어" },
  { id: "community", label: "커뮤니티" },
];

export default function HomePage() {
  const [period, setPeriod] = useState<Period>("today");
  const [midSectionView, setMidSectionView] = useState<MidSectionView>("schedule");
  const [selectedTab, setSelectedTab] = useState<BottomTab>("home");
  const scheduleCards = useMemo(() => scheduleByPeriod[period], [period]);

  const renderBottomTabIcon = (tab: BottomTab) => {
    if (tab === "calendar") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    }
    if (tab === "jobs") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="15" rx="2" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="3" y1="13" x2="21" y2="13" />
        </svg>
      );
    }
    if (tab === "home") {
      return (
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10.5V20h13V10.5" />
          <rect x="10" y="13" width="4" height="7" rx="1" />
        </svg>
      );
    }
    if (tab === "ai-career") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20a6 6 0 0 1 12 0" />
        <path d="M17 11a3 3 0 1 0 0-6" />
        <path d="M21 20a4.5 4.5 0 0 0-4.5-4.5" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#EEEDFE] px-3 py-5 sm:px-6">
      <main className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[24px] border border-black/10 bg-[#EEEDFE] shadow-[0_14px_40px_rgba(15,23,42,0.15)]">
        <header className="bg-[#7F77DD] px-4 pb-4 pt-3 text-white">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-[24px] leading-7 font-bold tracking-tight">커먼</h1>
            <div className="flex items-center gap-2">
              <Link href="/alarm" className="rounded-full p-1.5 transition hover:bg-white/20" aria-label="알람 탭">
                🔔
              </Link>
              <Link href="/settings" className="rounded-full p-1.5 transition hover:bg-white/20" aria-label="설정 탭">
                ⚙️
              </Link>
            </div>
          </div>
          <Link
            href="/search"
            className="flex h-10 items-center rounded-[12px] bg-white px-3 text-[#6a7282] shadow-sm transition hover:shadow"
            aria-label="검색 탭으로 이동"
          >
            <span className="mr-2 text-sm">🔍</span>
            <span className="text-[12px] leading-4 font-normal">채용, 인턴 정보를 검색해보세요</span>
          </Link>
        </header>

        <section className="px-4 pb-4 pt-4">
          <article className="rounded-[14px] border border-black/10 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-[98px] w-[98px] overflow-hidden rounded-full bg-[#f4ecd6]">
                <img
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=196&h=196&fit=crop&auto=format"
                  alt="캐릭터 이미지"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[12px] leading-4 font-bold text-zinc-900">가능성을 담은</p>
                    <p className="text-[12px] leading-4 font-bold text-zinc-900">귀여운 피닉스</p>
                  </div>
                  <span className="-mt-1 rounded-[8px] bg-[#EEEDFE] px-2 py-0.5 text-[10px] font-semibold text-[#534AB7]">BP 1,250</span>
                </div>
                <p className="mt-1 text-[10px] leading-4 font-normal text-zinc-600">캐릭터 성장루트</p>
                <div className="mt-0.5 h-1.5 w-full rounded-full bg-zinc-200">
                  <div className="h-full w-[42%] rounded-full bg-[#7F77DD]" />
                </div>
                <p className="mt-0.5 text-right text-[10px] font-normal text-zinc-500">42/100 XP</p>
                <div className="mt-2 flex w-full gap-2">
                  <Link
                    href="/shop"
                    className="inline-flex h-8 flex-1 items-center justify-center rounded-[14px] border border-[#d9d4ff] bg-white px-2 text-[12px] font-medium text-[#6d63d6]"
                  >
                    🛍 캐릭터 상점
                  </Link>
                  <Link
                    href="/community"
                    className="inline-flex h-8 flex-1 items-center justify-center rounded-[14px] border border-[#d9d4ff] bg-white px-2 text-[12px] font-medium text-[#6d63d6]"
                  >
                    💬 커뮤니티
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="px-4 pb-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid flex-1 grid-cols-3 gap-1 rounded-full border border-black/20 bg-[#f3f3f3] p-1">
              <button
                type="button"
                onClick={() => {
                  setPeriod("today");
                  setMidSectionView("schedule");
                }}
                className={`w-full whitespace-nowrap rounded-full px-3 py-1.5 text-[16px] leading-5 font-semibold ${period === "today" && midSectionView === "schedule" ? "bg-[#7F77DD] text-white" : "text-[#666]"}`}
              >
                오늘
              </button>
              <button
                type="button"
                onClick={() => {
                  setPeriod("week");
                  setMidSectionView("schedule");
                }}
                className={`w-full whitespace-nowrap rounded-full px-3 py-1.5 text-[16px] leading-5 font-semibold ${period === "week" && midSectionView === "schedule" ? "bg-[#7F77DD] text-white" : "text-[#666]"}`}
              >
                이번 주
              </button>
              <button
                type="button"
                onClick={() => {
                  setPeriod("month");
                  setMidSectionView("schedule");
                }}
                className={`w-full whitespace-nowrap rounded-full px-3 py-1.5 text-[16px] leading-5 font-semibold ${period === "month" && midSectionView === "schedule" ? "bg-[#7F77DD] text-white" : "text-[#666]"}`}
              >
                이번 달
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMidSectionView("quest")}
              className={`h-[42px] whitespace-nowrap rounded-full border border-black/20 px-4 text-[16px] leading-5 font-semibold ${
                midSectionView === "quest" ? "bg-[#7F77DD] text-white" : "bg-[#f3f3f3] text-[#666]"
              }`}
            >
              Daily Quest
            </button>
          </div>
          {midSectionView === "schedule" ? (
            <div className="rounded-[18px] border border-black/10 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[14px] font-black text-zinc-900">Main Schdule</h2>
                <div className="flex items-center gap-3">
                  <button type="button" className="text-[14px] font-semibold text-zinc-700">
                    전체보기
                  </button>
                  <button type="button" className="text-[18px] font-semibold text-zinc-700">
                    +
                  </button>
                </div>
              </div>
              <ul className="space-y-2">
                {scheduleCards.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="block rounded-[14px] border border-[#c9c5f3] bg-[#EEEDFE] px-3 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-1 text-[16px] leading-5 font-medium text-zinc-900">{item.title}</p>
                        <span className="rounded-full bg-[#f3f3f3] px-2 py-1 text-[12px] leading-3 font-medium text-zinc-900">{item.xp}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="rounded-[8px] bg-[#e4d8ff] px-2 py-0.5 text-[12px] leading-4 font-medium text-[#6b46c1]">{item.tag}</span>
                        <span className="text-[12px] leading-4 font-semibold text-red-600">{item.ago}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-[18px] border border-black/10 bg-white p-3">
              <h2 className="mb-2 text-[14px] font-black text-zinc-900">Daily Quest</h2>
              <ul className="space-y-2">
                {quests.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="flex items-center justify-between rounded-[14px] border border-[#c9c5f3] bg-[#EEEDFE] px-3 py-2.5">
                      <span className="text-[16px] leading-5 font-medium text-zinc-900">{item.label}</span>
                      <span className="text-[10px] leading-4 font-medium text-zinc-500">{item.point}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="px-4 pb-4">
          <h2 className="text-[20px] leading-6 font-black text-zinc-900">동일 전공자가 많이 본 공고</h2>
          <div className="mt-2 space-y-3">
            {jobSections.map((section) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center justify-between">
                  <Link href={section.href} className="flex items-center gap-1 text-[14px] font-bold text-[#1e2939]">
                    <span className="text-[#ff6a3d]">{section.icon}</span>
                    <span>{section.title}</span>
                  </Link>
                  <Link href={section.href} className="text-[18px] font-semibold text-[#534AB7]">
                    ←
                  </Link>
                </div>
                <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {section.cards.map((card) => (
                    <Link
                      key={`${section.title}-${card.title}`}
                      href="/jobs"
                      className="relative min-h-[142px] min-w-[235px] snap-start rounded-[14px] bg-white p-3 pb-9 shadow-sm"
                    >
                      <div className="flex gap-2">
                        <div className="h-[52px] w-[82px] overflow-hidden rounded-[8px] border border-zinc-200 bg-white">
                          <img src={card.image} alt={card.company} className="h-full w-full object-contain p-1.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-[14px] leading-4 font-bold text-[#101828]">{card.title}</p>
                          <p className="text-[12px] text-[#4a5565]">{card.company}</p>
                          {card.alert ? (
                            <span className={`mt-1 inline-block rounded-[8px] px-2 py-0.5 text-[12px] font-bold ${card.alertColor}`}>{card.alert}</span>
                          ) : null}
                        </div>
                      </div>
                      {section.plainBadge ? (
                        <span className="absolute bottom-3 left-3 text-[12px] font-medium text-[#4a5565]">{card.badge}</span>
                      ) : (
                        <span className={`absolute bottom-3 left-3 rounded-[8px] px-2 py-0.5 text-[12px] text-white ${card.badgeColor}`}>{card.badge}</span>
                      )}
                      <span className="absolute bottom-3 right-3 text-[12px] font-medium text-[#6a7282]">{card.dday}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-24">
          <h2 className="text-[20px] leading-6 font-black text-zinc-900">커뮤니티</h2>
          <div className="mt-4">
            <h3 className="mb-2 flex items-center gap-1 text-[16px] font-bold text-zinc-900">
              <span className="text-[#ff5a77]">🔥</span>
              <span>고스펙 유저</span>
            </h3>
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {topUsers.map((user) => (
                <article
                  key={user.name}
                  className="relative min-w-[150px] snap-start rounded-[20px] bg-gradient-to-b from-[#ff8a1d] to-[#f55bb1] p-3 text-white shadow-[0_8px_18px_rgba(15,23,42,0.16)]"
                >
                  <div className="absolute right-0 top-0 h-14 w-14 rounded-bl-[24px] rounded-tr-[20px] bg-[radial-gradient(circle_at_top_right,_rgba(255,173,64,0.75),_rgba(255,173,64,0)_70%)]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-[88px] w-[88px] overflow-hidden rounded-[4px] border border-white/20 bg-[#fff8ea]">
                      <img src={user.image} alt={`${user.name} 캐릭터`} className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-2 text-[18px] leading-5 font-extrabold">{user.name}</p>
                    <span className="mt-2 rounded-full bg-white/25 px-4 py-1 text-[16px] leading-5 font-bold">+{user.xp}xp</span>
                    <span className="mt-2 rounded-full bg-white px-3 py-0.5 text-[18px] leading-6 font-black text-[#f09218]">#{user.rank}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <h3 className="mb-2 mt-4 flex items-center gap-1 text-[18px] leading-6 font-black text-zinc-900">
            <span className="text-[#ff5a77]">🔥</span>
            <span>핫게시글</span>
          </h3>
          <div className="rounded-[14px] border border-black/10 bg-white">
            {hotPosts.map((post, index) => (
              <Link key={post.title} href="/community/ranking" className="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5 last:border-b-0">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-[8px] text-[14px] font-black ${
                      index < 3 ? "bg-[#EF9F27] text-white" : "bg-[#f3f4f6] text-[#6a7282]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate text-[14px] leading-4 font-medium text-[#1e2939]">{post.title}</span>
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-2 text-[12px] text-[#99a1af]">
                  <span>👁 {post.views}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <nav className="fixed bottom-0 left-1/2 z-[100] h-[98px] w-full max-w-[390px] -translate-x-1/2 border-t border-[#e5e7eb] bg-white shadow-[0_-6px_20px_rgba(15,23,42,0.08)]">
          <ul className="grid h-full grid-cols-5 px-2">
            {bottomNav.map((item) => (
              <li key={item.label} className="flex items-center justify-center text-center">
                <button type="button" onClick={() => setSelectedTab(item.id)} className="inline-flex h-full w-full flex-col items-center justify-center gap-1 pb-2 pt-1 rounded-xl px-1">
                  <span className="grid h-[60px] place-items-center">
                    {item.id === "home" ? (
                      <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-[#7F77DD] text-white shadow-[0_10px_22px_rgba(15,23,42,0.25)]">
                        {renderBottomTabIcon(item.id)}
                      </span>
                    ) : (
                      <span className={`${selectedTab === item.id ? "text-[#7F77DD]" : "text-[#4b5565]"}`}>{renderBottomTabIcon(item.id)}</span>
                    )}
                  </span>
                  <span className={`block h-[14px] whitespace-nowrap text-[12px] leading-[12px] font-semibold ${item.id === "home" || selectedTab === item.id ? "text-[#7F77DD]" : "text-[#4b5565]"}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
