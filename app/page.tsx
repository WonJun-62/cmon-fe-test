"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Period = "today" | "week" | "month";

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
    ],
  },
  {
    title: "자격증·어학",
    icon: "⌬",
    href: "/jobs/license",
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

const bottomNav = [
  { label: "달력", icon: "📅", href: "/calendar" },
  { label: "공고", icon: "📋", href: "/jobs" },
  { label: "홈", icon: "🏠", href: "/" },
  { label: "AI 커리어", icon: "✨", href: "/ai-career" },
  { label: "커뮤니티", icon: "💬", href: "/community" },
];

export default function HomePage() {
  const [period, setPeriod] = useState<Period>("today");
  const scheduleCards = useMemo(() => scheduleByPeriod[period], [period]);

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
          <div className="mb-2 flex justify-center">
            <div className="inline-flex rounded-full border border-black/20 bg-[#f3f3f3] p-1">
              <button
                type="button"
                onClick={() => setPeriod("today")}
                className={`rounded-full px-5 py-1.5 text-[18px] leading-5 font-semibold ${period === "today" ? "bg-[#7F77DD] text-white" : "text-[#666]"}`}
              >
                오늘
              </button>
              <button
                type="button"
                onClick={() => setPeriod("week")}
                className={`rounded-full px-4 py-1.5 text-[18px] leading-5 font-semibold ${period === "week" ? "bg-[#7F77DD] text-white" : "text-[#666]"}`}
              >
                이번 주
              </button>
              <button
                type="button"
                onClick={() => setPeriod("month")}
                className={`rounded-full px-4 py-1.5 text-[18px] leading-5 font-semibold ${period === "month" ? "bg-[#7F77DD] text-white" : "text-[#666]"}`}
              >
                이번 달
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[14px] border border-black/10 bg-white p-3">
            <div className="border-r border-zinc-200 pr-2">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[14px] font-black text-zinc-900">Main Schdule</h2>
                <button type="button" className="text-[14px] font-semibold text-zinc-700">
                  +
                </button>
              </div>
              <ul className="space-y-2">
                {scheduleCards.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="block rounded-[14px] border border-[#c9c5f3] bg-[#EEEDFE] px-2 py-2">
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-[16px] leading-5 font-medium text-zinc-900">{item.title}</p>
                        <span className="text-[12px] leading-4 font-medium text-zinc-900">{item.xp}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[12px] leading-4 font-medium text-[#7F77DD]">{item.tag}</span>
                        <span className="text-[12px] leading-4 font-semibold text-red-600">{item.ago}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-[14px] font-black text-zinc-900">Daily Quest</h2>
              <ul className="space-y-2">
                {quests.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="flex items-center justify-between rounded-[14px] border border-[#c9c5f3] bg-[#EEEDFE] px-2 py-2">
                      <span className="text-[16px] leading-5 font-medium text-zinc-900">{item.label}</span>
                      <span className="text-[10px] leading-4 font-medium text-zinc-500">{item.point}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
                      className="min-w-[235px] snap-start rounded-[14px] bg-white p-3 shadow-sm"
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
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className={`rounded-[8px] px-2 py-0.5 text-[12px] text-white ${card.badgeColor}`}>{card.badge}</span>
                        </div>
                        <span className="text-[12px] font-medium text-[#6a7282]">{card.dday}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-24">
          <h2 className="mb-2 text-[20px] leading-6 font-black text-zinc-900">핫게시글</h2>
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

        <nav className="fixed bottom-0 left-1/2 w-full max-w-[390px] -translate-x-1/2 border-t border-[#e5e7eb] bg-white">
          <ul className="grid grid-cols-5 px-2 py-1">
            {bottomNav.map((item) => (
              <li key={item.label} className="text-center">
                <Link
                  href={item.href}
                  className={`inline-flex w-full flex-col items-center rounded-xl px-1 py-2 text-[11px] ${
                    item.label === "홈" ? "font-semibold text-[#534AB7]" : "text-[#4a5565]"
                  }`}
                >
                  <span className={`text-base ${item.label === "홈" ? "scale-125" : ""}`}>{item.icon}</span>
                  <span className="mt-1 text-[12px] leading-none">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
